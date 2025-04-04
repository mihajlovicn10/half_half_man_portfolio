import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

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
          <h1 className="text-4xl font-serif font-bold text-center text-primary mb-20">
            Frequently Asked Questions
          </h1>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white shadow-xl rounded-2xl overflow-hidden border border-primary/10"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-tertiary/5 transition-colors"
                >
                  <span className="text-lg font-semibold text-primary">{item.question}</span>
                  <svg
                    className={`w-6 h-6 text-primary transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
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
                </button>
                
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
