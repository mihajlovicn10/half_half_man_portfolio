import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { InlineWidget } from 'react-calendly';
import { trackEvent } from '../utils/analytics';
import { track } from '../utils/events';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
// Temporarily commenting out reCAPTCHA for Formspree free plan
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: '',
    budgetRange: '',
    timeline: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const mountedAtRef = useRef(Date.now());
  const hasInteractedRef = useRef(false);
  const startedFlowRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
    projectType: false,
    budgetRange: false,
    timeline: false,
  });
  const [calendlyError, setCalendlyError] = useState(false);
  const [step, setStep] = useState(1);
  const lastSubmitTime = useRef(0);
  const nameInputRef = useRef(null);
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
    // Disable rate limiting in development/localhost to make testing easier
    if (import.meta.env.DEV || window.location.hostname === 'localhost') {
      return true;
    }

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
    // Skip updating rate limit while developing locally
    if (import.meta.env.DEV || window.location.hostname === 'localhost') {
      return;
    }

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

  const validateField = (field, rawValue) => {
    const sanitized = sanitizeInput(rawValue || '', field);

    if (field === 'name') {
      if (!sanitized) return 'Name is required';
      if (!VALIDATION_PATTERNS.name.test(sanitized)) return 'Please enter a valid name';
      return null;
    }

    if (field === 'email') {
      if (!sanitized) return 'Email is required';
      if (!VALIDATION_PATTERNS.email.test(sanitized)) return 'Please enter a valid email address';
      return null;
    }

    if (field === 'subject') {
      if (!sanitized) return 'Subject is required';
      if (!VALIDATION_PATTERNS.subject.test(sanitized)) return 'Please enter a valid subject';
      return null;
    }

    if (field === 'message') {
      if (!sanitized) return 'Message is required';
      if (sanitized.length < 10) return 'Message must be at least 10 characters long';
      return null;
    }

    if (field === 'projectType') {
      if (!sanitized) return 'Please select a project type';
      return null;
    }

    if (field === 'budgetRange') {
      if (!sanitized) return 'Please select a budget range';
      return null;
    }

    if (field === 'timeline') {
      if (!sanitized) return 'Please select a timeline';
      return null;
    }

    return null;
  };

  const validateForm = (currentStep = 3) => {
    const sanitized = {
      name: sanitizeInput(formData.name, 'name'),
      email: sanitizeInput(formData.email, 'email'),
      subject: sanitizeInput(formData.subject, 'subject'),
      message: sanitizeInput(formData.message, 'message'),
      projectType: sanitizeInput(formData.projectType, 'projectType'),
      budgetRange: sanitizeInput(formData.budgetRange, 'budgetRange'),
      timeline: sanitizeInput(formData.timeline, 'timeline'),
    };

    const errors = {};

    const step1Fields = ['name', 'email', 'subject', 'projectType'];
    const step2Fields = ['budgetRange', 'timeline'];
    const step3Fields = ['message'];

    const fieldsToValidate = [];
    if (currentStep >= 1) fieldsToValidate.push(...step1Fields);
    if (currentStep >= 2) fieldsToValidate.push(...step2Fields);
    if (currentStep >= 3) fieldsToValidate.push(...step3Fields);

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, sanitized[field]);
      if (err) errors[field] = err;
    });

    // Update form data with sanitized values
    setFormData((prev) => ({ ...prev, ...sanitized }));
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
      projectType: true,
      budgetRange: true,
      timeline: true,
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    hasInteractedRef.current = true;
    // Sanitize input as user types
    const sanitizedValue = DOMPurify.sanitize(value);
    
    setFormData(prevState => ({
      ...prevState,
      [name]: sanitizedValue
    }));

    // Real-time validation: once a field has been interacted with, validate as the user types.
    const shouldValidateLive = Boolean(touched?.[name]);
    const nextError = shouldValidateLive ? validateField(name, sanitizedValue) : null;

    setValidationErrors((prev) => {
      const next = { ...prev };

      // If we haven't "touched" the field yet, be forgiving and clear existing errors while typing.
      if (!shouldValidateLive && next[name]) {
        delete next[name];
        return next;
      }

      if (shouldValidateLive) {
        if (nextError) next[name] = nextError;
        else delete next[name];
      }

      return next;
    });

    trackEvent('Contact Form', 'Input', name);
  };

  const handleStartContactFlow = (method) => {
    if (startedFlowRef.current) return;
    startedFlowRef.current = true;
    track('start_contact_flow', { method });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const sanitized = sanitizeInput(value, name);
    setFormData((prev) => ({ ...prev, [name]: sanitized }));

    const err = validateField(name, sanitized);
    setValidationErrors((prev) => {
      const next = { ...prev };
      if (err) next[name] = err;
      else delete next[name];
      return next;
    });
  };

  const handleNextStep = () => {
    const isValid = validateForm(step);
    if (!isValid) {
      setSubmitStatus('validationError');
      return;
    }
    setSubmitStatus(null);
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handlePrevStep = () => {
    setSubmitStatus(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSendAnother = () => {
    setSubmitStatus(null);
    setValidationErrors({});
    setStep(1);
    setTouched({
      name: false,
      email: false,
      subject: false,
      message: false,
      projectType: false,
      budgetRange: false,
      timeline: false,
    });
    requestAnimationFrame(() => nameInputRef.current?.focus?.());
  };

  // Generate a unique submission ID
  const generateSubmissionId = () => {
    return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Add security headers
  const getSecurityHeaders = () => {
    return {
      // Keep headers minimal so Formspree CORS preflight passes
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot (bots will often fill hidden fields)
    if (honeypot && honeypot.trim().length > 0) {
      setSubmitStatus('blocked');
      trackEvent('Contact Form', 'Blocked', 'Honeypot');
      return;
    }

    // Simple behavior-based checks
    const elapsedMs = Date.now() - mountedAtRef.current;
    if (!hasInteractedRef.current || elapsedMs < 3500) {
      setSubmitStatus('blocked');
      trackEvent('Contact Form', 'Blocked', `Behavior (${elapsedMs}ms)`);
      return;
    }
    
    // Check rate limiting
    if (!isSubmissionAllowed()) {
      const timeLeft = Math.ceil((rateLimitState.nextAllowedTime - Date.now()) / 1000);
      setSubmitStatus('rateLimit');
      trackEvent('Contact Form', 'Rate Limit', `Time left: ${timeLeft}s`);
      return;
    }

    // Validate form (all steps)
    if (!validateForm(3)) {
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
          _honeypot: honeypot,
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
        setFormData({ 
          name: '', 
          email: '', 
          subject: '', 
          message: '',
          projectType: '',
          budgetRange: '',
          timeline: '',
        });
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
              id="schedule"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-2xl font-semibold text-primary mb-4"
              >
                {t('contact.calendly.title')}
              </motion.h2>

              <div className="mb-4 rounded-xl border border-primary/10 bg-primary/5 p-4">
                <p className="text-sm font-semibold text-primary mb-2">
                  {t('contact.calendly.beforeYouBook', { defaultValue: 'Before you book:' })}
                </p>
                <ul className="text-sm text-primary/80 space-y-1 list-disc pl-5">
                  <li>
                    <span className="font-medium text-primary">
                      {t('contact.calendly.bullets.whatHappensLabel', { defaultValue: 'What happens on the call:' })}
                    </span>{' '}
                    {t('contact.calendly.bullets.whatHappens', { defaultValue: 'quick intro, your goals, scope, and next steps.' })}
                  </li>
                  <li>
                    <span className="font-medium text-primary">
                      {t('contact.calendly.bullets.whoForLabel', { defaultValue: 'Who it’s for / not for:' })}
                    </span>{' '}
                    {t('contact.calendly.bullets.whoFor', { defaultValue: 'new builds, audits, or improvements — not urgent “fix in 5 minutes” requests.' })}
                  </li>
                </ul>
              </div>

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
                      onClick={() => {
                        handleStartContactFlow('calendly');
                        trackEvent('Contact', 'Calendly Direct Link', 'Contact Page');
                      }}
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
              {submitStatus === 'success' ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                  <h3 className="text-lg font-semibold text-green-900">
                    {t('contact.form.success')}
                  </h3>
                  <p className="mt-2 text-green-900/80">
                    {t('contact.form.nextSteps', { defaultValue: 'Next steps:' })}
                  </p>
                  <ul className="mt-3 space-y-2 text-green-900/80">
                    <li>
                      <span className="font-medium text-green-900">
                        {t('contact.form.nextStepsScheduleLabel', { defaultValue: 'Schedule:' })}
                      </span>{' '}
                      {t('contact.form.nextStepsSchedule', { defaultValue: 'book a 30‑min call if you want to move faster.' })}
                    </li>
                    <li>
                      <span className="font-medium text-green-900">
                        {t('contact.form.nextStepsEmailLabel', { defaultValue: 'Email:' })}
                      </span>{' '}
                      {t('contact.form.nextStepsEmail', { defaultValue: 'I’ll reply to the address you provided.' })}
                    </li>
                    <li>
                      <span className="font-medium text-green-900">
                        {t('contact.form.nextStepsFaqLabel', { defaultValue: 'FAQ:' })}
                      </span>{' '}
                      {t('contact.form.nextStepsFaq', { defaultValue: 'check common questions while you wait.' })}
                    </li>
                  </ul>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href="#schedule"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                      onClick={() => trackEvent('Contact Form', 'Next Steps', 'Schedule')}
                    >
                      {t('contact.form.scheduleButton', { defaultValue: 'Schedule a Call' })}
                    </a>
                    <Link
                      to="/faq"
                      className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
                      onClick={() => trackEvent('Contact Form', 'Next Steps', 'FAQ')}
                    >
                      {t('contact.form.faqButton', { defaultValue: 'Read FAQ' })}
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-green-300 bg-white px-5 py-2.5 text-sm font-semibold text-green-900 hover:bg-green-100/40 transition-colors"
                      onClick={handleSendAnother}
                    >
                      {t('contact.form.sendAnother', { defaultValue: 'Send Another Message' })}
                    </button>
                  </div>
                </div>
              ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                noValidate
                aria-live="polite"
              >
                {/* Honeypot field (hidden from users, visible to basic bots) */}
                <div
                  style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                  aria-hidden="true"
                >
                  <label htmlFor="company">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {step === 1 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.form.name.label')}
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => handleStartContactFlow('form')}
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
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
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
                      <p className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.form.projectType.label', { defaultValue: 'What do you need help with?' })}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { value: 'new_website', label: 'New website' },
                          { value: 'redesign', label: 'Website redesign' },
                          { value: 'security_review', label: 'Security review' },
                          { value: 'course_mentoring', label: 'Course / mentoring' },
                          { value: 'other', label: 'Something else' },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              formData.projectType === opt.value
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-primary border-gray-300 hover:bg-primary/5'
                            }`}
                          >
                            <input
                              type="radio"
                              name="projectType"
                              value={opt.value}
                              className="sr-only"
                              checked={formData.projectType === opt.value}
                              onChange={handleChange}
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                      {validationErrors.projectType && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                          {validationErrors.projectType}
                        </p>
                      )}
                    </motion.div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <p className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.form.budget.label', { defaultValue: 'Budget range (roughly)' })}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { value: '<1000', label: '< 1.000€' },
                          { value: '1000-3000', label: '1.000–3.000€' },
                          { value: '3000-7000', label: '3.000–7.000€' },
                          { value: '7000+', label: '7.000€+' },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              formData.budgetRange === opt.value
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-primary border-gray-300 hover:bg-primary/5'
                            }`}
                          >
                            <input
                              type="radio"
                              name="budgetRange"
                              value={opt.value}
                              className="sr-only"
                              checked={formData.budgetRange === opt.value}
                              onChange={handleChange}
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                      {validationErrors.budgetRange && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                          {validationErrors.budgetRange}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                    >
                      <p className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.form.timeline.label', { defaultValue: 'When would you like to start?' })}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { value: 'asap', label: 'ASAP (1–4 weeks)' },
                          { value: 'quarter', label: 'This quarter (1–3 months)' },
                          { value: 'flexible', label: 'Flexible (3+ months)' },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              formData.timeline === opt.value
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-primary border-gray-300 hover:bg-primary/5'
                            }`}
                          >
                            <input
                              type="radio"
                              name="timeline"
                              value={opt.value}
                              className="sr-only"
                              checked={formData.timeline === opt.value}
                              onChange={handleChange}
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                      {validationErrors.timeline && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                          {validationErrors.timeline}
                        </p>
                      )}
                    </motion.div>

                    <p className="text-xs text-gray-500 mt-2">
                      {t('contact.form.step2Hint', { defaultValue: 'Rough numbers are fine – this just helps set expectations.' })}
                    </p>
                  </>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.message.label')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    <p className="text-xs text-gray-500 mt-2">
                      {t('contact.form.step3Hint', { defaultValue: 'Share a bit of context: current state, goals, and what would make this a win.' })}
                    </p>
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {submitStatus && submitStatus !== 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-lg ${
                        submitStatus === 'error' ? 'bg-red-50 text-red-800' :
                        submitStatus === 'rateLimit' ? 'bg-yellow-50 text-yellow-800' :
                        'bg-blue-50 text-blue-800'
                      }`}
                      role="alert"
                      aria-live="assertive"
                    >
                      {submitStatus === 'error' ? t('contact.form.error') :
                       submitStatus === 'rateLimit' ? (t('contact.form.rateLimit') || 'Please wait a bit before trying again.') :
                       submitStatus === 'blocked' ? (t('contact.form.blocked') || 'Submission blocked. Please take a moment and try again.') :
                       (t('contact.form.validationError') || 'Please fix the highlighted fields.')}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex flex-col sm:flex-row justify-between gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-full sm:w-auto px-6 py-3 rounded-full border border-primary/20 text-primary bg-white hover:bg-primary/5 transition-colors"
                    >
                      {t('contact.form.back', { defaultValue: 'Back' })}
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                    >
                      {t('contact.form.next', { defaultValue: 'Next' })}
                    </button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  )}
                </div>
              </motion.form>
              )}
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
    image: 'https://half-half-man.com/images/og-image.jpg',
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
