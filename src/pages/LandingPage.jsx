import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import Footer from '../components/Footer';

const LandingPage = () => {
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
};

export default LandingPage;
