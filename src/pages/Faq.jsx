import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: "What services do you offer?",
      answer: "I provide web development, UI/UX design, and cybersecurity solutions tailored to your business needs."
    },
    {
      question: "Can you work with international clients?",
      answer: "Absolutely. I collaborate remotely with clients from all over the world."
    },
    {
      question: "What is your development process?",
      answer: "My development process follows an agile methodology: 1) Initial consultation and requirements gathering, 2) Design and planning phase, 3) Development with regular updates, 4) Testing and quality assurance, 5) Deployment and maintenance. I maintain clear communication throughout the entire process."
    },
    {
      question: "Do you offer support after the project is completed?",
      answer: "Yes, I offer ongoing support and maintenance services to ensure your website runs smoothly and adapts to your business needs."
    },
    {
      question: "How do you handle project communication?",
      answer: "I maintain regular communication through scheduled video calls, email updates, and project management tools. You'll receive weekly progress reports and have access to a dedicated channel for questions or concerns."
    },
    {
      question: "What technologies do you work with?",
      answer: "I work with modern web technologies including React, Node.js, Python, Django, and various database systems. For cybersecurity, I'm proficient with penetration testing tools, security frameworks, and implementing secure coding practices."
    },
    {
      question: "How do you ensure project security?",
      answer: "Security is built into every stage of development. I implement industry-standard security practices, regular security audits, secure coding standards, and follow OWASP guidelines. All projects include SSL/TLS encryption and secure data handling."
    },
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on complexity and requirements. Small projects typically take 2-4 weeks, while larger projects may take 2-3 months. I provide detailed timelines during the initial consultation and keep you updated on progress throughout."
    },
    {
      question: "What makes you different from other freelancers?",
      answer: "I combine technical expertise with athletic discipline – delivering efficient, focused, and scalable solutions."
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Half Half Man - Common Questions Answered</title>
        <meta name="description" content="Find answers to frequently asked questions about our web development and cybersecurity services, project process, and collaboration methods." />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-4xl mx-auto px-4 pt-48 pb-12">
          <motion.h1 
            className="text-4xl font-['Poppins'] font-bold text-center text-primary mb-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Frequently Asked Questions
          </motion.h1>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {faqItems.map((item, index) => (
              <motion.div 
                key={index}
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
