import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import pythonIcon from '../assets/icons/python.svg';
import javascriptIcon from '../assets/icons/javascript.svg';
import kaliIcon from '../assets/icons/kalilinux.svg';
import reactIcon from '../assets/icons/react.svg';
import djangoIcon from '../assets/icons/django.svg';

const TechStack = () => {
  const [expanded, setExpanded] = useState(null);

  const technologies = [
    {
      name: "Python",
      icon: pythonIcon,
      description: "A versatile programming language known for its simplicity and readability.",
      experience: "Python is my core language — I use it for backend development, scripting, automation, and building cybersecurity tools. Its readability and development speed make it ideal for most projects.",
      bgColor: "bg-[#3776AB]",
      iconColor: "brightness-0 invert"
    },
    {
      name: "JavaScript",
      icon: javascriptIcon,
      description: "The language of the web, enabling dynamic and interactive web applications.",
      experience: "JavaScript powers the interactivity of my frontend applications. It's the glue between logic and user experience in the browser.",
      bgColor: "bg-[#F7DF1E]",
      iconColor: "brightness-0"
    },
    {
      name: "Kali Linux",
      icon: kaliIcon,
      description: "A Debian-based Linux distribution designed for digital forensics and penetration testing.",
      experience: "Kali Linux is my go-to environment for ethical hacking, penetration testing, and network analysis. It's a key tool in my security workflow.",
      bgColor: "bg-[#557C94]",
      iconColor: "brightness-0 invert"
    },
    {
      name: "React",
      icon: reactIcon,
      description: "A JavaScript library for building user interfaces.",
      experience: "React allows me to build fast, modular, and scalable web applications. Paired with Tailwind CSS, it enables clean and highly responsive UI design.",
      bgColor: "bg-[#61DAFB]",
      iconColor: "brightness-0"
    },
    {
      name: "Django",
      icon: djangoIcon,
      description: "A high-level Python web framework that enables rapid development of secure and maintainable websites.",
      experience: "I use Django as my main backend framework — it's secure, fast, and ideal for building RESTful APIs that connect seamlessly with frontend interfaces.",
      bgColor: "bg-[#092E20]",
      iconColor: "brightness-0 invert"
    }
  ];

  const getExpansionClasses = (index) => {
    const totalColumns = window.innerWidth >= 1024 ? 3 : 2;
    const row = Math.floor(index / totalColumns);
    const col = index % totalColumns;
    
    if (totalColumns === 3) {
      // 3 columns layout
      if (row === 0) {
        if (col === 0) return "origin-top-left";
        if (col === 1) return "origin-top";
        return "origin-top-right";
      } else {
        if (col === 0) return "origin-bottom-left";
        if (col === 1) return "origin-bottom";
        return "origin-bottom-right";
      }
    } else {
      // 2 columns layout
      if (row === 0) {
        return col === 0 ? "origin-top-left" : "origin-top-right";
      } else {
        return col === 0 ? "origin-bottom-left" : "origin-bottom-right";
      }
    }
  };

  const toggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Tech Stack | Half Half Man - Web Development & Cybersecurity</title>
        <meta name="description" content="Explore the technology stack I use to build secure, scalable web applications. From Python and JavaScript to React, Django, and Kali Linux for cybersecurity." />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <section className="w-full pb-12">
          <div className="max-w-7xl mx-auto px-4 pt-48">
            <h1 className="text-4xl font-serif font-bold text-center text-primary mb-20">
              My Tech Stack — A collection of technologies I've mastered and use to build robust, secure, and scalable solutions.
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className={`relative ${expanded === index ? 'z-20' : 'z-10'}`}
                >
                  <div 
                    className={`
                      bg-white shadow-xl rounded-2xl aspect-square p-6 
                      transition-all duration-300 hover:shadow-2xl 
                      hover:bg-tertiary/5 border border-primary/10 cursor-pointer
                      flex flex-col items-center justify-center relative
                      ${expanded === index ? 'scale-110' : ''}
                      ${getExpansionClasses(index)}
                    `}
                    onClick={() => toggle(index)}
                  >
                    <div className={`w-20 h-20 flex items-center justify-center rounded-full shadow-md ${tech.bgColor} p-4 mb-4 transition-transform duration-300 hover:scale-110`}>
                      <img 
                        src={tech.icon} 
                        alt={`${tech.name} programming language icon - A key technology in my development stack`}
                        className={`w-full h-full object-contain ${tech.iconColor}`}
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-primary text-center mb-2">{tech.name}</h3>
                    <p className="text-sm text-primary/70 text-center">{tech.description}</p>
                    
                    {expanded === index && (
                      <div className="absolute top-full left-0 right-0 mt-4 bg-white shadow-2xl rounded-2xl p-6 border border-primary/10 z-30">
                        <p className="text-lg text-primary/80 leading-relaxed">
                          "{tech.experience}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TechStack; 