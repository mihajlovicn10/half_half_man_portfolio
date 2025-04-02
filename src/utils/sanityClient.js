import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: 't3tjtxfl',
    dataset: 'production',
    apiVersion: '2024-03-19',
    useCdn: false,
});

// Test the connection with the simplest possible query
const testConnection = async () => {
    try {
        console.log('Testing Sanity connection...');
        console.log('Project ID:', client.config().projectId);
        console.log('Dataset:', client.config().dataset);
        console.log('Token exists:', !!client.config().token);
        
        const result = await client.fetch('*[_type == "post"][0...5]');
        console.log('Connection test result:', result);
        if (result && result.length > 0) {
            console.log('Found posts:', result.length);
            console.log('First post:', result[0]);
        } else {
            console.log('No posts found in the dataset');
        }
    } catch (error) {
        console.error('Sanity connection error:', {
            message: error.message,
            statusCode: error.statusCode,
            details: error.details,
        });
    }
};

// Run the test immediately
testConnection();

// Simplified query for debugging
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    body
}`;
