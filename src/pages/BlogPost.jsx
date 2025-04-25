import { PortableText } from '@portabletext/react';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../utils/sanityClient';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentUsername, setCommentUsername] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentMessage, setCommentMessage] = useState('');
  const [liked, setLiked] = useState(false);
  const { t } = useTranslation();

  // Get the absolute URL for sharing
  const getAbsoluteUrl = () => {
    return window.location.href;
  };

  // Get absolute image URL with correct dimensions
  const getAbsoluteImageUrl = (relativeUrl) => {
    if (!relativeUrl) return null;
    // Add Sanity image transformation parameters for LinkedIn (1920x1080)
    return `${relativeUrl}?w=1920&h=1080&fit=crop&auto=format`;
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          author->{name, image},
          mainImage,
          publishedAt,
          body,
          likes,
          "comments": *[_type == "comment" && post._ref == ^._id] | order(createdAt desc) {
            _id,
            name,
            message,
            createdAt
          }
        }`;
        
        const result = await client.fetch(query, { slug });
        
        if (!result) {
          setError('Post not found');
          return;
        }

        setPost(result);
        // Check if the post is liked in localStorage
        const isLiked = localStorage.getItem(`post_${result._id}_liked`) === 'true';
        setHasLiked(isLiked);
        setLikes(result.likes || 0);
        setComments(result.comments || []);

        // Update meta tags for prerendering
        if (typeof window !== 'undefined') {
          const metaTags = document.getElementsByTagName('meta');
          for (let i = 0; i < metaTags.length; i++) {
            if (metaTags[i].getAttribute('property') === 'og:title') {
              metaTags[i].setAttribute('content', result.title);
            }
            if (metaTags[i].getAttribute('property') === 'og:description') {
              metaTags[i].setAttribute('content', result.excerpt || `Read ${result.title} on Half Half Man Blog`);
            }
            if (metaTags[i].getAttribute('property') === 'og:image') {
              metaTags[i].setAttribute('content', result.mainImage);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const handleLike = async () => {
    if (!post || hasLiked) return;
    
    try {
      const newLikes = (post.likes || 0) + 1;
      await client
        .patch(post._id)
        .set({ likes: newLikes })
        .commit();
      
      setPost({ ...post, likes: newLikes });
      setHasLiked(true);
      // Store like state in localStorage
      localStorage.setItem(`post_${post._id}_liked`, 'true');
    } catch (err) {
      console.error('Error updating likes:', err);
      toast.error(t('blog.post.like.error'));
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentMessage.trim()) return;

    try {
      // Create the comment document in Sanity
      const commentDoc = {
        _type: 'comment',
        post: {
          _type: 'reference',
          _ref: post._id
        },
        name: commentName.trim(),
        message: commentMessage.trim(),
        createdAt: new Date().toISOString()
      };

      const createdComment = await client.create(commentDoc);
      
      // Update local state
      setPost({
        ...post,
        comments: [
          {
            _id: createdComment._id,
            name: commentName,
            message: commentMessage,
            createdAt: new Date().toISOString()
          },
          ...(post.comments || [])
        ]
      });

      // Reset form
      setCommentName('');
      setCommentMessage('');
      toast.success(t('blog.post.comments.success'));
    } catch (err) {
      console.error('Error submitting comment:', err);
      toast.error(t('blog.post.comments.error'));
    }
  };

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

  if (error || !post) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-4xl mx-auto px-4 pt-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Post</h2>
            <p className="text-gray-600 mb-8">Please try again later</p>
            <Link 
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300"
            >
              Return to Blog
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post?.title} | Half Half Man Blog</title>
        
        {/* Basic meta tags */}
        <meta name="description" content={post?.excerpt || `Read ${post?.title} on Half Half Man Blog`} />
        <meta name="author" content={post?.author?.name || 'Half Half Man'} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.excerpt || `Read ${post?.title} on Half Half Man Blog`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={getAbsoluteUrl()} />
        {post?.mainImage && (
          <>
            <meta property="og:image" content={post.mainImage} />
            <meta property="og:image:secure_url" content={post.mainImage} />
          </>
        )}

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post?.title,
            "description": post?.excerpt,
            "image": post?.mainImage,
            "datePublished": post?.publishedAt,
            "author": {
              "@type": "Person",
              "name": post?.author?.name || "Half Half Man"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Half Half Man Blog",
              "logo": {
                "@type": "ImageObject",
                "url": "https://half-half-man.herokuapp.com/src/assets/logo/LOGO.jpg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": getAbsoluteUrl()
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <article className="max-w-4xl mx-auto px-4 pt-48 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors duration-300"
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

            <header className="mb-12 text-center">
              <motion.h1 
                className="text-4xl font-bold text-primary mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {post.title}
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
                  {post.author.image && (
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span className="text-primary/80">
                    By {post.author.name}
                  </span>
                </motion.div>
              )}
              
              {post.mainImage && (
                <motion.div 
                  className="mb-8 mt-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <img
                    src={post.mainImage}
                    alt={post.title}
                    className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
                  />
                </motion.div>
              )}
            </header>

            <motion.div 
              className="prose prose-lg max-w-none text-left [&>h1]:text-center [&>h2]:text-center [&>h3]:text-center [&>h4]:text-center [&>h5]:text-center [&>h6]:text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Array.isArray(post.body) ? (
                <PortableText
                  value={post.body}
                  components={{
                    block: {
                      normal: ({children}) => <p className="mb-4 text-gray-700 text-left">{children}</p>,
                      h2: ({children}) => <h2 className="text-2xl font-bold text-primary mt-8 mb-4 text-center">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl font-bold text-primary mt-6 mb-3 text-center">{children}</h3>,
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

            <motion.div
              className="mt-16 border-t border-primary/10 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Like Section */}
                <div className="flex items-center gap-3">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 ${
                      hasLiked 
                        ? 'bg-primary/20 text-primary cursor-default'
                        : 'bg-primary/5 hover:bg-primary/10 text-primary'
                    }`}
                    onClick={handleLike}
                    disabled={hasLiked}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${hasLiked ? 'fill-primary' : 'fill-none'} text-primary`} 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                    <span>{hasLiked ? 'Liked' : 'Like'}</span>
                  </button>
                  <span className="text-primary/60">{likes} likes</span>
                </div>

                {/* Comment Section */}
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
                  onClick={() => setShowComments(!showComments)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-primary/60">Comments ({comments.length})</span>
                </button>

                {/* Share Section */}
                <div className="flex items-center gap-4">
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
              </div>
            </motion.div>

            {/* Comments Section */}
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8"
              >
                <form onSubmit={handleCommentSubmit} className="mb-6 space-y-4">
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="Your name..."
                      className="px-4 py-2 rounded-full bg-primary/5 focus:bg-primary/10 focus:outline-none transition-colors duration-300"
                      required
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentMessage}
                        onChange={(e) => setCommentMessage(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-2 rounded-full bg-primary/5 focus:bg-primary/10 focus:outline-none transition-colors duration-300"
                        required
                      />
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!commentName.trim() || !commentMessage.trim()}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </form>

                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <motion.div
                      key={comment._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-primary/5 rounded-lg p-4"
                    >
                      <p className="text-primary">{comment.message}</p>
                      <p className="text-primary/60 text-sm mt-2">
                        <span className="font-medium">{comment.name}</span>
                        <span className="mx-2">•</span>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </article>
      </div>
    </>
  );
};

export default BlogPost; 