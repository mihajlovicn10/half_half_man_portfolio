// SEO utility functions
export const generateCanonicalUrl = (pathname = '') => {
  const baseUrl = 'https://half-half-man.com';
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${baseUrl}${cleanPath}`;
};

export const generateAlternateUrls = (pathname = '', languages = ['en', 'it', 'es', 'de', 'fr', 'el', 'sr']) => {
  const baseUrl = 'https://half-half-man.com';
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  
  return languages.reduce((acc, lang) => {
    acc[lang] = `${baseUrl}${cleanPath}`;
    return acc;
  }, {});
};

// Language-specific URL patterns (if you have different URL structures per language)
export const getLanguageSpecificUrl = (pathname, language) => {
  const baseUrl = 'https://half-half-man.com';
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  
  // If you have language-specific URLs, you can modify this logic
  // For now, we'll use the same URL structure for all languages
  return `${baseUrl}${cleanPath}`;
}; 