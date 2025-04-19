import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const PrivacyPolicy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const policySections = [
    {
      title: "Introduction",
      content: "This Privacy Policy outlines how I collect, use, and protect your personal information when you use my services or visit my portfolio website. I am committed to ensuring your privacy and protecting any information you share with me."
    },
    {
      title: "Information Collection",
      content: "I collect information that you voluntarily provide through contact forms, project inquiries, and communication channels. This may include: name, email address, company name, project requirements, and any other information you choose to share. I also automatically collect standard web analytics data to improve user experience."
    },
    {
      title: "Use of Information",
      content: "The information collected is used to: respond to your inquiries, provide requested services, improve website functionality, send project updates and relevant communications, and maintain the security of my services. I never sell or share your personal information with third parties for marketing purposes."
    },
    {
      title: "Data Security",
      content: "I implement industry-standard security measures to protect your information, including: secure SSL/TLS encryption, regular security audits, secure data storage, and strict access controls. I regularly review and update these security practices to maintain data protection."
    },
    {
      title: "Cookies and Analytics",
      content: "My website uses cookies and similar technologies to enhance your browsing experience. These tools help analyze website traffic and understand how visitors use the site. You can control cookie preferences through your browser settings."
    },
    {
      title: "Third-Party Services",
      content: "I may use third-party services for: website analytics (Google Analytics), communication (email services), and project management tools. These services have their own privacy policies and security measures. I carefully select providers that maintain high security standards."
    },
    {
      title: "Your Rights",
      content: "You have the right to: access your personal information, request corrections, withdraw consent for data processing, and request data deletion. Contact me directly to exercise these rights or discuss any privacy concerns."
    },
    {
      title: "Updates to Privacy Policy",
      content: "This privacy policy may be updated periodically to reflect changes in practices or regulations. Significant changes will be communicated through the website or direct notification when possible."
    },
    {
      title: "Contact Information",
      content: "If you have questions about this privacy policy or how I handle your data, please contact me through the contact form on this website or directly via email."
    }
  ];

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Half Half Man - Data Protection & Security</title>
        <meta name="description" content="Learn about how we protect your data and maintain privacy. Our comprehensive privacy policy outlines our commitment to security and transparency." />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-4xl mx-auto px-4 pt-48 pb-12">
          <motion.h1 
            className="text-4xl font-['Poppins'] font-bold text-center text-primary mb-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            className="text-center text-gray-600 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </motion.p>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {policySections.map((section, index) => (
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
                className="bg-white shadow-lg rounded-2xl overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleSection(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center bg-white hover:bg-tertiary/5 transition-colors focus:outline-none"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{ borderBottom: 'none', outline: 'none' }}
                >
                  <span className="text-lg font-semibold text-primary">{section.title}</span>
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
                      >
                        <div className="p-6">
                          <p className="text-[17px] font-['Poppins'] text-primary/80 leading-relaxed">{section.content}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-sm">
              This privacy policy is provided as a transparent overview of my data practices.
              <br />
              For any questions or concerns, please use the contact form.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
