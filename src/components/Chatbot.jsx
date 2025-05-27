import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import avatarImage from '../assets/logo/logo_cropped.png';

const INTENTIONS = [
  {
    key: 'about',
    label: 'chatbot.options.about',
    flow: [
      'chatbot.flow.about.0',
      'chatbot.flow.about.1',
      'chatbot.flow.about.2',
      'chatbot.flow.about.3'
    ],
    onComplete: (navigate, setScreen) => {
      navigate('/');
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        setScreen('main');
      }, 100);
    }
  },
  {
    key: 'services',
    label: 'chatbot.options.services',
    flow: [
      'chatbot.flow.services.0',
      'chatbot.flow.services.1',
      'chatbot.flow.services.2',
      'chatbot.flow.services.3'
    ],
    onComplete: (navigate, setScreen) => {
      navigate('/');
      setTimeout(() => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        setScreen('main');
      }, 100);
    }
  },
  {
    key: 'blog',
    label: 'chatbot.options.blog',
    flow: [
      'chatbot.flow.blog.0',
      'chatbot.flow.blog.1',
      'chatbot.flow.blog.2',
      'chatbot.flow.blog.3'
    ],
    onComplete: (navigate, setScreen) => {
      navigate('/blog');
      setTimeout(() => {
        setScreen('main');
      }, 100);
    }
  },
  {
    key: 'projects',
    label: 'chatbot.options.projects',
    flow: [
      'chatbot.flow.projects.0',
      'chatbot.flow.projects.1',
      'chatbot.flow.projects.2'
    ],
    onComplete: (navigate, setScreen) => {
      navigate('/projects');
      setTimeout(() => {
        setScreen('main');
      }, 100);
    }
  },
  {
    key: 'contact',
    label: 'chatbot.options.contact',
    flow: [
      'chatbot.flow.contact.0'
    ],
    onComplete: (navigate, setScreen) => {
      navigate('/contact');
      setTimeout(() => {
        setScreen('main');
      }, 100);
    }
  }
];

const Chatbot = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [screen, setScreen] = useState('main'); // 'main' or intention key
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');

  // Show the chatbot button after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect for intention flows
  useEffect(() => {
    if (screen !== 'main') {
      const intention = INTENTIONS.find(i => i.key === screen);
      if (!intention) return;
      const sentenceKey = intention.flow[currentSentence];
      const sentence = t(sentenceKey);
      if (!sentence) return;
      setIsTyping(true);
      let index = 0;
      function typeChar() {
        if (index <= sentence.length) {
          setDisplayedMessage(sentence.substring(0, index));
          index++;
          const baseDelay = 25; // Faster typing
          const randomDelay = Math.random() * 50; // Less random delay
          const punctuationDelay = ['.', ',', '!', '?', ':', ';'].includes(sentence[index - 2]) ? 180 : 0;
          const spaceDelay = sentence[index - 2] === ' ' ? 80 : 0;
          const totalDelay = baseDelay + randomDelay + punctuationDelay + spaceDelay;
          setTimeout(typeChar, totalDelay);
        } else {
          setIsTyping(false);
        }
      }
      setDisplayedMessage('');
      typeChar();
    }
  }, [screen, currentSentence, t]);

  const handleIntentionClick = (key) => {
    setScreen(key);
    setCurrentSentence(0);
  };

  const handleContinue = () => {
    const intention = INTENTIONS.find(i => i.key === screen);
    if (!intention) return;
    if (currentSentence < intention.flow.length - 1) {
      setCurrentSentence(currentSentence + 1);
    } else if (intention.onComplete) {
      intention.onComplete(navigate, setScreen);
      setCurrentSentence(0);
    } else {
      setScreen('main');
      setCurrentSentence(0);
    }
  };

  const handleBack = () => {
    setScreen('main');
    setCurrentSentence(0);
  };

  return (
    <>
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 bg-transparent group"
            style={{ background: 'none' }}
            aria-label={t('chatbot.title')}
          >
            <motion.img 
              src={avatarImage} 
              alt="Virtual Assistant" 
              className="w-24 h-24"
              style={{ background: 'none' }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [1, 0.9, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="fixed z-50 bg-white rounded-t-xl md:rounded-xl shadow-2xl overflow-hidden border border-tertiary/20 font-poppins
              w-full max-w-[98vw] max-w-xs sm:max-w-sm md:max-w-md lg:w-96
              left-0 right-0 mx-auto bottom-0
              md:bottom-8 md:right-8 md:left-auto md:mx-0
              max-h-[90vh] overflow-y-auto"
            style={{ transformOrigin: "right center", perspective: "1000px" }}
          >
            <div className="bg-primary text-tertiary p-4 rounded-t-xl flex justify-between items-center w-full box-border">
              <div className="flex items-center space-x-3">
                <motion.img 
                  src={avatarImage} 
                  alt="Virtual Assistant" 
                  className="w-12 h-12 sm:w-14 sm:h-14"
                  style={{ background: 'none' }}
                  initial={{ scale: 2, y: 100 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                />
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="font-semibold">{t('chatbot.title')}</h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-tertiary hover:text-tertiary/80 transition-colors duration-200"
                aria-label={t('common.close')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="p-2 sm:p-4 bg-gray-50 flex flex-col justify-center items-center w-full">
              {screen === 'main' ? (
                <div className="space-y-4 w-full">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-tertiary/20 w-full mb-4 min-h-[120px] flex items-center justify-center transition-all duration-200">
                    <p className="text-gray-700 text-center text-base min-h-[40px] w-full">{t('chatbot.welcome')}</p>
                  </div>
                  {INTENTIONS.map((intent) => (
                    <button
                      key={intent.key}
                      onClick={() => handleIntentionClick(intent.key)}
                      className="w-full bg-primary/10 text-primary px-4 py-3 rounded-lg text-base font-medium hover:bg-primary/20 transition-colors duration-200 transform hover:scale-105"
                    >
                      {t(intent.label)}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-tertiary/20 w-full mb-4 min-h-[80px] flex items-center justify-center">
                    <p className="text-gray-700 text-center text-base min-h-[40px]">
                      {isTyping ? displayedMessage : t(INTENTIONS.find(i => i.key === screen).flow[currentSentence])}
                    </p>
                  </div>
                  <div className="flex w-full justify-between items-center mt-2">
                    <button
                      onClick={handleBack}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleContinue}
                      className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-200 ml-auto"
                      disabled={isTyping}
                    >
                      {currentSentence === INTENTIONS.find(i => i.key === screen).flow.length - 1 ? 'Finish' : 'Continue'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 