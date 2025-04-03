import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../assets/videos/hero_video.mp4';
import elenaPhoto from '../assets/images/testimonials/elena.webp';
import thomasPhoto from '../assets/images/testimonials/thomas.webp';
import mariaPhoto from '../assets/images/testimonials/maria.webp';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const heroTexts = [
    "Half-human. Half-machine. Fully dedicated to perfection.",
    "Where technology meets discipline — Code. Swim. Rise.",
    "Building secure and elegant web ecosystems — by code and by heart."
  ];

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
      name: "Elena Papadopoulou",
      company: "CEO @ Helix Digital.",
      feedback: "Working with Half Half Man was a refreshing experience. The quality of code, clarity of communication, and proactive problem-solving exceeded our expectations.",
      photo: elenaPhoto
    },
    {
      name: "Thomas Schneider",
      company: "CTO @ NovaTech Systems",
      feedback: "Exceptional attention to detail and a true professional mindset. He understood our technical needs and delivered far beyond what we asked for.",
      photo: thomasPhoto
    },
    {
      name: "Maria Georgiou",
      company: "Operations Lead @ Bluewave",
      feedback: "Creative, organized, and highly efficient. His dedication is rare and his execution flawless. Would work with him again in a heartbeat.",
      photo: mariaPhoto
    }
  ];

  return (
    <div className="min-h-screen bg-tertiary w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-16">
      <div className="relative w-full h-[600px] overflow-hidden">
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
        
        {/* Custom overlay */}
        <div className="hero-overlay absolute inset-0 bg-black/50 z-[1]"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 
              className={`text-5xl font-bold font-serif mb-4 min-h-[120px] transition-opacity duration-1200 ease-in-out drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {heroTexts[currentTextIndex]}
            </h1>
            <h4 className="text-xl font-sans text-tertiary/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] mb-8">
              Custom web development & cybersecurity — tailored with precision and passion.
            </h4>
            <Link to="/contact">
              <Button 
                variant="primary"
                size="large"
                className="font-sans hover:transform hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Let's Work Together
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="w-full min-h-[200px] bg-gradient-to-br from-[#1e2c3a] via-[#1e2c3a]/95 to-[#1e2c3a]/90 backdrop-blur-md border-t border-b border-tertiary/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 py-4">
         
          {/* Feature 1 */}
          <div className="flex flex-col items-center justify-center p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:bg-tertiary/5 active:bg-tertiary/10 active:transform active:scale-95 touch-manipulation">
            <svg className="h-8 w-8 text-tertiary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <p className="text-tertiary text-center mb-4 font-serif">Curious about my stack?</p>
            <Link to="/tech-stack">
              <Button 
                variant="primary" 
                size="small"
                className="hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Explore Tech Stack
              </Button>
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center justify-center p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:bg-tertiary/5 active:bg-tertiary/10 active:transform active:scale-95 touch-manipulation">
            <svg className="h-8 w-8 text-tertiary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-tertiary text-center mb-4 font-serif">Wondering what others say?</p>
            <Button 
              variant="primary" 
              size="small"
              onClick={() => window.scrollTo({ top: document.getElementById('testimonials')?.offsetTop, behavior: 'smooth' })}
              className="hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Read Testimonials
            </Button>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center justify-center p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:bg-tertiary/5 active:bg-tertiary/10 active:transform active:scale-95 touch-manipulation">
            <svg className="h-8 w-8 text-tertiary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-tertiary text-center mb-4 font-serif">What can Half Half Man do for you?</p>
            <Button 
              variant="primary" 
              size="small"
              onClick={() => window.scrollTo({ top: document.getElementById('services')?.offsetTop, behavior: 'smooth' })}
              className="hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Let's Find Out
            </Button>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center justify-center p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:bg-tertiary/5 active:bg-tertiary/10 active:transform active:scale-95 touch-manipulation">
            <svg className="h-8 w-8 text-tertiary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <p className="text-tertiary text-center mb-4 font-serif">Let's transform your vision into code</p>
            <Link to="/contact">
              <Button 
                variant="primary" 
                size="small"
                className="hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="w-full bg-gradient-to-br from-[#235d74] to-[#1e2c3a] py-20">
        <div className="container mx-auto max-w-5xl flex flex-col items-center justify-center px-4">
          <Card 
            variant="primary"
            padding="large"
            className="backdrop-blur-md bg-white/10 w-full"
          >
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-tertiary mb-6">
                About Half Half Man
              </h2>
              <div className="space-y-6 text-tertiary/90 font-sans">
                <p className="text-lg">
                Technology is often seen as something cold and mechanical — but in the right hands, it becomes a canvas for creativity and a tool for building meaningful solutions. I don't just write code; I shape ideas into experiences. Each line of code I write carries a sense of purpose, strategy, and attention to detail. It's not about chasing trends — it's about crafting systems that stand the test of time.

                </p>
                <p className="text-lg">
                My dual identity — part developer, part swimmer — has shaped the way I approach challenges. In water, there is no room for shortcuts. Every stroke must be calculated, every breath timed, every movement efficient. This mindset translates directly into how I write code: clean, efficient, maintainable, and elegant. Discipline in sport has taught me discipline in logic.

                </p>
                <p className="text-lg">
                Over the years, I've developed a strong sense of balance between design and functionality. A product can't succeed if it's only beautiful or only functional — it must be both. That's why I don't separate aesthetics from logic. I design systems with the end user in mind while building architectures that developers will appreciate.
                </p>
                <p className="text-lg">
                Security isn't an afterthought in my workflow — it's a foundation. As someone who deeply understands the vulnerabilities of modern systems, I integrate cybersecurity into every phase of development. Prevention is more powerful than repair. Whether it's implementing secure authentication flows, protecting APIs, or minimizing surface area for attacks, I make sure that safety and privacy are embedded at the core.
                </p>
                <p className="text-lg">
                Communication is another cornerstone of my work. I believe that great digital products are built on a clear understanding between creator and client. I don't hide behind technical jargon. I explain, I collaborate, and I listen — because the best solutions come from mutual trust and shared vision.
                </p>
                <p className="text-lg">
                Throughout my journey, I've learned that technology is not just about tools — it's about intent. You can build a website, or you can build a story. You can build software, or you can build a relationship between a user and a purpose. My goal has always been the latter. I want to create digital spaces that resonate with people and help them achieve something meaningful.
                </p>
                <p className="text-lg">
                Half Half Man is more than a personal brand. It's a statement — a blend of logic and emotion, discipline and flow, structure and freedom. It reflects not just what I do, but how I live. With every new project, I don't just offer code — I offer presence, intention, and dedication to excellence.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Services Section */}
      <section
        id="services"
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/src/assets/images/services_background.jpg')" }}
      >
        {/* Overlay + Blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-sm z-0"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif mb-4 text-tertiary">What I Can Do for You</h2>
            <p className="text-lg text-tertiary/80 max-w-2xl mx-auto">
              Explore a range of services crafted to elevate your digital presence — secure, scalable, and designed with purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-tertiary/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300 border border-tertiary/10">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2 text-tertiary">Web Development</h3>
              <p className="text-sm text-tertiary/80">
                Custom-built websites that are fast, responsive and tailored to your needs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-tertiary/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300 border border-tertiary/10">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-2 text-tertiary">Cybersecurity</h3>
              <p className="text-sm text-tertiary/80">
                Secure coding, audits, threat mitigation and performance-hardening solutions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-tertiary/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300 border border-tertiary/10">
              <div className="text-4xl mb-4">🛠</div>
              <h3 className="text-xl font-semibold mb-2 text-tertiary">Custom Tools</h3>
              <p className="text-sm text-tertiary/80">
                Internal dashboards and business automation tools, crafted to save time.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-tertiary/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300 border border-tertiary/10">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2 text-tertiary">Maintenance</h3>
              <p className="text-sm text-tertiary/80">
                Regular updates, backups and security patches to keep everything running smoothly.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-tertiary/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300 border border-tertiary/10">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-tertiary">Performance Optimization</h3>
              <p className="text-sm text-tertiary/80">
                Page speed audits, load-time improvements and fine-tuning of UX flow.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-tertiary/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300 border border-tertiary/10">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2 text-tertiary">Tech Consulting</h3>
              <p className="text-sm text-tertiary/80">
                Choosing the right tools, strategy, and architecture from the start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-16 bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center text-primary mb-12">
          Here's what industry professionals say about partnering with Half Half Man — reliable, dedicated, and always a step ahead.
          </h2>
          <div className="space-y-6">
            {testimonials.map((item, index) => (
              <div 
                key={index} 
                className="bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:bg-tertiary/5 border border-primary/10"
                onClick={() => toggle(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <img 
                      src={item.photo} 
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover shadow-md"
                    />
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-2xl font-semibold text-primary">{item.name}</h3>
                        <span className="text-primary/40">•</span>
                        <p className="text-base text-primary/80">{item.company}</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-primary/60 text-3xl font-light">{expanded === index ? '−' : '+'}</span>
                </div>
                {expanded === index && (
                  <div className="mt-6 text-lg text-primary/80 leading-relaxed text-center">
                    "{item.feedback}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 