import { PortableText } from '@portabletext/react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../utils/sanityClient';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../hooks/useSEO';
import { generateCanonicalUrl } from '../utils/seo';
import { buildBlogPosting, buildBreadcrumbList } from '../utils/structuredData';
import { track } from '../utils/events';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const hasTrackedViewRef = useRef(false);
  const { i18n } = useTranslation();
  const [, setLang] = useState(i18n.language);

  const getOgImageUrl = (url) => {
    if (!url) return null;
    const hasQuery = url.includes('?');
    return `${url}${hasQuery ? '&' : '?'}w=1200&h=630&fit=crop&auto=format`;
  };

  // SEO meta tags for Blog Post page - will be updated when post is loaded
  useSEO({
    title: post ? `${post.title} | Half Half Man Blog` : 'Blog Post | Half Half Man',
    description: post ? (post.excerpt || `Read ${post.title} on Half Half Man Blog`) : 'Blog post on Half Half Man',
    image: getOgImageUrl(post?.mainImage?.asset?.url) || 'https://half-half-man.com/images/og-image.jpg',
    type: 'article'
  });

  useEffect(() => {
    const onLangChange = () => setLang(i18n.language);
    i18n.on('languageChanged', onLangChange);
    return () => i18n.off('languageChanged', onLangChange);
  }, [i18n]);

  const canonicalUrl = typeof window !== 'undefined'
    ? generateCanonicalUrl(window.location.pathname)
    : 'https://half-half-man.com/blog';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]{
          _id,
          "title": coalesce(title.${i18n.language}, title.rs, title.sr, title.en),
          slug,
          author->{name, image{asset->{url}}},
          mainImage{asset->{url}},
          publishedAt,
          "excerpt": coalesce(excerpt.${i18n.language}, excerpt.rs, excerpt.sr, excerpt.en),
          "abstract": coalesce(abstract.${i18n.language}, abstract.rs, abstract.sr, abstract.en),
          "body": coalesce(body.${i18n.language}, body.rs, body.sr, body.en)
        }`;
        
        // Add timeout to prevent hanging requests
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );
        
        const fetchPromise = client.fetch(query, { slug });
        const result = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!result) {
          setError('Post not found');
          return;
        }

        setPost(result);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message === 'Request timeout' ? 
          'Blog post is taking longer than expected to load. Please try again.' : 
          err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug, i18n.language, retryCount]);

  useEffect(() => {
    if (!slug) return;
    if (!post || loading || error) return;
    if (hasTrackedViewRef.current) return;
    hasTrackedViewRef.current = true;
    track('blog_post_view', { slug });
  }, [slug, post, loading, error]);

  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const title = post?.title;
    const description = post?.excerpt || `Read ${post?.title} on Half Half Man Blog`;
    
    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        break;

      case 'twitter':
        const twitterText = `${title}\n\n${description}`;
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(twitterText)}`,
          '_blank',
          'width=600,height=400'
        );
        break;

      case 'linkedin':
        window.open(
          `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(currentUrl)}`,
          '_blank'
        );
        break;

      case 'copy':
        navigator.clipboard.writeText(currentUrl)
          .then(() => alert('Link copied to clipboard!'))
          .catch(err => console.error('Failed to copy link:', err));
        break;

      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-4xl mx-auto px-4 pt-48">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <LoadingSpinner size="large" color="primary" />
            <p className="mt-4 text-primary">Loading blog post...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-4xl mx-auto px-4 pt-48">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog Post</h2>
            <p className="text-red-500 mb-6">{error}</p>
            <button 
              onClick={() => setRetryCount(prev => prev + 1)}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{typeof post?.title === 'object' ? post.title[i18n.language] || post.title.en : post?.title} | Half Half Man Blog</title>
        
        {/* Basic meta tags */}
        <meta name="description" content={post?.excerpt || `Read ${typeof post?.title === 'object' ? post.title[i18n.language] || post.title.en : post?.title} on Half Half Man Blog`} />
        <meta name="author" content={post?.author?.name || 'Half Half Man'} />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify([
            buildBlogPosting({
              headline: typeof post?.title === 'object' ? post.title[i18n.language] || post.title.en : post?.title,
              description: post?.excerpt || `Read ${typeof post?.title === 'object' ? post.title[i18n.language] || post.title.en : post?.title} on Half Half Man Blog`,
              imageUrl: getOgImageUrl(post?.mainImage?.asset?.url) || 'https://half-half-man.com/images/og-image.jpg',
              datePublished: post?.publishedAt,
              authorName: post?.author?.name || 'Half Half Man',
              url: canonicalUrl,
              publisherName: 'Half Half Man',
              publisherLogoUrl: 'https://half-half-man.com/images/og-image.jpg',
            }),
            buildBreadcrumbList([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              {
                name: typeof post?.title === 'object' ? post.title[i18n.language] || post.title.en : post?.title,
                url: `/blog/${slug}`,
              },
            ]),
          ])}
        </script>
      </Helmet>
      
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <article className="max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-center mt-6 mb-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-300"
              >
                <motion.span 
                  className="mr-2"
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  ←
                </motion.span>
                Back to Blog
              </Link>
            </div>

            <header className="mb-12 text-center">
              <motion.h1 
                className="text-4xl font-bold text-primary mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {typeof post.title === 'object' ? post.title[i18n.language] || post.title.en : post.title}
              </motion.h1>

              {post.publishedAt && (
                <motion.time
                  dateTime={post.publishedAt}
                  className="block text-primary/60 mb-3 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </motion.time>
              )}

              {post.author?.name && (
                <motion.div
                  className="flex items-center justify-center gap-2 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {post.author?.image?.asset?.url && (
                    <img
                      src={post.author.image.asset.url}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span className="text-primary/80">
                    By {post.author.name}
                  </span>
                </motion.div>
              )}
              
              {post.mainImage && post.mainImage.asset && (
                <motion.div 
                  className="mb-8 mt-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
                  />
                </motion.div>
              )}
            </header>  

            <motion.div 
              className="prose prose-lg max-w-none text-left leading-relaxed text-[17px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Array.isArray(
                typeof post.body === 'object' && !Array.isArray(post.body)
                  ? post.body[i18n.language] || post.body.en
                  : post.body
              ) ? (
                <PortableText
                  value={
                    typeof post.body === 'object' && !Array.isArray(post.body)
                      ? post.body[i18n.language] || post.body.en
                      : post.body
                  }
                  components={{
                    block: {
                      // Enforce a single H1 on the page (the post title above).
                      // Downgrade any CMS-provided h1 blocks to h2 for proper hierarchy.
                      h1: ({ children }) => (
                        <h2 className="text-2xl font-bold text-primary mt-10 mb-4 text-left">
                          {children}
                        </h2>
                      ),
                      normal: ({ children }) => <p className="mb-5 text-gray-700 text-left">{children}</p>,
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-primary mt-10 mb-4 text-left">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold text-primary mt-8 mb-3 text-left">
                          {children}
                        </h3>
                      ),
                    },
                    list: {
                      bullet: ({children}) => (
                        <ul className="mb-4 text-gray-700 flex flex-col items-start w-full text-left">
                          {children}
                        </ul>
                      ),
                      number: ({children}) => (
                        <ol className="mb-4 text-gray-700 flex flex-col items-start w-full text-left">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({children}) => (
                        <li className="mb-2 text-gray-700 flex items-center gap-2 before:content-['•'] before:inline-block">
                          {children}
                        </li>
                      ),
                      number: ({children}) => (
                        <li className="mb-2 text-gray-700 flex items-center gap-2">
                          {children}
                        </li>
                      ),
                    },
                    marks: {
                      link: ({value, children}) => {
                        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
                        return (
                          <a
                            href={value?.href}
                            target={target}
                            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                            className="text-primary hover:text-primary-dark underline transition-colors duration-300"
                          >
                            {children}
                          </a>
                        );
                      },
                      strong: ({children}) => <strong className="font-bold">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                      code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded">{children}</code>,
                    },
                    types: {
                      image: ({value}) => (
                        <motion.div 
                          className="my-8"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <img
                            src={value.asset?.url}
                            alt={value.alt || ''}
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                          {value.caption && (
                            <p className="text-center text-sm text-gray-500 mt-2">{value.caption}</p>
                          )}
                        </motion.div>
                      ),
                      code: ({value}) => (
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                          <code>{value.code}</code>
                        </pre>
                      ),
                    },
                  }}
                />
              ) : (
                <p className="text-red-500 italic">
                  {typeof post.body === 'string'
                    ? post.body
                    : 'This content is not available or improperly formatted.'}
                </p>
              )}
            </motion.div>

            {/* Share Section */}
            <div className="flex items-center gap-4 mt-16 border-t border-primary/10 pt-8">
              <span className="text-primary/60">Share:</span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <button
                  className="text-primary hover:text-[#1877F2] transition-colors duration-300"
                  onClick={() => handleShare('facebook')}
                  aria-label="Share on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </button>
                {/* Twitter/X */}
                <button
                  className="text-primary hover:text-black transition-colors duration-300"
                  onClick={() => handleShare('twitter')}
                  aria-label="Share on X (Twitter)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                {/* LinkedIn */}
                <button
                  className="text-primary hover:text-[#0A66C2] transition-colors duration-300"
                  onClick={() => handleShare('linkedin')}
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                {/* Copy Link */}
                <button
                  className="text-primary hover:text-gray-700 transition-colors duration-300"
                  onClick={() => handleShare('copy')}
                  aria-label="Copy link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </article>
      </div>
    </>
  );
};

export default BlogPost; 