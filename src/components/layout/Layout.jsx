import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';

const Layout = ({ children }) => {

  return (
    <>
      <Helmet>
        {/* Security Headers */}
        <meta http-equiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval'
            https://www.google.com
            https://www.gstatic.com
            https://assets.calendly.com
            https://calendly.com
            https://*.calendly.com
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
            https://www.googletagmanager.com
            https://www.google-analytics.com
            https://pagead2.googlesyndication.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://www.googletagservices.com;
          style-src 'self' 'unsafe-inline'
            https://assets.calendly.com
            https://calendly.com
            https://*.calendly.com
            https://fonts.googleapis.com;
          style-src-elem 'self' 'unsafe-inline'
            https://assets.calendly.com
            https://calendly.com
            https://*.calendly.com
            https://fonts.googleapis.com;
          img-src 'self' data: https:
            https://www.google-analytics.com
            https://www.googletagmanager.com
            https://*.sanity.io
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
            https://www.google.com
            https://www.googleapis.com
            https://www.googletagmanager.com
            https://www.google-analytics.com
            https://region1.google-analytics.com
            https://*.sanity.io
            https://pagead2.googlesyndication.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://www.googletagservices.com;
          frame-src
            https://calendly.com
            https://*.calendly.com
            https://www.google.com
            https://pagead2.googlesyndication.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://www.googletagservices.com;
        " />
        <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        <meta http-equiv="X-Frame-Options" content="DENY" />
        <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
        
        {/* Additional Security Headers */}
        <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
        <meta http-equiv="X-XSS-Protection" content="1; mode=block" />

        {/* OG Tags */}
        <meta property="og:title" content = "Half-Half Man - The Synthesis of Code and Water" />
        <meta property="og:description" content = "More than just a freelance, less than the corporation. Half-Half Man is a state of mind." />
        <meta property="og:image" content = "https://halfhalfman.com/images/halfhalfman-og-image.png" />
        <meta property="og:url" content = "https://halfhalfman.com" />
        <meta property="og:type" content = "website" />
        <meta property="og:locale" content = "en_US" />
        <meta property="og:site_name" content = "Half-Half Man" />
        <meta property="og:image:width" content = "1200" />
        <meta property="og:image:height" content = "630" />
        <meta property="og:image:alt" content = "Half-Half Man - The Synthesis of Code and Water" />
        <meta property="og:image:type" content = "image/png" />
      </Helmet>
      
      <div 
        className="flex flex-col min-h-screen h-screen w-full"
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
      </div>
    </>
  );
};

export default Layout; 