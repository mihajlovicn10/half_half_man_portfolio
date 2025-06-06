import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { client, postsQuery } from '../utils/sanityClient';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await client.fetch(postsQuery(i18n.language));
        if (!data) {
          throw new Error('No data received from Sanity');
        }
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(t('blog.error.fetchError'));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [t, i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-6xl mx-auto px-4 pt-48">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-primary">{t('blog.loading')}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-6xl mx-auto px-4 pt-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-red-600">{t('blog.error.title')}</h2>
            <p className="mt-2 text-[17px] text-primary/80">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300"
            >
              {t('blog.error.tryAgain')}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{typeof t('blog.meta.title') === 'object' ? t('blog.meta.title')[i18n.language] || t('blog.meta.title').en : t('blog.meta.title')}</title>
        <meta name="description" content={typeof t('blog.meta.description') === 'object' ? t('blog.meta.description')[i18n.language] || t('blog.meta.description').en : t('blog.meta.description')} />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <section className="w-full py-16">
          <div className="max-w-6xl mx-auto px-4 pt-48">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-primary mb-12"
            >
              {t('blog.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[17px] text-center text-primary/80 mb-12"
            >
              {t('blog.meta.description')}
            </motion.p>
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <motion.div 
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-[#e2e8f0] transition-all duration-300 hover:bg-[#f1f5f9]/90"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-grow">
                            <h3 className="text-2xl font-semibold text-primary">{post.title}</h3>
                            {post.abstract && (
                              <p className="mt-2 text-primary/90 text-base italic">{post.abstract}</p>
                            )}
                            {post.excerpt && (
                              <p className="mt-2 text-primary/80 text-base">{post.excerpt}</p>
                            )}
                            {post.publishedAt && (
                              <p className="mt-2 text-sm text-primary/60">
                                {new Date(post.publishedAt).toLocaleDateString(i18n.language, {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            )}
                          </div>
                          {post.mainImage && (
                            <motion.div 
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="ml-6 flex-shrink-0"
                            >
                              <img 
                                src={post.mainImage}
                                alt={`${t('blog.featuredImageAlt')} ${post.title}`}
                                className="w-32 h-32 object-cover rounded-xl shadow-md"
                              />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-[17px] text-primary/80">{t('blog.noPosts.message')}</p>
                  <p className="mt-2 text-sm text-primary/60">{t('blog.noPosts.checkBack')}</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
    
