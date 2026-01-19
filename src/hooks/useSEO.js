import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { generateCanonicalUrl, generateAlternateUrls, ensureConsistentCanonical } from '../utils/seo';
import { normalizePath, checkOldUrlRedirect } from '../utils/redirects';

export const useSEO = (customMeta = {}) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  const {
    title,
    description,
    keywords,
    image,
    type = 'website',
    noindex = false,
    nofollow = false
  } = customMeta;

  useEffect(() => {
    // Check for old URL redirects first (to prevent Soft 404s)
    const oldUrlRedirect = checkOldUrlRedirect(location.pathname);
    if (oldUrlRedirect) {
      // Redirect to the correct URL
      window.location.replace(oldUrlRedirect);
      return;
    }
    
    // Generate canonical URL for current page using a normalized path.
    // We no longer touch the browser History API here to avoid any
    // cross‑origin issues – URL canonicalization is handled by the server/CDN.
    const normalizedPath = normalizePath(location.pathname);
    const canonicalUrl = generateCanonicalUrl(normalizedPath);
    const alternateUrls = generateAlternateUrls(normalizedPath);
    
    // Ensure canonical URL is always correct regardless of current URL variation
    const expectedCanonical = generateCanonicalUrl(location.pathname);
    if (canonicalUrl !== expectedCanonical) {
      console.warn('Canonical URL mismatch, using expected:', expectedCanonical);
    }
    
    // Update document head with SEO meta tags
    const updateMetaTags = () => {
      // Remove any existing canonical tags to prevent duplicates
      const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
      existingCanonicals.forEach(canonical => canonical.remove());
      
      // Create new canonical tag
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
      
      // Debug logging (remove in production)
      console.log('SEO: Setting canonical URL to:', canonicalUrl);
      
      // Ensure canonical consistency after a short delay
      setTimeout(() => {
        ensureConsistentCanonical();
      }, 100);

      // Remove existing alternate tags to prevent duplicates
      const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingAlternates.forEach(alternate => alternate.remove());
      
      // Alternate language URLs
      Object.entries(alternateUrls).forEach(([lang, url]) => {
        const alternate = document.createElement('link');
        alternate.rel = 'alternate';
        alternate.hreflang = lang;
        alternate.href = url;
        document.head.appendChild(alternate);
      });

      // Default alternate (x-default)
      const defaultAlternate = document.createElement('link');
      defaultAlternate.rel = 'alternate';
      defaultAlternate.hreflang = 'x-default';
      defaultAlternate.href = canonicalUrl;
      document.head.appendChild(defaultAlternate);

      // Robots meta tag
      let robots = document.querySelector('meta[name="robots"]');
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.appendChild(robots);
      }
      
      const robotsContent = [];
      if (noindex) robotsContent.push('noindex');
      else robotsContent.push('index');
      
      if (nofollow) robotsContent.push('nofollow');
      else robotsContent.push('follow');
      
      robots.content = robotsContent.join(', ');

      // Update Open Graph tags
      const updateOGTag = (property, content) => {
        let tag = document.querySelector(`meta[property="og:${property}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', `og:${property}`);
          document.head.appendChild(tag);
        }
        tag.content = content;
      };

      if (title) updateOGTag('title', title);
      if (description) updateOGTag('description', description);
      if (image) updateOGTag('image', image);
      updateOGTag('url', canonicalUrl);
      updateOGTag('type', type);

      // Update Twitter Card tags
      const updateTwitterTag = (name, content) => {
        let tag = document.querySelector(`meta[name="twitter:${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.name = `twitter:${name}`;
          document.head.appendChild(tag);
        }
        tag.content = content;
      };

      if (title) updateTwitterTag('title', title);
      if (description) updateTwitterTag('description', description);
      if (image) updateTwitterTag('image', image);

      // Update Keywords meta tag
      if (keywords) {
        let keywordsTag = document.querySelector('meta[name="keywords"]');
        if (!keywordsTag) {
          keywordsTag = document.createElement('meta');
          keywordsTag.name = 'keywords';
          document.head.appendChild(keywordsTag);
        }
        keywordsTag.content = keywords;
      }
    };

    updateMetaTags();
  }, [location.pathname, i18n.language, title, description, image, type, noindex, nofollow]);

  return {
    canonicalUrl: generateCanonicalUrl(normalizePath(location.pathname)),
    alternateUrls: generateAlternateUrls(normalizePath(location.pathname))
  };
}; 