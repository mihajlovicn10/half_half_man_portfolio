import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, postsQuery } from '../utils/sanityClient';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Log the client configuration for debugging
        console.log('Sanity Client Config:', {
          projectId: client.config().projectId,
          dataset: client.config().dataset,
          useCdn: client.config().useCdn,
          withCredentials: client.config().withCredentials
        });

        const data = await client.fetch(postsQuery);

        if (!data) {
          throw new Error('No data received from Sanity');
        }

        console.log('Fetched blog posts:', data);
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error details:', {
          message: err.message,
          name: err.name,
          stack: err.stack,
          response: err.response
        });
        
        if (err.message.includes('CORS')) {
          setError('CORS Error: Unable to connect to the blog service. Please check the CORS configuration.');
        } else if (err.message.includes('Failed to fetch')) {
          setError('Network Error: Unable to reach the blog service. Please check your connection.');
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-6xl mx-auto px-4 pt-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-primary">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-6xl mx-auto px-4 pt-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <p className="mt-2 text-sm text-gray-500">Check the browser console for more details.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
      <section className="w-full pb-12">
        <div className="max-w-6xl mx-auto px-4 pt-24">
          <h2 className="text-4xl font-serif font-bold text-center text-primary mb-12">
            Blog — Insights & Technical Deep Dives
          </h2>
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link 
                  key={post._id}
                  to={`/blog/${post.slug.current}`}
                  className="block"
                >
                  <div className="bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:bg-tertiary/5 border border-primary/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">{post.title}</h3>
                        {post.publishedAt && (
                          <p className="mt-2 text-sm text-primary/60">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </p>
                        )}
                        {post.excerpt && (
                          <p className="mt-4 text-gray-600">{post.excerpt}</p>
                        )}
                      </div>
                      {post.mainImage && (
                        <div className="ml-6 flex-shrink-0">
                          <img 
                            src={post.mainImage}
                            alt={post.title}
                            className="w-32 h-32 object-cover rounded-xl"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-primary/60">
                <p>No blog posts found.</p>
                <p className="mt-2 text-sm">Check back soon for new content!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
    
