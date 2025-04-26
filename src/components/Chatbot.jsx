import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import avatarImage from '../assets/logo/logo_cropped.png';

const Chatbot = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');

  // Show the chatbot button after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // Typing effect for welcome message
  useEffect(() => {
    if (isOpen && currentStep === 0 && !isTyping) {
      setIsTyping(true);
      const welcomeMessage = t('chatbot.welcome');
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index < welcomeMessage.length) {
          setDisplayedMessage(prev => prev + welcomeMessage[index]);
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }
  }, [isOpen, currentStep, t]);

  const steps = [
    {
      message: t('chatbot.welcome'),
      options: [
        { text: t('chatbot.options.about'), action: 'about' },
        { text: t('chatbot.options.services'), action: 'services' },
        { text: t('chatbot.options.projects'), action: 'projects' }
      ]
    },
    {
      message: t('chatbot.about'),
      options: [
        { text: t('chatbot.options.continue'), action: 'continue' }
      ]
    },
    {
      message: t('chatbot.services'),
      options: [
        { text: t('chatbot.options.continue'), action: 'continue' }
      ]
    },
    {
      message: t('chatbot.projects'),
      options: [
        { text: t('chatbot.options.contact'), action: 'contact' },
        { text: t('chatbot.options.restart'), action: 'restart' }
      ]
    }
  ];

  const handleOptionClick = (action) => {
    if (action === 'restart') {
      setCurrentStep(0);
      setMessages([]);
    } else if (action === 'continue') {
      setCurrentStep(prev => prev + 1);
    } else {
      // Handle navigation based on action
      switch (action) {
        case 'projects':
          navigate('/projects');
          setIsOpen(false);
          break;
        case 'about':
          navigate('/');
          setTimeout(() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          setIsOpen(false);
          break;
        case 'services':
          navigate('/');
          setTimeout(() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          setIsOpen(false);
          break;
        case 'contact':
          navigate('/contact');
          setIsOpen(false);
          break;
        default:
          // If no specific navigation, try scrolling to element
          const element = document.getElementById(action);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
      }
      setCurrentStep(prev => prev + 1);
    }
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

            <div className="p-4 h-96 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {steps.slice(0, currentStep + 1).map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="mb-4"
                  >
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-tertiary/20">
                      <p className="text-gray-700">
                        {index === currentStep && isTyping ? displayedMessage : step.message}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {step.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleOptionClick(option.action)}
                          className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-200 transform hover:scale-105"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 