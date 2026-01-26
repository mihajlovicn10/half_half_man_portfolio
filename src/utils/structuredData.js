const BASE_URL = 'https://half-half-man.com';

const toAbsoluteUrl = (urlOrPath) => {
  if (!urlOrPath) return undefined;
  try {
    return new URL(urlOrPath, BASE_URL).toString();
  } catch {
    return undefined;
  }
};

export const buildBreadcrumbList = (items = []) => {
  const itemListElement = items
    .filter((it) => it?.name && it?.url)
    .map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: toAbsoluteUrl(it.url),
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};

export const buildOrganization = ({
  name = 'Half Half Man',
  url = BASE_URL,
  logoUrl,
  sameAs = [],
} = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  url: toAbsoluteUrl(url),
  ...(logoUrl ? { logo: toAbsoluteUrl(logoUrl) } : {}),
  ...(Array.isArray(sameAs) && sameAs.length ? { sameAs: sameAs.map(toAbsoluteUrl).filter(Boolean) } : {}),
});

export const buildPerson = ({
  name = 'Half Half Man',
  url = BASE_URL,
  imageUrl,
  sameAs = [],
} = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name,
  url: toAbsoluteUrl(url),
  ...(imageUrl ? { image: toAbsoluteUrl(imageUrl) } : {}),
  ...(Array.isArray(sameAs) && sameAs.length ? { sameAs: sameAs.map(toAbsoluteUrl).filter(Boolean) } : {}),
});

export const buildService = ({
  name,
  description,
  url,
  providerName = 'Half Half Man',
} = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  ...(name ? { name } : {}),
  ...(description ? { description } : {}),
  ...(url ? { url: toAbsoluteUrl(url) } : {}),
  provider: {
    '@type': 'Organization',
    name: providerName,
    url: BASE_URL,
  },
});

export const buildBlogPosting = ({
  headline,
  description,
  imageUrl,
  datePublished,
  authorName = 'Half Half Man',
  url,
  publisherName = 'Half Half Man',
  publisherLogoUrl,
} = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  ...(headline ? { headline } : {}),
  ...(description ? { description } : {}),
  ...(imageUrl ? { image: toAbsoluteUrl(imageUrl) } : {}),
  ...(datePublished ? { datePublished } : {}),
  ...(url ? { mainEntityOfPage: { '@type': 'WebPage', '@id': toAbsoluteUrl(url) } } : {}),
  author: {
    '@type': 'Person',
    name: authorName,
  },
  publisher: {
    '@type': 'Organization',
    name: publisherName,
    ...(publisherLogoUrl
      ? { logo: { '@type': 'ImageObject', url: toAbsoluteUrl(publisherLogoUrl) } }
      : {}),
  },
});

export const buildCreativeWork = ({
  name,
  description,
  imageUrl,
  url,
  authorName = 'Half Half Man',
} = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  ...(name ? { name } : {}),
  ...(description ? { description } : {}),
  ...(imageUrl ? { image: toAbsoluteUrl(imageUrl) } : {}),
  ...(url ? { url: toAbsoluteUrl(url) } : {}),
  author: {
    '@type': 'Person',
    name: authorName,
  },
});

