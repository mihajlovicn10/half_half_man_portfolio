import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isOpera = userAgent.includes('Opera') || userAgent.includes('OPR');
    const isEdge = userAgent.includes('Edg');
    const isChrome = userAgent.includes('Chrome');
    const isFirefox = userAgent.includes('Firefox');

    if (isOpera || isChrome || isFirefox) {
      document.body.style.zoom = "90%";
    }
  }, []);

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
      </Helmet>
      
      <div 
        className="flex flex-col min-h-screen h-screen"
        role="application"
        aria-label="Main application"
      >
        <Navbar />
        <main 
          className="flex-1"
          role="main"
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout; 