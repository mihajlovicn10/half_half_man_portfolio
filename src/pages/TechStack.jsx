import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const categories = [
  {
    id: 1,
    key: 'code',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    color: 'from-primary/20 to-primary-dark/20',
    slug: 'code-engineering'
  },
  {
    id: 2,
    key: 'nocode',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    color: 'from-primary/20 to-primary-dark/20',
    slug: 'nocode-solutions'
  },
  {
    id: 3,
    key: 'security',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
    color: 'from-primary/20 to-primary-dark/20',
    slug: 'cybersecurity-practices'
  },
  {
    id: 4,
    key: 'optimization',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />,
    color: 'from-primary/20 to-primary-dark/20',
    slug: 'optimization-maintenance'
  }
];

const TechStack = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev) => (prev + 1) % categories.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleSlideChange = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleCategoryClick = (category) => {
    navigate(`/tech-stack/${category.slug}`);
  };

  return (
    <>
      <Helmet>
        <title>{t('techStack.meta.title')}</title>
        <meta name="description" content={t('techStack.meta.description')} />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-7xl mx-auto px-4 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl font-bold text-primary mb-4">
              {t('techStack.title')}
            </h1>
            <p className="text-xl text-primary/70">
              {t('techStack.subtitle')}
            </p>
          </motion.div>

          <div className="relative h-[500px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Card
                  variant="primary"
                  padding="large"
                  className="w-full max-w-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 mx-auto"
                  >
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {categories[currentSlide].icon}
                    </svg>
                  </motion.div>
                  <motion.h2 
                    className="text-3xl font-bold text-primary mb-4 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {t(`techStack.categories.${categories[currentSlide].key}.title`)}
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-primary/70 mb-8 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {t(`techStack.categories.${categories[currentSlide].key}.description`)}
                  </motion.p>
                  <motion.div 
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button
                      variant="primary"
                      size="large"
                      onClick={() => handleCategoryClick(categories[currentSlide])}
                      className="group"
                    >
                      {t('techStack.seeFullStack')}
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div 
            className="flex justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-primary w-8' : 'bg-primary/30 w-3'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TechStack; 