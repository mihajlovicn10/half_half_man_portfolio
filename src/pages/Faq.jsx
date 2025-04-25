import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>{t('faq.meta.title')}</title>
        <meta name="description" content={t('faq.meta.description')} />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-4xl mx-auto px-4 pt-48 pb-12">
          <motion.h1 
            className="text-4xl font-['Poppins'] font-bold text-center text-primary mb-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('faq.title')}
          </motion.h1>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {t('faq.items', { returnObjects: true }).map((item, index) => (
              <motion.div 
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="bg-[#ffffff] shadow-lg rounded-2xl overflow-hidden transition-all duration-300"
              >
                <motion.button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center bg-[#ffffff] transition-all duration-300 focus:outline-none"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{ borderBottom: 'none', outline: 'none' }}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${item.id || index}`}
                  id={`faq-question-${item.id || index}`}
                  aria-label={item.question}
                >
                  <span className="text-lg font-['Poppins'] font-semibold text-primary">{item.question}</span>
                  <motion.div
                    initial={false}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </motion.button>
                
                <AnimatePresence mode="wait">
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.25, ease: "linear" }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.15, ease: "linear" }
                        }
                      }}
                      className="overflow-hidden"
                      style={{ borderTop: 'none' }}
                      id={`faq-answer-${item.id || index}`}
                      role="region"
                      aria-labelledby={`faq-question-${item.id || index}`}
                    >
                      <motion.div 
                        className="px-8 pb-6"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ borderTop: 'none' }}
                      >
                        <div className="p-6" style={{ borderTop: 'none' }}>
                          <p className="text-[17px] font-['Poppins'] text-primary/80 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Faq;
