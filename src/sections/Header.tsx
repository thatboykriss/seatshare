import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Car, Box, Plane, User, LogOut } from 'lucide-react';

type HeaderProps = {
  scrolled: boolean;
  isLoggedIn: boolean;
  userName: string;
  onAuthClick: () => void;
  onLogout: () => void;
};

export function Header({ scrolled, isLoggedIn, userName, onAuthClick, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Always show with bg — no transparent mode
  const navItems = [
    { label: 'Home', href: '#' },
    {
      label: 'Services', href: '#',
      dropdown: [
        { label: 'Book a Seat', icon: Car, href: '#' },
        { label: 'Parcel Delivery', icon: Box, href: '#', comingSoon: true },
        { label: 'Book a Flight', icon: Plane, href: '#', comingSoon: true },
      ]
    },
    { label: 'Routes', href: '#routes' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const textColor = scrolled ? 'text-gray-800' : 'text-white';
  const hoverColor = scrolled ? 'hover:text-[#b5894e]' : 'hover:text-[#d4a574]';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3' : 'bg-black/30 backdrop-blur-sm py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#b5894e] rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-semibold font-['Fraunces'] ${textColor}`}>SeatShare</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" ref={dropdownRef}>
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.dropdown ? (
                    <button
                      onClick={() => setActiveDropdown(prev => prev === item.label ? null : item.label)}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors ${textColor} ${hoverColor}`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <a href={item.href} className={`text-sm font-medium transition-colors ${textColor} ${hoverColor}`}>{item.label}</a>
                  )}

                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => { if (sub.comingSoon) setShowComingSoon(true); setActiveDropdown(null); }}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-[#faf7f2] hover:text-[#b5894e] transition"
                        >
                          <div className="flex items-center gap-3"><sub.icon className="w-4 h-4" />{sub.label}</div>
                          {sub.comingSoon && <span className="text-[7px] font-bold uppercase bg-red-500 text-white px-2 py-0.5 rounded-full">Soon</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#b5894e]/10 border border-[#b5894e]/30 rounded-xl px-3 py-2">
                    <div className="w-7 h-7 rounded-full bg-[#b5894e] flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${textColor}`}>{userName || 'Account'}</span>
                  </div>
                  <button onClick={onLogout} className={`flex items-center gap-1.5 text-sm ${textColor} ${hoverColor} transition-colors`}>
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="px-5 py-2.5 bg-[#b5894e] hover:bg-[#9a7340] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Burger */}
            <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen
                ? <X className={`w-6 h-6 ${textColor}`} />
                : <Menu className={`w-6 h-6 ${textColor}`} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(prev => prev === item.label + '_m' ? null : item.label + '_m')}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 hover:bg-[#faf7f2] hover:text-[#b5894e] rounded-lg transition-colors"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label + '_m' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.label + '_m' && (
                        <div className="ml-4 pl-3 border-l-2 border-[#b5894e]/20 space-y-1">
                          {item.dropdown.map((sub) => (
                            <button key={sub.label} onClick={() => { if (sub.comingSoon) { setShowComingSoon(true); setMobileMenuOpen(false); } setActiveDropdown(null); }}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-[#faf7f2] rounded-lg transition-colors">
                              <div className="flex items-center gap-3"><sub.icon className="w-4 h-4" />{sub.label}</div>
                              {sub.comingSoon && <span className="text-[7px] font-bold uppercase bg-red-500 text-white px-2 py-0.5 rounded-full">Soon</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex px-4 py-3 text-sm font-medium text-gray-800 hover:bg-[#faf7f2] hover:text-[#b5894e] rounded-lg transition-colors">{item.label}</a>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100">
                {isLoggedIn ? (
                  <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full py-3 px-4 border border-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-50 transition-colors">
                    Sign Out
                  </button>
                ) : (
                  <button onClick={() => { onAuthClick(); setMobileMenuOpen(false); }} className="w-full py-3 px-4 bg-[#b5894e] text-white font-semibold text-sm rounded-lg hover:bg-[#9a7340] transition-colors">
                    Sign In
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {showComingSoon && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-[#0B0F14] rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full border border-white/10">
            <img src="/oops.png" alt="Coming Soon" className="w-full h-auto object-cover" />
            <button onClick={() => setShowComingSoon(false)} className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2">
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
