import { motion } from 'framer-motion';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
