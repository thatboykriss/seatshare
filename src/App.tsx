import { useState, useEffect } from 'react';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { PopularRoutes } from './sections/PopularRoutes';
import { HowItWorks } from './sections/HowItWorks';
import { Testimonials } from './sections/Testimonials';
import { CTASection } from './sections/CTASection';
import { TransportPartner } from './sections/TransportPartner';
import { Footer } from './sections/Footer';
import { BookingResults } from './sections/BookingResults';
import { AuthPage, SuccessToast } from './sections/AuthPage';

export type BookingFormData = {
  from: string;
  to: string;
  date: string;
  adults: number;
  tripType: 'one-way' | 'round-trip';
};

export type AppScreen =
  | 'home'
  | 'results'
  | 'auth-gate'     // the sign-in/sign-up/guest choice after seat selection
  | 'auth-full';    // the full auth page from header Sign In

function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [pendingSeatData, setPendingSeatData] = useState<{ operator: any; seats: number[] } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; name?: string }>({ show: false });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = (data: BookingFormData) => {
    setBookingData(data);
    setScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when user picks seats and clicks Continue in BookingResults
  const handleSeatContinue = (operator: any, seats: number[]) => {
    setPendingSeatData({ operator, seats });
    if (isLoggedIn) {
      // already logged in → skip auth gate, go straight to summary
      setScreen('results');
    } else {
      setScreen('auth-gate');
    }
  };

  // Called after auth-gate: sign in, sign up, or guest
  const handleAuthGateSuccess = (mode: 'guest' | 'user' | 'signin' | 'signup', name?: string) => {
    if (mode !== 'guest') {
      setIsLoggedIn(true);
      setUserName(name || '');
    }
    setToast({ show: true, name: name || (mode === 'guest' ? 'Guest' : '') });
    setScreen('results'); // BookingResults will show summary step
  };

  // Called from Header Sign In button
  const handleHeaderAuthSuccess = (mode: 'guest' | 'user' | 'signin' | 'signup', name?: string) => {
    if (mode !== 'guest') { setIsLoggedIn(true); setUserName(name || ''); }
    setScreen('home');
    setToast({ show: true, name });
  };

  const isFullscreen = screen === 'auth-gate' || screen === 'auth-full';

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {isFullscreen ? (
        screen === 'auth-gate' ? (
          <AuthPage
            mode="gate"
            onBack={() => setScreen('results')}
            onAuthSuccess={handleAuthGateSuccess}
          />
        ) : (
          <AuthPage
            mode="full"
            onBack={() => setScreen('home')}
            onAuthSuccess={handleHeaderAuthSuccess}
          />
        )
      ) : (
        <>
          <Header
            scrolled={scrolled}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onAuthClick={() => setScreen('auth-full')}
            onLogout={() => { setIsLoggedIn(false); setUserName(''); }}
          />

          {screen === 'results' ? (
            <BookingResults
              bookingData={bookingData}
              pendingSeatData={pendingSeatData}
              isLoggedIn={isLoggedIn}
              onBack={() => { setScreen('home'); setBookingData(null); setPendingSeatData(null); }}
              onSeatContinue={handleSeatContinue}
              onDone={() => { setScreen('home'); setBookingData(null); setPendingSeatData(null); }}
            />
          ) : (
            <main>
              <Hero onBookingSubmit={handleBookingSubmit} />
              <About />
              <PopularRoutes onBookNow={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
              <HowItWorks />
              <Testimonials />
              <TransportPartner />
              <CTASection />
            </main>
          )}
          <Footer />
        </>
      )}

      {toast.show && (
        <SuccessToast name={toast.name} onDone={() => setToast({ show: false })} />
      )}
    </div>
  );
}

export default App;
