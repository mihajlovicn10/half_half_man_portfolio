import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow mt-16">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 