// Simple tests for SEO utilities (can be run in browser console)
// These are basic tests to verify URL normalization works correctly

const testUrlNormalization = () => {
  console.log('Testing URL normalization...');
  
  const testCases = [
    { input: '/projects/', expected: '/projects' },
    { input: '/Projects', expected: '/projects' },
    { input: '/blog?lang=en', expected: '/blog' },
    { input: '/contact#section', expected: '/contact' },
    { input: '/', expected: '/' },
    { input: '', expected: '/' },
    { input: '/TECH-STACK/', expected: '/tech-stack' },
  ];
  
  // Import the normalizePath function (this would work in a real test environment)
  // const { normalizePath } = require('../redirects');
  
  testCases.forEach(({ input, expected }) => {
    // This is a placeholder - in a real test environment you'd call normalizePath(input)
    console.log(`Input: "${input}" -> Expected: "${expected}"`);
  });
  
  console.log('URL normalization tests completed');
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testUrlNormalization = testUrlNormalization;
}

export { testUrlNormalization };
