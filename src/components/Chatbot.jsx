import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import avatarImage from '../assets/logo/logo_cropped.png';

const INTENTIONS = [
  {
    key: 'about',
    label: 'Tell me more about Half Half Man',
    flow: [
      'Half Half Man is a philosophy of balance—between technology and humanity, logic and creativity.',
      'Our mission is to craft digital solutions that not only function flawlessly, but also inspire and connect people.',
      'We believe true innovation emerges when purpose meets passion, and every project is an opportunity to make a meaningful impact.',
      'Vision is not just about seeing the future, but shaping it—one thoughtful line of code at a time.'
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
    label: 'What services does Half Half Man offer?',
    flow: [
      'Half Half Man offers a suite of services designed to empower your digital journey.',
      'From custom web development to robust cybersecurity, every solution is tailored to your unique needs.',
      'Our approach combines technical excellence with a deep understanding of your business goals.',
      'Discover how our services can help you achieve lasting results.'
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
    label: "Can I read some of Half Half Man's thoughts and insights?",
    flow: [
      "Every row that's written has its meaning.",
      "The Blog is where Half Half Man shares thoughts, lessons, and stories from the journey of building and creating.",
      "If you want to understand how Half Half Man thinks, this is the ideal place to start.",
      "Dive in and discover perspectives on technology, creativity, and growth."
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
    label: "Can you show me examples of Half Half Man's work?",
    flow: [
      "Explore a curated selection of projects that showcase technical skill and creative problem-solving.",
      "Each project is built with care, expertise, and a focus on real-world impact.",
      "See how ideas become reality through thoughtful design and robust development."
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
    label: "I'd like to reach out - How can I contact Half Half Man?",
    flow: [
      "Half Half Man is quite eager to talk. If you want to get in touch, you can send a message or schedule a call with Half Half Man!"
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
      const sentence = intention.flow[currentSentence];
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
  }, [screen, currentSentence]);

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
            className="fixed bottom-8 right-8 w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-tertiary/20 font-poppins"
            style={{ transformOrigin: "right center", perspective: "1000px" }}
          >
            <div className="bg-primary text-tertiary p-4 rounded-t-xl flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <motion.img 
                  src={avatarImage} 
                  alt="Virtual Assistant" 
                  className="w-14 h-14"
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

            <div className="p-4 bg-gray-50 flex flex-col justify-center items-center overflow-y-auto" style={{ maxHeight: '70vh', minHeight: '24rem' }}>
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
                      {intent.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-tertiary/20 w-full mb-4 min-h-[80px] flex items-center justify-center">
                    <p className="text-gray-700 text-center text-base min-h-[40px]">
                      {isTyping ? displayedMessage : INTENTIONS.find(i => i.key === screen).flow[currentSentence]}
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