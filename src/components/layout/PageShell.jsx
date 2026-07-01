import PropTypes from 'prop-types';

const variants = {
  gradient: 'bg-gradient-to-b from-white to-[#e2f0fa]',
  home: 'bg-tertiary',
};

const PageShell = ({ children, variant = 'gradient', className = '' }) => (
  <div
    className={`min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-20 ${variants[variant]} ${className}`.trim()}
  >
    {children}
  </div>
);

PageShell.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['gradient', 'home']),
  className: PropTypes.string,
};

export default PageShell;
