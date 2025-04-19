import { createClient } from "@sanity/client";

// Read token from environment variable
const token = import.meta.env.VITE_SANITY_TOKEN;

export const client = createClient({
    projectId: 't3tjtxfl',
    dataset: 'production',
    apiVersion: '2024-03-19',
    useCdn: false,
    token: token,
});

// Test the connection with the simplest possible query
const testConnection = async () => {
    try {
        console.log('Testing Sanity connection...');
        console.log('Project ID:', client.config().projectId);
        console.log('Dataset:', client.config().dataset);
        console.log('Token exists:', !!client.config().token);
        console.log('API Version:', client.config().apiVersion);
        
        const result = await client.fetch('*[_type == "post"][0...5]');
        console.log('Connection test result:', result);
        if (result && result.length > 0) {
            console.log('Found posts:', result.length);
            console.log('First post title:', result[0]?.title);
        } else {
            console.log('No posts found in the dataset');
        }
    } catch (error) {
        console.error('Sanity connection error:', {
            message: error.message,
            statusCode: error.statusCode,
            details: error.details,
            stack: error.stack
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
