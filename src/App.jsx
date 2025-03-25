import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import TechStack from './pages/TechStack';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          {/* Add more routes here as you create them */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
