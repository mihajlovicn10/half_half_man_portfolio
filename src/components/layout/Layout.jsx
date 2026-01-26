import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useSEO } from '../../hooks/useSEO';
import CookieBanner from '../common/CookieBanner';

const Layout = ({ children }) => {
  // Initialize SEO with default meta tags
  useSEO({
    title: 'Half Half Man | Web Development & Security',
    description: 'Synthesis of Code and Water – Freelance development, cybersecurity, and digital craft.',
    keywords: 'Half Half Man, freelance programmer, developer, web development, cybersecurity, React developer, security consultant, freelance developer, programmer, blog, coding, software development',
    image: 'https://half-half-man.com/images/og-image.jpg',
    type: 'website'
  });

  return (
    <>
      <Helmet>
        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval'
            https://www.google.com
            https://www.gstatic.com
            https://assets.calendly.com
            https://calendly.com
            https://*.calendly.com
            https://calendly-assets.s3.amazonaws.com
            https://www.googletagmanager.com
            https://www.google-analytics.com
            https://pagead2.googlesyndication.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://www.googletagservices.com;
          script-src-elem 'self' 'unsafe-inline' 'unsafe-eval'
            https://www.google.com
            https://www.gstatic.com
            https://assets.calendly.com
            https://calendly.com
            https://*.calendly.com
            https://calendly-assets.s3.amazonaws.com
            https://ep2.adtrafficquality.google
            https://www.googletagmanager.com
            https://www.google-analytics.com
            https://pagead2.googlesyndication.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://www.googletagservices.com
            https://fundingchoicesmessages.google.com;
          style-src 'self' 'unsafe-inline'
            https://assets.calendly.com
            https://calendly.com
            https://*.calendly.com
            https://calendly-assets.s3.amazonaws.com
            https://fonts.googleapis.com;
          style-src-elem 'self' 'unsafe-inline'
            https://assets.calendly.com
            https://calendly.com
            https://*.calendly.com
            https://calendly-assets.s3.amazonaws.com
            https://fonts.googleapis.com;
          img-src 'self' data: https:
            https://www.google-analytics.com
            https://www.googletagmanager.com
            https://*.sanity.io
            https://cdn.sanity.io
            https://api.sanity.io
            https://assets.calendly.com
            https://calendly.com
            https://*.calendly.com
            https://calendly-assets.s3.amazonaws.com
            https://pagead2.googlesyndication.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://www.googletagservices.com;
          font-src 'self' data: https://fonts.gstatic.com;
          connect-src 'self'
            https://formspree.io
            https://calendly.com
            https://*.calendly.com
            https://assets.calendly.com
            https://calendly-assets.s3.amazonaws.com
            https://api.calendly.com
            https://www.google.com
            https://www.googleapis.com
            https://www.googletagmanager.com
            https://www.google-analytics.com
            https://region1.google-analytics.com
            https://ep1.adtrafficquality.google
            https://fundingchoicesmessages.google.com
            https://*.sanity.io
            https://api.sanity.io
            https://cdn.sanity.io
            https://pagead2.googlesyndication.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://www.googletagservices.com;
          frame-src
            https://calendly.com
            https://*.calendly.com
            https://assets.calendly.com
            https://calendly-assets.s3.amazonaws.com
            https://www.google.com
            https://pagead2.googlesyndication.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://www.googletagservices.com;
          object-src 'none';
          base-uri 'self';
          form-action 'self' https://formspree.io;
        " />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
        
        {/* Additional Security Headers */}
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Google Tag Manager is loaded after consent (see CookieBanner). */}
        
        {/* SEO Meta Tags - These will be dynamically updated by useSEO hook */}
        {/* Canonical and alternate URLs are handled by useSEO hook per page */}
      </Helmet>
      
      {/* Google Tag Manager (noscript) is intentionally omitted until consent. */}
      
      <div 
        className="flex flex-col min-h-screen w-full"
        role="application"
        aria-label="Main application"
        style={{ margin: 0, padding: 0 }}
      >
        <Navbar />
        <main 
          className="flex-1 w-full"
          role="main"
          style={{ margin: 0, padding: 0 }}
        >
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
};

export default Layout; 