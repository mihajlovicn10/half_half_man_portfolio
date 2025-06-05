import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 't3tjtxfl',
  dataset: 'production',
  apiVersion: '2024-03-19',
  token: process.env.SANITY_SECRET_TOKEN, // Use a secret env var!
  useCdn: false,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({ error: 'Missing postId' });
  }
  try {
    // Log the like attempt
    console.log(`Attempting to like post: ${postId}`);
    
    const updated = await client
      .patch(postId)
      .inc({ likes: 1 })
      .commit();
    
    // Log successful like
    console.log(`Successfully liked post: ${postId}, new like count: ${updated.likes}`);
    
    res.status(200).json({ likes: updated.likes });
  } catch (err) {
    // Log the error
    console.error(`Error liking post ${postId}:`, err);
    
    // Send appropriate error response
    res.status(500).json({ 
      error: 'Failed to update likes',
      message: err.message 
    });
  }
}