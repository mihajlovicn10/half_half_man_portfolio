import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo/LOGO.jpg';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/', scroll: 'about' },
    { name: t('nav.services'), path: '/', scroll: 'services' },
    { name: t('nav.techStack'), path: '/tech-stack' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const dropdownItems = [
    { name: t('nav.dropdown.faq'), path: '/faq' },
    { name: t('nav.dropdown.privacy'), path: '/privacy-policy' },
  ];

  const handleNavClick = (item, e) => {
    // Close mobile menu
    setIsMenuOpen(false);
    
    if (item.scroll) {
      e.preventDefault();
      
      // Check if we're already on the homepage
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
      
      if (isHomePage) {
        // If already on homepage, just scroll
        const element = document.getElementById(item.scroll);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If not on homepage, navigate to homepage with section in hash
        window.location.href = `/#${item.scroll}`;
      }
    }
  };

  return (
    <nav 
      className="bg-primary w-full fixed top-0 left-0 z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.15)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center pl-6 hover:opacity-80 transition-opacity duration-200"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Home"
        >
          <img
            className="h-10 w-auto"
            src={logo}
            alt={t('common.logoAlt')}
            loading="lazy"
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center pr-4">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => handleNavClick(item, e)}
                className="text-muted hover:text-tertiary px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-secondary/10 rounded-md relative group"
                aria-current={window.location.pathname === item.path ? 'page' : undefined}
              >
                {item.name}
                <span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-tertiary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  aria-hidden="true"
                ></span>
              </Link>
            ))}
            
            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-muted hover:text-tertiary px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-secondary/10 rounded-md inline-flex items-center"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-controls="more-menu"
              >
                {t('nav.more')}
                <svg
                  className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div 
                  id="more-menu"
                  className="absolute right-0 top-full mt-2 w-48 bg-primary rounded-lg shadow-lg py-2 z-50 border-t border-tertiary/20"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2 text-muted hover:text-tertiary transition-all duration-200 hover:bg-secondary/10 relative group"
                      onClick={() => setIsDropdownOpen(false)}
                      role="menuitem"
                      aria-current={window.location.pathname === item.path ? 'page' : undefined}
                    >
                      {item.name}
                      <span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-tertiary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                        aria-hidden="true"
                      ></span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="ml-2 pl-2 border-l border-tertiary/20">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden pr-4">
          <button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-tertiary hover:bg-secondary/10 transition-colors duration-200 focus:outline-none"
            aria-label={t('nav.toggleMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{t('nav.toggleMenu')}</span>
            {/* Hamburger icon */}
            <svg
              className={`h-6 w-6 transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {/* Close icon */}
            <svg
              className={`absolute h-6 w-6 transition-opacity duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
        role="menu"
        aria-labelledby="mobile-menu-button"
      >
        <div className="bg-primary shadow-lg flex flex-col max-h-screen overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => handleNavClick(item, e)}
              className="text-muted hover:text-tertiary hover:bg-secondary/10 block px-4 py-2 text-base font-medium transition-colors duration-200"
              role="menuitem"
              aria-current={window.location.pathname === item.path ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
          {/* Mobile Dropdown Items */}
          {dropdownItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-muted hover:text-tertiary hover:bg-secondary/10 block px-4 py-2 text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-current={window.location.pathname === item.path ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
          {/* Mobile Language Switcher - visually separated and centered */}
          <div className="w-full flex justify-center items-center border-t border-tertiary/20 mt-2 pt-4 pb-4 bg-primary">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
