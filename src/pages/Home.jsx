import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import heroVideo from '../assets/videos/hero_video.mp4';
import elenaPhoto from '../assets/images/testimonials/elena.webp';
import thomasPhoto from '../assets/images/testimonials/thomas.webp';
import mariaPhoto from '../assets/images/testimonials/maria.webp';
import giotaPhoto from '../assets/images/testimonials/giota_gatsi.jpeg';
import servicesBackground from '../assets/images/services_background.jpg';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo/LOGO.jpg'; 

const Home = () => {
  const { t } = useTranslation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const heroRef = useRef(null); 
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroTexts = [
    t('hero.title'),
    t('hero.subtitle')
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => 
        prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => 
          prevIndex === heroTexts.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 600); // Half of the transition time
    }, 4000); // Total time for each text

    return () => clearInterval(interval);
  }, []);

  // Handle hash in URL for scrolling to sections
  useEffect(() => {
    // Check if there's a hash in the URL (e.g., /#about or /#services)
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // Remove the # character
      const element = document.getElementById(id);
      
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const toggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const testimonials = [
    {
      key: 'elena',
      photo: elenaPhoto
    },
    {
      key: 'thomas',
      photo: thomasPhoto
    },
    {
      key: 'maria',
      photo: mariaPhoto
    }, 
    {
      key: 'giota',
      photo: giotaPhoto
    }
  ];

  const sliderData = [
    {
      title: t('slider.ideas.title'),
      subtitle: t('slider.ideas.subtitle'),
      buttonText: t('slider.ideas.button'),
      link: "/contact"
    },
    {
      title: t('slider.blog.title'),
      subtitle: t('slider.blog.subtitle'),
      buttonText: t('slider.blog.button'),
      link: "/blog"
    },
    {
      title: t('slider.projects.title'),
      subtitle: t('slider.projects.subtitle'),
      buttonText: t('slider.projects.button'),
      link: "/projects"
    },
    {
      title: t('slider.stack.title'),
      subtitle: t('slider.stack.subtitle'),
      buttonText: t('slider.stack.button'),
      link: "/tech-stack"
    },
    {
      title: t('slider.services.title'),
      subtitle: t('slider.services.subtitle'),
      buttonText: t('slider.services.button'),
      link: "#services"
    }
  ];

  const heroContent = {
    title: "Who's the Half Half Man?",
    subtitle: "A swimmer. A developer. A creator who lives what he builds.",
    buttonText: "Read My Story →",
    link: "#about"
  };

  return (
    <div className="min-h-screen bg-tertiary w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-16">
      <motion.div 
        ref={heroRef}
        style={{ y, opacity }}
        className="relative w-full h-screen overflow-hidden"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Single overlay with matrix effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10 font-mono text-sm"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0
                }}
                animate={{ 
                  y: [null, -window.innerHeight],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              >
                {`<code>${Math.random().toString(36).substring(2, 8)}</code>`}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4 pt-16 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {sliderData.map((slide, index) => (
                index === currentSlideIndex && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <motion.h1 
                      className="text-6xl font-bold font-mono mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                      layout
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      className="text-xl mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <Button 
                        variant="primary" 
                        size="large"
                        onClick={() => window.location.href = slide.link}
                        className="group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {slide.buttonText}
                          <svg 
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-sm mb-2">{t('common.scrollToExplore')}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

     
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        id="about" 
        className="w-full bg-gradient-to-br from-[#235d74] to-[#1e2c3a] py-24"
      >
        <div className="container mx-auto max-w-5xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center mb-16"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={logo}
              alt={t('common.logoAlt')}
              className="w-24 h-24 mb-6 rounded-full shadow-lg ring-2 ring-teal-300/20" 
            />
            <h2 className="text-4xl font-bold text-white mb-4 text-center">
              {t('about.title')}
            </h2>
            <p className="text-xl text-teal-300/80 text-center max-w-2xl">
              {t('about.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                key: 'code',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              },
              {
                key: 'athlete',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              },
              {
                key: 'design',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              },
              {
                key: 'security',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              },
              {
                key: 'communication',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              },
              {
                key: 'brand',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              }
            ].map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="flex flex-col items-center text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 rounded-lg bg-teal-300/10 flex items-center justify-center group-hover:bg-teal-300/20 transition-colors duration-300 mb-4"
                >
                  <svg 
                    className="w-6 h-6 text-teal-300 group-hover:text-teal-200 transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {block.icon}
                  </svg>
                </motion.div>
                <div className="relative">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-semibold text-teal-300 mb-2">
                      {t(`about.blocks.${block.key}.title`)}
                    </h3>
                    <p className="text-white/90">
                      {t(`about.blocks.${block.key}.description`)}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute -inset-4 rounded-xl border border-teal-300/10 pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      
      <section
        id="services"
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${servicesBackground})` }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-sm z-0"></div>

       
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-tertiary">{t('services.title')}</h2>
            <p className="text-lg text-tertiary/80 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                key: 'webDev',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              },
              {
                key: 'security',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              },
              {
                key: 'tools',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              },
              {
                key: 'maintenance',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              },
              {
                key: 'performance',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              },
              {
                key: 'consulting',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                  ease: "easeOut"
                }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:scale-[1.02] transition-all duration-300 ease-in-out border border-white/10 text-center mx-auto"
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {t(`services.${service.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  
      <section id="testimonials" className="w-full py-16 bg-gradient-to-b from-white to-[#e2f0fa] font-['Poppins']">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-primary mb-12"
          >
            {t('testimonials.title')}
          </motion.h2>
          <div className="space-y-6">
            {testimonials.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 transition-all duration-300 hover:bg-[#f1f5f9]/90 border border-[#e2e8f0] cursor-pointer"
                onClick={() => toggle(index)}
                layout
              >
                <motion.div layout className="flex flex-col items-center text-center">
                  <img 
                    src={item.photo} 
                    alt={t(`testimonials.items.${item.key}.name`)}
                    className="w-16 h-16 rounded-full object-cover shadow-md ring-2 ring-primary/20 mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-primary mb-2">
                    {t(`testimonials.items.${item.key}.name`)}
                  </h3>
                  <p className="text-base text-primary/80 italic">
                    {t(`testimonials.items.${item.key}.company`)}
                  </p>
                </motion.div>
                <AnimatePresence>
                  {expanded === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mt-6 relative lg:max-w-3xl mx-auto bg-gradient-to-br from-[#f8fafc]/50 to-white/30 backdrop-blur-sm rounded-xl p-8"
                      >
                        <span className="absolute -left-4 -top-4 text-6xl text-primary/10 font-serif">"</span>
                        <p className="text-[17px] text-primary/80 leading-relaxed relative z-10">
                          {t(`testimonials.items.${item.key}.feedback`)}
                        </p>
                        <span className="absolute -bottom-8 right-0 text-6xl text-primary/10 font-serif">"</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 

