# SEO Implementation Guide

## Overview
This project now includes a comprehensive SEO system with automatic canonical URL generation, alternate language tags, and dynamic meta tag management.

## How It Works

### 1. Automatic Canonical URLs
- Every page automatically gets a canonical URL based on the current route
- Format: `https://half-half-man.com{pathname}`
- Example: `/blog` → `https://half-half-man.com/blog`

### 2. Alternate Language Tags
- Automatically generates `hreflang` tags for all supported languages
- Includes `x-default` for search engines
- Supports: en, it, es, de, fr, el, sr

### 3. Dynamic Meta Tags
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Robots meta tags
- All updated automatically based on page content

## Usage

### Basic Page SEO
```jsx
import { useSEO } from '../hooks/useSEO';

const MyPage = () => {
  useSEO({
    title: 'Page Title | Half Half Man',
    description: 'Page description for search engines',
    image: 'https://half-half-man.com/path/to/image.jpg',
    type: 'website' // or 'article' for blog posts
  });
  
  return <div>Page content</div>;
};
```

### Blog Post SEO
```jsx
const BlogPost = () => {
  const [post, setPost] = useState(null);
  
  useSEO({
    title: post ? `${post.title} | Half Half Man Blog` : 'Blog Post | Half Half Man',
    description: post ? post.excerpt : 'Blog post description',
    image: post?.mainImage || 'https://half-half-man.com/default-image.jpg',
    type: 'article'
  });
  
  // ... rest of component
};
```

### Advanced Options
```jsx
useSEO({
  title: 'Page Title',
  description: 'Page description',
  image: 'https://example.com/image.jpg',
  type: 'website',
  noindex: false, // Set to true to prevent indexing
  nofollow: false, // Set to true to prevent following links
  keywords: 'keyword1, keyword2' // Optional keywords
});
```

## Generated HTML
The system automatically generates these tags in the document head:

```html
<!-- Canonical URL -->
<link rel="canonical" href="https://half-half-man.com/current-page" />

<!-- Alternate language URLs -->
<link rel="alternate" hreflang="en" href="https://half-half-man.com/current-page" />
<link rel="alternate" hreflang="it" href="https://half-half-man.com/current-page" />
<link rel="alternate" hreflang="es" href="https://half-half-man.com/current-page" />
<!-- ... other languages -->
<link rel="alternate" hreflang="x-default" href="https://half-half-man.com/current-page" />

<!-- Open Graph tags -->
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://half-half-man.com/current-page" />
<meta property="og:type" content="website" />

<!-- Twitter Card tags -->
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Page description" />
<meta name="twitter:image" content="https://example.com/image.jpg" />

<!-- Robots meta tag -->
<meta name="robots" content="index, follow" />
```

## Benefits

1. **Better SEO**: Canonical URLs prevent duplicate content issues
2. **International SEO**: Proper hreflang tags for multi-language support
3. **Social Media**: Optimized Open Graph and Twitter Card tags
4. **Search Engine Control**: Easy to set noindex/nofollow when needed
5. **Automatic Updates**: Meta tags update automatically when content changes

## Testing

To verify the implementation:

1. **View Page Source**: Check that canonical and hreflang tags are present
2. **Google Search Console**: Monitor indexing and search performance
3. **Social Media Testing**: Use Facebook Debugger and Twitter Card Validator
4. **Browser DevTools**: Inspect the `<head>` section for meta tags

## Files Modified

- `src/utils/seo.js` - SEO utility functions
- `src/hooks/useSEO.js` - Custom hook for SEO management
- `src/components/layout/Layout.jsx` - Base SEO implementation
- `src/pages/Home.jsx` - Example usage
- `src/pages/Blog.jsx` - Example usage
- `src/pages/BlogPost.jsx` - Dynamic SEO example
- `src/pages/Projects.jsx` - Example usage
- `index.html` - Default canonical tag 