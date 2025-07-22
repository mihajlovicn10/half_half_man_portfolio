import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { InlineWidget } from 'react-calendly';
import { trackEvent } from '../utils/analytics';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { useSEO } from '../hooks/useSEO';
// Temporarily commenting out reCAPTCHA for Formspree free plan
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [calendlyError, setCalendlyError] = useState(false);
  const lastSubmitTime = useRef(0);
  const { t } = useTranslation();
  // Temporarily commenting out reCAPTCHA for Formspree free plan
  // const { executeRecaptcha } = useGoogleReCaptcha();

  // Enhanced rate limiting configuration
  const RATE_LIMIT_CONFIG = {
    initialDelay: 30000, // 30 seconds
    maxAttempts: 3,
    progressiveDelay: true,
    maxDelay: 300000, // 5 minutes
    resetTime: 3600000 // 1 hour
  };

  const [rateLimitState, setRateLimitState] = useState({
    attempts: 0,
    lastAttempt: 0,
    nextAllowedTime: 0
  });

  // Calculate delay based on number of attempts
  const calculateDelay = (attempts) => {
    if (!RATE_LIMIT_CONFIG.progressiveDelay) {
      return RATE_LIMIT_CONFIG.initialDelay;
    }
    
    // Exponential backoff with a maximum cap
    const delay = Math.min(
      RATE_LIMIT_CONFIG.initialDelay * Math.pow(2, attempts - 1),
      RATE_LIMIT_CONFIG.maxDelay
    );
    
    return delay;
  };

  // Check if form submission is allowed
  const isSubmissionAllowed = () => {
    const now = Date.now();
    
    // Reset attempts if enough time has passed
    if (now - rateLimitState.lastAttempt > RATE_LIMIT_CONFIG.resetTime) {
      setRateLimitState({
        attempts: 0,
        lastAttempt: 0,
        nextAllowedTime: 0
      });
      return true;
    }

    // Check if we've exceeded max attempts
    if (rateLimitState.attempts >= RATE_LIMIT_CONFIG.maxAttempts) {
      return false;
    }

    // Check if enough time has passed since last attempt
    return now >= rateLimitState.nextAllowedTime;
  };

  // Update rate limit state
  const updateRateLimitState = () => {
    const now = Date.now();
    const newAttempts = rateLimitState.attempts + 1;
    const delay = calculateDelay(newAttempts);
    
    setRateLimitState({
      attempts: newAttempts,
      lastAttempt: now,
      nextAllowedTime: now + delay
    });
  };

  // Enhanced validation patterns
  const VALIDATION_PATTERNS = {
    // Only allow letters, spaces, and common special characters in names
    name: /^[\p{L}\s\-'.]{2,100}$/u,
    // RFC 5322 compliant email regex
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    // Reasonable subject line characters
    subject: /^[a-zA-Z0-9\s\-_,.!?()]{2,200}$/
  };

  // Sanitize input before validation
  const sanitizeInput = (value, type) => {
    // Basic XSS protection
    let sanitized = DOMPurify.sanitize(value).trim();
    
    // Remove any HTML tags that might have slipped through
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    
    // Additional type-specific sanitization
    switch(type) {
      case 'name':
        // Remove any characters that aren't letters, spaces, or allowed special chars
        return sanitized.replace(/[^\p{L}\s\-'.]/gu, '').slice(0, 100);

      case 'email':
        // Remove any characters that aren't valid in emails
        return sanitized.replace(/[^\w\-\.\@\+]/g, '').slice(0, 100);
      case 'subject':
        // Allow basic punctuation but remove any potentially dangerous characters
        return sanitized.replace(/[^\w\s\-_,\.!?()]/g, '').slice(0, 200);
      case 'message':
        // Allow more characters but still sanitize
        return sanitized.slice(0, 2000);
      default:
        return sanitized;
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    const sanitizedName = sanitizeInput(formData.name, 'name');
    if (!sanitizedName) {
      errors.name = 'Name is required';
    } else if (!VALIDATION_PATTERNS.name.test(sanitizedName)) {
      errors.name = 'Please enter a valid name';
    }

    // Email validation
    const sanitizedEmail = sanitizeInput(formData.email, 'email');
    if (!sanitizedEmail) {
      errors.email = 'Email is required';
    } else if (!VALIDATION_PATTERNS.email.test(sanitizedEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    // Subject validation
    const sanitizedSubject = sanitizeInput(formData.subject, 'subject');
    if (!sanitizedSubject) {
      errors.subject = 'Subject is required';
    } else if (!VALIDATION_PATTERNS.subject.test(sanitizedSubject)) {
      errors.subject = 'Please enter a valid subject';
    }

    // Message validation
    const sanitizedMessage = sanitizeInput(formData.message, 'message');
    if (!sanitizedMessage) {
      errors.message = 'Message is required';
    } else if (sanitizedMessage.length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    // Update form data with sanitized values
    setFormData({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Sanitize input as user types
    const sanitizedValue = DOMPurify.sanitize(value);
    
    setFormData(prevState => ({
      ...prevState,
      [name]: sanitizedValue
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    trackEvent('Contact Form', 'Input', name);
  };

  // Generate a unique submission ID
  const generateSubmissionId = () => {
    return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Add security headers
  const getSecurityHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Form-Submission-ID': generateSubmissionId(),
      'X-Form-Timestamp': Date.now().toString(),
      'Accept': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check rate limiting
    if (!isSubmissionAllowed()) {
      const timeLeft = Math.ceil((rateLimitState.nextAllowedTime - Date.now()) / 1000);
      setSubmitStatus('rateLimit');
      trackEvent('Contact Form', 'Rate Limit', `Time left: ${timeLeft}s`);
      return;
    }

    // Validate form
    if (!validateForm()) {
      setSubmitStatus('validationError');
      return;
    }

    // Temporarily commenting out reCAPTCHA verification for Formspree free plan
    /*
    // Verify reCAPTCHA
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not loaded');
      setSubmitStatus('error');
      return;
    }

    const token = await executeRecaptcha('contact_form_submit');
    if (!token) {
      setSubmitStatus('error');
      return;
    }
    */

    setIsSubmitting(true);
    trackEvent('Contact Form', 'Submit', 'Attempt');

    try {
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 second timeout
      });

      // Create the fetch promise
      const fetchPromise = fetch('https://formspree.io/f/mrbpanaa', {
        method: 'POST',
        headers: getSecurityHeaders(),
        body: JSON.stringify({
          ...formData,
          _timestamp: Date.now(),
          _userAgent: navigator.userAgent,
          _referrer: document.referrer,
          _submissionId: generateSubmissionId(),
          // Temporarily commenting out reCAPTCHA token for Formspree free plan
          // _recaptchaToken: token
        }),
        credentials: 'same-origin',
        mode: 'cors'
      });

      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      // Check response status
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Verify response
      if (data.ok) {
        setSubmitStatus('success');
        trackEvent('Contact Form', 'Submit', 'Success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset rate limit on successful submission
        setRateLimitState({
          attempts: 0,
          lastAttempt: 0,
          nextAllowedTime: 0
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      trackEvent('Contact Form', 'Submit', 'Error', error.message);
      // Update rate limit state on error
      updateRateLimitState();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add focus trap for modal-like elements
  const formRef = useRef(null);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && submitStatus) {
        setSubmitStatus(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [submitStatus]);

  return (
    <>
      <Helmet>
        <title>{t('contact.meta.title')}</title>
        <meta name="description" content={t('contact.meta.description')} />
        {/* Security-related meta tags */}
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; form-action 'self' https://formspree.io;" />
        <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        <meta http-equiv="X-Frame-Options" content="DENY" />
        <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-7xl mx-auto px-4 pt-48 pb-12">
          <motion.h1 
            className="text-4xl font-['Poppins'] font-bold text-center text-primary mb-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('contact.title')}
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendly Integration */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white shadow-xl rounded-2xl p-6 pb-8 h-auto"
              role="complementary"
              aria-label="Schedule a meeting"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-2xl font-semibold text-primary mb-4"
              >
                {t('contact.calendly.title')}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {!calendlyError ? (
                  <InlineWidget
                    url="https://calendly.com/nikola-mihajlovic1/30min"
                    styles={{
                      height: '650px',
                      width: '100%',
                    }}
                    prefill={{
                      email: '',
                      name: '',
                      firstName: '',
                      lastName: ''
                    }}
                    pageSettings={{
                      backgroundColor: 'ffffff',
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: '2563eb',
                      textColor: '1f2937'
                    }}
                    onLoad={() => setCalendlyError(false)}
                    onError={() => setCalendlyError(true)}
                  />
                ) : (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="text-gray-500 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {t('contact.calendly.error.title') || 'Schedule a Call'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t('contact.calendly.error.description') || 'Unable to load the scheduling widget. Please use the contact form below or schedule directly.'}
                    </p>
                    <a
                      href="https://calendly.com/nikola-mihajlovic1/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                      onClick={() => trackEvent('Contact', 'Calendly Direct Link', 'Contact Page')}
                    >
                      {t('contact.calendly.error.button') || 'Schedule on Calendly'}
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white shadow-xl rounded-2xl p-8"
              role="form"
              aria-label="Contact form"
              ref={formRef}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-2xl font-semibold text-primary mb-6"
              >
                {t('contact.form.title')}
              </motion.h2>
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                noValidate
                aria-live="polite"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.name.label')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    aria-required="true"
                    aria-invalid={!!validationErrors.name}
                    aria-describedby={validationErrors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-2 border ${
                      validationErrors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors`}
                    placeholder={t('contact.form.name.placeholder')}
                    autoComplete="name"
                  />
                  {validationErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                      {validationErrors.name}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.email.label')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    aria-required="true"
                    aria-invalid={!!validationErrors.email}
                    aria-describedby={validationErrors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-2 border ${
                      validationErrors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors`}
                    placeholder={t('contact.form.email.placeholder')}
                    autoComplete="email"
                  />
                  {validationErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {validationErrors.email}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.subject.label')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    aria-required="true"
                    aria-invalid={!!validationErrors.subject}
                    aria-describedby={validationErrors.subject ? "subject-error" : undefined}
                    className={`w-full px-4 py-2 border ${
                      validationErrors.subject ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors`}
                    placeholder={t('contact.form.subject.placeholder')}
                    autoComplete="off"
                  />
                  {validationErrors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
                      {validationErrors.subject}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.message.label')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={2000}
                    rows={6}
                    aria-required="true"
                    aria-invalid={!!validationErrors.message}
                    aria-describedby={validationErrors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-2 border ${
                      validationErrors.message ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors resize-none`}
                    placeholder={t('contact.form.message.placeholder')}
                  />
                  {validationErrors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                      {validationErrors.message}
                    </p>
                  )}
                </motion.div>

                <AnimatePresence mode="wait">
                  {submitStatus && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-lg ${
                        submitStatus === 'success' ? 'bg-green-50 text-green-800' :
                        submitStatus === 'error' ? 'bg-red-50 text-red-800' :
                        submitStatus === 'rateLimit' ? 'bg-yellow-50 text-yellow-800' :
                        'bg-blue-50 text-blue-800'
                      }`}
                      role="alert"
                      aria-live="assertive"
                    >
                      {submitStatus === 'success' ? t('contact.form.success') :
                       submitStatus === 'error' ? t('contact.form.error') :
                       submitStatus === 'rateLimit' ? t('contact.form.rateLimit') :
                       t('contact.form.validationError')}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  aria-busy={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg 
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.form.sending')}
                    </span>
                  ) : t('contact.form.submit')}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

const Contact = () => {
  // SEO meta tags for Contact page
  useSEO({
    title: 'Contact | Half Half Man - Freelance Programmer & Developer',
    description: 'Get in touch with Half Half Man for freelance programming and web development services. Schedule a call or send a message for expert developer consultation.',
    keywords: 'contact Half Half Man, freelance programmer contact, developer consultation, web development services, schedule call, hire developer',
    image: 'https://half-half-man.com/public/images/og-image.jpg',
    type: 'website'
  });

  return (
    // Temporarily commenting out reCAPTCHA provider for Formspree free plan
    /*
    <GoogleReCaptchaProvider
      reCaptchaKey="6LeKLCgrAAAAAPfllPfr1rIeMYSbCtz4LYsQXiDg"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <ContactForm />
    </GoogleReCaptchaProvider>
    */
    <ContactForm />
  );
};

export default Contact;
