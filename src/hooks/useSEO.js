import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { generateCanonicalUrl, generateAlternateUrls } from '../utils/seo';

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
    // Generate canonical URL for current page
    const canonicalUrl = generateCanonicalUrl(location.pathname);
    const alternateUrls = generateAlternateUrls(location.pathname);
    
    // Update document head with SEO meta tags
    const updateMetaTags = () => {
      // Canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;

      // Alternate language URLs
      Object.entries(alternateUrls).forEach(([lang, url]) => {
        let alternate = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
        if (!alternate) {
          alternate = document.createElement('link');
          alternate.rel = 'alternate';
          alternate.hreflang = lang;
          document.head.appendChild(alternate);
        }
        alternate.href = url;
      });

      // Default alternate (x-default)
      let defaultAlternate = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
      if (!defaultAlternate) {
        defaultAlternate = document.createElement('link');
        defaultAlternate.rel = 'alternate';
        defaultAlternate.hreflang = 'x-default';
        document.head.appendChild(defaultAlternate);
      }
      defaultAlternate.href = canonicalUrl;

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
    canonicalUrl: generateCanonicalUrl(location.pathname),
    alternateUrls: generateAlternateUrls(location.pathname)
  };
}; 