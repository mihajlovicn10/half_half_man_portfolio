// SEO utility functions
export const generateCanonicalUrl = (pathname = '') => {
  // Always use HTTPS and no www for canonical URLs
  const baseUrl = 'https://half-half-man.com';
  
  // Normalize the pathname
  let cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  
  // Remove trailing slash except for root
  if (cleanPath !== '/' && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // Convert to lowercase for consistency
  cleanPath = cleanPath.toLowerCase();
  
  // Remove query parameters and hash fragments
  cleanPath = cleanPath.split('?')[0].split('#')[0];
  
  // Ensure we have a valid path
  if (!cleanPath || cleanPath === '') {
    cleanPath = '/';
  }
  
  const canonicalUrl = `${baseUrl}${cleanPath}`;
  
  // Validate the canonical URL format
  try {
    new URL(canonicalUrl);
    return canonicalUrl;
  } catch (error) {
    console.error('Invalid canonical URL generated:', canonicalUrl, error);
    return baseUrl; // Fallback to base URL
  }
};

export const generateAlternateUrls = (pathname = '', languages = ['en', 'it', 'es', 'de', 'fr', 'el', 'sr']) => {
  const baseUrl = 'https://half-half-man.com';
  
  // Use the same normalization as canonical URL
  let cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  
  // Remove trailing slash except for root
  if (cleanPath !== '/' && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // Convert to lowercase for consistency
  cleanPath = cleanPath.toLowerCase();
  
  // Remove query parameters and hash fragments
  cleanPath = cleanPath.split('?')[0].split('#')[0];
  
  // Ensure we have a valid path
  if (!cleanPath || cleanPath === '') {
    cleanPath = '/';
  }
  
  return languages.reduce((acc, lang) => {
    acc[lang] = `${baseUrl}${cleanPath}`;
    return acc;
  }, {});
};

/**
 * Ensures consistent canonical tags across all URL variations
 * This prevents "Alternate page with proper canonical tag" errors
 */
export const ensureConsistentCanonical = () => {
  // Get all canonical tags
  const canonicalTags = document.querySelectorAll('link[rel="canonical"]');
  
  if (canonicalTags.length === 0) {
    console.warn('No canonical tags found');
    return;
  }
  
  if (canonicalTags.length > 1) {
    console.warn('Multiple canonical tags found, removing duplicates');
    // Keep only the first one, remove the rest
    for (let i = 1; i < canonicalTags.length; i++) {
      canonicalTags[i].remove();
    }
  }
  
  // Validate the canonical URL
  const canonicalUrl = canonicalTags[0].href;
  if (!canonicalUrl.startsWith('https://half-half-man.com')) {
    console.error('Invalid canonical URL:', canonicalUrl);
    // Fix it
    canonicalTags[0].href = 'https://half-half-man.com/';
  }
  
  console.log('Canonical URL validated:', canonicalTags[0].href);
};

// Language-specific URL patterns (if you have different URL structures per language)
export const getLanguageSpecificUrl = (pathname, language) => {
  const baseUrl = 'https://half-half-man.com';
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  
  // If you have language-specific URLs, you can modify this logic
  // For now, we'll use the same URL structure for all languages
  return `${baseUrl}${cleanPath}`;
}; 