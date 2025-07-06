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

// Updated query with language support
export const postsQuery = (lang = 'en') => `*[_type == "post"] | order(publishedAt desc) {
    _id,
    "title": coalesce(title.${lang}, title.rs, title.sr, title.en),
    "slug": slug.current,
    publishedAt,
    "excerpt": coalesce(excerpt.${lang}, excerpt.rs, excerpt.sr, excerpt.en),
    "abstract": coalesce(abstract.${lang}, abstract.rs, abstract.sr, abstract.en),
    "mainImage": mainImage.asset->url,
    "body": coalesce(body.${lang}, body.rs, body.sr, body.en),
    "comments": *[_type == "comment" && post._ref == ^._id] | order(createdAt desc) {
        _id,
        name,
        message,
        createdAt
    }
}`;
