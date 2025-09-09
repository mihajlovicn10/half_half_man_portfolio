// Server-Side Rendering utilities for better SEO and crawling

/**
 * Generates static content for pages that need to be indexed
 * This helps with "Crawled - currently not indexed" issues
 */
export const generateStaticContent = (pageType, data = {}) => {
  const baseContent = {
    projects: {
      title: "Web Development Portfolio Projects",
      description: "Explore my diverse portfolio of web development and security projects. From modern React applications to cybersecurity solutions.",
      content: `
        <h1>Web Development Portfolio Projects</h1>
        <p>Explore my diverse portfolio of web development and security projects. From modern React applications to cybersecurity solutions.</p>
        
        <h2>Portfolio Overview</h2>
        <p>Each project showcases different aspects of my technical expertise and problem-solving approach.</p>
        
        <h3>Web Applications</h3>
        <p>Modern, responsive web apps built with React, Next.js, and modern JavaScript frameworks.</p>
        
        <h3>Security Solutions</h3>
        <p>Cybersecurity tools and applications for vulnerability assessment and penetration testing.</p>
        
        <h3>No-Code Platforms</h3>
        <p>Webflow-based solutions and integrations for rapid prototyping and deployment.</p>
        
        <h2>Featured Projects</h2>
        <ul>
          <li><strong>Portfolio Website</strong> - Modern React portfolio with advanced SEO and performance optimization</li>
          <li><strong>WeLearnGreek</strong> - Educational platform for Greek language learning</li>
          <li><strong>SecureAccess</strong> - Security-focused access management system</li>
          <li><strong>BugHunters</strong> - Cybersecurity vulnerability assessment tool</li>
          <li><strong>Webflow Solutions</strong> - No-code web development and integrations</li>
        </ul>
      `
    },
    blog: {
      title: "Developer Blog - Web Development & Cybersecurity Insights",
      description: "Developer blog with insights on web development, React, cybersecurity, and programming. Expert articles from Half Half Man.",
      content: `
        <h1>Developer Blog - Web Development & Cybersecurity Insights</h1>
        <p>Welcome to my developer blog where I share insights on web development, React, cybersecurity, and programming.</p>
        
        <h2>Blog Categories</h2>
        
        <h3>Web Development</h3>
        <p>Learn about modern web development practices, React best practices, and JavaScript frameworks.</p>
        <ul>
          <li>React & Next.js Development</li>
          <li>JavaScript ES6+ Features</li>
          <li>CSS & Tailwind CSS</li>
          <li>API Development & Integration</li>
        </ul>
        
        <h3>Cybersecurity</h3>
        <p>Discover security best practices, vulnerability assessment, and penetration testing techniques.</p>
        <ul>
          <li>Web Application Security</li>
          <li>Penetration Testing</li>
          <li>Security Auditing</li>
          <li>Vulnerability Management</li>
        </ul>
        
        <h3>Programming Tips & Tricks</h3>
        <p>Practical coding advice, debugging techniques, and programming methodologies.</p>
        
        <h2>Recent Articles</h2>
        <p>Stay tuned for upcoming articles covering the latest trends in web development and cybersecurity.</p>
      `
    }
  };

  return baseContent[pageType] || {
    title: "Page Content",
    description: "Content for better SEO indexing",
    content: "<p>This page contains valuable content for search engines.</p>"
  };
};

/**
 * Injects static content into the page for better crawling
 */
export const injectStaticContent = (pageType, data = {}) => {
  const staticContent = generateStaticContent(pageType, data);
  
  // Create a hidden div with static content for crawlers
  const staticDiv = document.createElement('div');
  staticDiv.style.display = 'none';
  staticDiv.setAttribute('data-static-content', pageType);
  staticDiv.innerHTML = staticContent.content;
  
  // Remove existing static content
  const existing = document.querySelector(`[data-static-content="${pageType}"]`);
  if (existing) {
    existing.remove();
  }
  
  // Add new static content
  document.body.appendChild(staticDiv);
  
  return staticContent;
};

/**
 * Ensures pages have enough content for indexing
 */
export const ensureIndexableContent = (pageType, data = {}) => {
  const minContentLength = 500; // Minimum characters for good indexing
  const currentContent = document.body.textContent || '';
  
  if (currentContent.length < minContentLength) {
    console.log(`Page content too short (${currentContent.length} chars), injecting static content`);
    return injectStaticContent(pageType, data);
  }
  
  return null;
};
