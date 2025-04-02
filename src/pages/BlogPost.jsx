import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { client } from '../utils/sanityClient';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const query = `*[_type == "post" && slug.current == $slug][0]{
          title,
          publishedAt,
          body,
          "mainImage": mainImage.asset->url,
          excerpt
        }`;

        const data = await client.fetch(query, { slug });
        
        if (!data) {
          throw new Error('Post not found');
        }

        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-4xl mx-auto px-4 pt-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-primary">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-4xl mx-auto px-4 pt-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error</h2>
            <p className="mt-2 text-gray-600">{error || 'Blog post not found'}</p>
            <Link 
              to="/blog"
              className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
      <article className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <Link 
          to="/blog"
          className="inline-block mb-8 text-primary hover:text-primary-dark transition-colors"
        >
          ← Back to Blog
        </Link>
        
        <header className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-primary/60">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          )}
        </header>

        {post.mainImage && (
          <div className="mb-8">
            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <PortableText 
            value={post.body}
            components={{
              block: {
                normal: ({children}) => <p className="mb-4 text-gray-700">{children}</p>,
                h2: ({children}) => <h2 className="text-2xl font-bold text-primary mt-8 mb-4">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-bold text-primary mt-6 mb-3">{children}</h3>,
              },
              list: {
                bullet: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>,
                number: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-700">{children}</ol>,
              },
              marks: {
                link: ({children, value}) => (
                  <a href={value.href} className="text-primary hover:text-primary-dark underline">
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogPost; 