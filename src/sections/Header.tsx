import { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Car,
  Box,
  Plane
} from 'lucide-react';
import { Button } from "@/components/ui/button";

type HeaderProps = {
  scrolled: boolean;
  onAuthClick: () => void;
};

export function Header({ scrolled, onAuthClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const navItems = [
    { label: 'Home', href: '#' },
    {
      label: 'Services',
      href: '#',
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#b5894e] rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-semibold font-['Fraunces'] ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                SeatShare
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-medium ${
                      scrolled ? 'text-gray-800' : 'text-white'
                    }`}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </a>

                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      <div className="py-2">
                        {item.dropdown.map((subItem) => (
                          <button
                            key={subItem.label}
                            onClick={() =>
                              subItem.comingSoon
                                ? setShowComingSoon(true)
                                : null
                            }
                            className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-[#faf7f2] hover:text-[#b5894e] transition"
                          >
                            <div className="flex items-center gap-3">
                              <subItem.icon className="w-5 h-5" />
                              {subItem.label}
                            </div>
                            
                            {subItem.comingSoon && (
                              <span className="text-[7px] font-bold uppercase bg-red-500 text-white px-2 py-1 rounded-full animate-pulse shadow-md">
                                Soon
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button onClick={onAuthClick}>Sign In</Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* COMING SOON MODAL */}
      {showComingSoon && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-[#0B0F14] rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full border border-white/10">
            <img
              src="/oops.png"
              alt="Coming Soon"
              className="w-full h-auto object-cover"
            />
            <button
              onClick={() => setShowComingSoon(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}