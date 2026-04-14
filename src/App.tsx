import { useState, useEffect } from 'react';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { PopularRoutes } from './sections/PopularRoutes';
import { HowItWorks } from './sections/HowItWorks';
import { Testimonials } from './sections/Testimonials';
import { CTASection } from './sections/CTASection';
import { Footer } from './sections/Footer';
import { BookingResults } from './sections/BookingResults';
import { AuthPage } from './sections/AuthPage';

export type BookingFormData = {
  from: string;
  to: string;
  date: string;
  adults: number;
  tripType: 'one-way' | 'round-trip';
};

function App() {
  const [showResults, setShowResults] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = (data: BookingFormData) => {
    setBookingData(data);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setShowResults(false);
    setBookingData(null);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Header scrolled={scrolled} onAuthClick={() => setShowAuth(true)} />
      
      {showAuth ? (
  <AuthPage onBack={() => setShowAuth(false)} />
) : showResults ? (
  <BookingResults 
    bookingData={bookingData} 
    onBack={handleBackToHome}
  />
) : (
  <main>
    <Hero onBookingSubmit={handleBookingSubmit} />
    <About />
    <PopularRoutes onBookNow={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    <HowItWorks />
    <Testimonials />
    <CTASection />
  </main>
)}
      
      <Footer />
    </div>
  );
}

export default App;
