import { useState, useEffect, useRef, type FormEvent } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Loader2 } from 'lucide-react';
import type { BookingFormData } from '../App';

interface HeroProps {
  onBookingSubmit: (data: BookingFormData) => void;
}

const locations = [
  'Lagos',
  'Abuja',
  'Anambra',
  'Warri',
  'PortHarcourt',
  'Delta',
  'Airport',
  'Abuad',
];

type TabItem = {
  id: 'seat' | 'status' | 'parcel' | 'flight';
  label: string;
  soon?: boolean;
};

export function Hero({ onBookingSubmit }: HeroProps) {
  const [activeTab, setActiveTab] =
    useState<'seat' | 'status' | 'parcel' | 'flight'>('seat');

  const [tripType, setTripType] =
    useState<'one-way' | 'round-trip'>('one-way');

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!from || !to) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onBookingSubmit({
      from,
      to,
      date,
      adults,
      tripType,
    });

    setLoading(false);
  };

  const tabs: TabItem[] = [
    { id: 'seat', label: 'Book a seat' },
    { id: 'status', label: 'Booking Status' },
    { id: 'parcel', label: 'Parcel Delivery', soon: true },
    { id: 'flight', label: 'Book a flight', soon: true },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Highway at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              The modern way to{' '}
              <span className="text-[#d4a574]">commute</span> across cities
            </h1>

            <p className="text-lg text-gray-300 max-w-lg">
              SeatShare is a technology-powered company, providing seamless
              mobility services to commuters across the region.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#routes" className="btn-primary flex items-center gap-2">
                Find a Ride
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="glass-card p-6 lg:p-8">

            {/* TABS */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#b5894e] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}

                  {tab.soon && (
                    <span className="absolute -top-2 -right-2 text-[9px] font-bold uppercase bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse shadow-md">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* BOOK A SEAT */}
            {activeTab === 'seat' && (
              <>
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setTripType('one-way')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                      tripType === 'one-way'
                        ? 'bg-[#b5894e] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    One Way
                  </button>

                  <button
                    onClick={() => setTripType('round-trip')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                      tripType === 'round-trip'
                        ? 'bg-[#b5894e] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Round Trip
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* FROM */}
                  <div className="relative" ref={fromRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Travelling From
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowFromDropdown(!showFromDropdown)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 border rounded-lg"
                    >
                      <MapPin className="w-5 h-5 text-[#b5894e]" />
                      {from || 'Departure Terminal'}
                    </button>

                    {showFromDropdown && (
                      <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-xl">
                        {locations.map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => {
                              setFrom(loc);
                              setShowFromDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-[#faf7f2]"
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* TO */}
                  <div className="relative" ref={toRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Travelling To
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowToDropdown(!showToDropdown)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 border rounded-lg"
                    >
                      <MapPin className="w-5 h-5 text-[#b5894e]" />
                      {to || 'Arrival Terminal'}
                    </button>

                    {showToDropdown && (
                      <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-xl">
                        {locations
                          .filter((loc) => loc !== from)
                          .map((loc) => (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => {
                                setTo(loc);
                                setShowToDropdown(false);
                              }}
                              className="block w-full text-left px-4 py-2 hover:bg-[#faf7f2]"
                            >
                              {loc}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* DATE / ADULTS */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Departure Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adults
                      </label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full p-3 border rounded-lg"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!from || !to || loading}
                    className="w-full py-4 rounded-lg font-semibold text-white bg-[#b5894e] hover:bg-[#9a7340]"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Looking for Rides...
                      </span>
                    ) : (
                      'Proceed'
                    )}
                  </button>
                </form>
              </>
            )}

            {/* BOOKING STATUS */}
            {activeTab === 'status' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter Booking Reference"
                  className="w-full p-4 border rounded-lg"
                />
                <button className="w-full py-4 rounded-lg bg-[#b5894e] text-white font-semibold">
                  Track Booking
                </button>
              </div>
            )}

            {/* PARCEL DELIVERY */}
            {activeTab === 'parcel' && (
              <img
                src="/oops.png"
                alt="Parcel Delivery Coming Soon"
                className="w-full h-[420px] object-cover rounded-xl"
              />
            )}

            {/* FLIGHT */}
            {activeTab === 'flight' && (
              <img
                src="/oops.png"
                alt="Flight Booking Coming Soon"
                className="w-full h-[420px] object-cover rounded-xl"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}