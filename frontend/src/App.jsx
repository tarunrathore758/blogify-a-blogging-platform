import { Routes, Route } from 'react-router-dom';
import './App.css';

// Auth & Pages
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';

// Blog
import BlogDetail from './components/BlogDetail';

function App() {
  return (
    <Routes>
      {/* Layout ke andar wali routes */}
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Full Blog Page */}
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Route>

      {/* Dashboard alag */}
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
