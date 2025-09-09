// URL normalization and redirect utilities for SEO

/**
 * Normalizes a URL path to prevent duplicate content issues
 * @param {string} pathname - The current pathname
 * @returns {string} - Normalized pathname
 */
export const normalizePath = (pathname) => {
  if (!pathname) return '/';
  
  // Remove query parameters and hash fragments
  let normalized = pathname.split('?')[0].split('#')[0];
  
  // Remove trailing slash except for root
  if (normalized !== '/' && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  
  // Convert to lowercase for consistency
  normalized = normalized.toLowerCase();
  
  // Ensure we have a valid path
  if (!normalized || normalized === '') {
    normalized = '/';
  }
  
  return normalized;
};

/**
 * Checks if a URL should be redirected to prevent duplicates
 * @param {string} currentPath - Current pathname
 * @param {string} normalizedPath - Normalized pathname
 * @returns {boolean} - Whether a redirect is needed
 */
export const shouldRedirect = (currentPath, normalizedPath) => {
  return currentPath !== normalizedPath;
};

/**
 * Common duplicate URL patterns to handle
 */
export const DUPLICATE_PATTERNS = [
  // Trailing slash variations
  { pattern: /^(.+)\/$/, replacement: '$1' },
  
  // Case variations
  { pattern: /^\/Projects/i, replacement: '/projects' },
  { pattern: /^\/Blog/i, replacement: '/blog' },
  { pattern: /^\/Contact/i, replacement: '/contact' },
  { pattern: /^\/Tech-Stack/i, replacement: '/tech-stack' },
  { pattern: /^\/Faq/i, replacement: '/faq' },
  { pattern: /^\/Privacy-Policy/i, replacement: '/privacy-policy' },
  
  // Query parameter variations
  { pattern: /^(.+)\?.*$/, replacement: '$1' },
  
  // Hash fragment variations
  { pattern: /^(.+)#.*$/, replacement: '$1' },
];

/**
 * Old URL redirects to prevent Soft 404s
 */
export const OLD_URL_REDIRECTS = [
  // Old tech-stack URLs that cause Soft 404s
  { pattern: /^\/tech-stack\/security\/?$/, replacement: '/tech-stack/cybersecurity-practices' },
  { pattern: /^\/tech-stack\/backend\/?$/, replacement: '/tech-stack/code-engineering' },
  { pattern: /^\/tech-stack\/frontend\/?$/, replacement: '/tech-stack/nocode-solutions' },
  { pattern: /^\/tech-stack\/tools\/?$/, replacement: '/tech-stack/optimization-maintenance' },
];

/**
 * Protocol and subdomain normalization patterns
 */
export const PROTOCOL_SUBDOMAIN_PATTERNS = [
  // HTTP to HTTPS redirects
  { pattern: /^http:\/\/(www\.)?half-half-man\.com/, replacement: 'https://half-half-man.com' },
  
  // WWW to non-WWW redirects
  { pattern: /^https:\/\/www\.half-half-man\.com/, replacement: 'https://half-half-man.com' },
];

/**
 * Applies duplicate pattern fixes to a path
 * @param {string} pathname - The pathname to fix
 * @returns {string} - Fixed pathname
 */
export const fixDuplicatePatterns = (pathname) => {
  let fixed = pathname;
  
  for (const { pattern, replacement } of DUPLICATE_PATTERNS) {
    if (pattern.test(fixed)) {
      fixed = fixed.replace(pattern, replacement);
    }
  }
  
  return normalizePath(fixed);
};

/**
 * Normalizes a full URL including protocol and subdomain
 * @param {string} url - The full URL to normalize
 * @returns {string} - Normalized URL
 */
export const normalizeFullUrl = (url) => {
  if (!url) return 'https://half-half-man.com/';
  
  let normalized = url;
  
  // Apply protocol and subdomain normalization
  for (const { pattern, replacement } of PROTOCOL_SUBDOMAIN_PATTERNS) {
    if (pattern.test(normalized)) {
      normalized = normalized.replace(pattern, replacement);
    }
  }
  
  // Extract pathname and normalize it
  try {
    const urlObj = new URL(normalized);
    const normalizedPath = normalizePath(urlObj.pathname);
    return `${urlObj.protocol}//${urlObj.host}${normalizedPath}`;
  } catch (error) {
    // If URL parsing fails, just normalize the pathname
    return `https://half-half-man.com${normalizePath(url)}`;
  }
};

/**
 * Checks if a full URL needs to be redirected
 * @param {string} currentUrl - Current full URL
 * @param {string} normalizedUrl - Normalized URL
 * @returns {boolean} - Whether a redirect is needed
 */
export const shouldRedirectUrl = (currentUrl, normalizedUrl) => {
  return currentUrl !== normalizedUrl;
};

/**
 * Checks if a pathname needs to be redirected due to old URL patterns
 * @param {string} pathname - The current pathname
 * @returns {string|null} - The redirect target or null if no redirect needed
 */
export const checkOldUrlRedirect = (pathname) => {
  for (const { pattern, replacement } of OLD_URL_REDIRECTS) {
    if (pattern.test(pathname)) {
      return replacement;
    }
  }
  return null;
};
