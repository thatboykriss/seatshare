import { useEffect, useState } from 'react';
import {
  ArrowLeft, Star, Clock, Shield, Users,
  CheckCircle, ChevronRight, MapPin, Calendar, CreditCard,
  Smartphone, Building2, X, Info, Car, AlertCircle
} from 'lucide-react';
import type { BookingFormData } from '../App';

interface BookingResultsProps {
  bookingData: BookingFormData | null;
  pendingSeatData: { operator: any; seats: number[] } | null;
  isLoggedIn: boolean;
  onBack: () => void;
  onSeatContinue: (operator: any, seats: number[]) => void;
  onDone: () => void;
}

const operators = [
  {
    id: 1,
    company: 'ABC Transport',
    tagline: 'Reliable • Comfortable • On Time',
    price: 8500,
    seats: 14,
    takenSeats: [1, 3, 7, 9, 12],
    vehicle: 'Toyota Hiace Bus',
    departure: '07:00 AM',
    arrival: '12:30 PM',
    duration: '5h 30m',
    rating: 4.7,
    reviews: 312,
    amenities: ['AC', 'WiFi', 'Insured'],
    color: '#b5894e',
    logo: '🚌',
  },
  {
    id: 2,
    company: 'GreenLine Express',
    tagline: 'Your Safety, Our Priority',
    price: 11000,
    seats: 7,
    takenSeats: [2, 5],
    vehicle: 'Toyota Sienna (Luxury)',
    departure: '09:00 AM',
    arrival: '14:00 PM',
    duration: '5h 00m',
    rating: 4.9,
    reviews: 189,
    amenities: ['AC', 'WiFi', 'Snacks', 'Insured'],
    color: '#16a34a',
    logo: '🚐',
  },
  {
    id: 3,
    company: 'Swift Riders',
    tagline: 'Fast. Affordable. Safe.',
    price: 6500,
    seats: 18,
    takenSeats: [4, 8, 13, 15, 16, 17],
    vehicle: 'Ford Transit',
    departure: '06:00 AM',
    arrival: '11:45 AM',
    duration: '5h 45m',
    rating: 4.4,
    reviews: 521,
    amenities: ['AC', 'Insured'],
    color: '#2563eb',
    logo: '🚍',
  },
];

// Seat map layout for a 14-seat bus
function SeatMap({ total, taken, selected, onToggle }: {
  total: number; taken: number[]; selected: number[]; onToggle: (s: number) => void;
}) {
  // rows of [left, right] pairs
  const rows: number[][] = [];
  for (let i = 1; i <= total; i += 2) {
    rows.push(i + 1 <= total ? [i, i + 1] : [i]);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Dashboard */}
      <div className="w-full max-w-[260px] h-8 bg-gray-200 rounded-t-3xl mb-2 flex items-center justify-center">
        <span className="text-xs text-gray-500 font-medium">Driver</span>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[260px]">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-2 justify-center">
            {/* left seat */}
            <SeatBtn seat={row[0]} taken={taken} selected={selected} onToggle={onToggle} />
            {/* aisle gap */}
            <div className="w-6" />
            {/* right seat */}
            {row[1] && <SeatBtn seat={row[1]} taken={taken} selected={selected} onToggle={onToggle} />}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-gray-200 border border-gray-300" />Available</div>
        <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-[#b5894e]" />Selected</div>
        <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-gray-400" />Taken</div>
      </div>
    </div>
  );
}

function SeatBtn({ seat, taken, selected, onToggle }: {
  seat: number; taken: number[]; selected: number[]; onToggle: (s: number) => void;
}) {
  const isTaken = taken.includes(seat);
  const isSelected = selected.includes(seat);
  return (
    <button
      disabled={isTaken}
      onClick={() => onToggle(seat)}
      className={`w-11 h-11 rounded-t-2xl rounded-b-md text-xs font-bold border-2 transition-all duration-200 flex items-center justify-center
        ${isTaken ? 'bg-gray-300 border-gray-400 cursor-not-allowed text-gray-500'
          : isSelected ? 'bg-[#b5894e] border-[#9a7340] text-white shadow-md scale-105'
          : 'bg-white border-gray-300 hover:border-[#b5894e] hover:bg-[#faf7f2] text-gray-700'}`}
    >
      {seat}
    </button>
  );
}

// User details form (guest)
function UserDetailsForm({ adults, onSubmit, onBack }: {
  adults: number; onSubmit: (details: any) => void; onBack: () => void;
}) {
  const [details, setDetails] = useState(
    Array.from({ length: adults }, () => ({ name: '', gender: 'Male', email: '', phone: '' }))
  );
  const [kinName, setKinName]   = useState('');
  const [kinPhone, setKinPhone] = useState('');
  const [agreedLuggage, setAgreedLuggage] = useState(false);
  const [agreedTerms, setAgreedTerms]     = useState(false);

  const update = (i: number, key: string, val: string) => {
    const d = [...details]; d[i] = { ...d[i], [key]: val }; setDetails(d);
  };

  const valid =
    details.every(d => d.name && d.phone && d.email) &&
    kinName && kinPhone && agreedLuggage && agreedTerms;

  const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/10 bg-white transition-all";

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">

        {/* Page header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-500 text-sm mt-1">Kindly select your preferred seat for the trip</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {[
            { n: 1, label: 'Choose destination', done: true },
            { n: 2, label: 'Select bus type',    done: true },
            { n: 3, label: 'User details',        done: false, active: true },
            { n: 4, label: 'Booking summary',     done: false },
          ].map((s, idx, arr) => (
            <div key={s.n} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all
                  ${s.done ? 'bg-[#b5894e] border-[#b5894e] text-white' :
                    s.active ? 'bg-white border-[#b5894e] text-[#b5894e]' :
                    'bg-white border-gray-300 text-gray-400'}`}>
                  {s.done ? <CheckCircle className="w-5 h-5" /> : s.n}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${s.done || s.active ? 'text-[#b5894e]' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-1 mb-4 rounded ${s.done ? 'bg-[#b5894e]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Traveller Information</h2>

            {/* ── Passenger blocks ── */}
            {details.map((d, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-sm font-bold text-gray-800 mb-3">
                  Passenger Information
                </h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-700">Adult {i + 1}</span>
                  </div>
                  <div className="p-4 grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5">Name</label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={d.name}
                        onChange={e => update(i, 'name', e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5">Gender</label>
                      <select
                        value={d.gender}
                        onChange={e => update(i, 'gender', e.target.value)}
                        className={inputCls}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* ── Contact Information ── */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={details[0].email}
                    onChange={e => update(0, 'email', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="08000000000"
                    value={details[0].phone}
                    onChange={e => update(0, 'phone', e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* ── Next of Kin ── */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Next of Kin</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={kinName}
                    onChange={e => setKinName(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="08000000000"
                    value={kinPhone}
                    onChange={e => setKinPhone(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* ── Luggage Notice ── */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
              <p className="text-sm font-bold text-amber-800 mb-3">Important Luggage Notice</p>
              <ul className="space-y-2 text-sm text-amber-800 list-disc list-inside">
                <li>Guests are entitled to bring one medium-sized piece of luggage with dimensions 30 × 23 × 18. Guests traveling with more than one piece of luggage or exceeding the specified luggage allowance will be required to either pay for an additional seat to transport their luggage or arrange for its delivery through our logistics partner.</li>
                <li>Failure to adhere to our luggage policy may result in the guest being unable to continue their journey with us.</li>
                <li>We do not encourage the use of traveling bags made from plastic or other fragile materials as they are susceptible to damage.</li>
              </ul>

              <div className="mt-4 space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedLuggage}
                    onChange={e => setAgreedLuggage(e.target.checked)}
                    className="w-4 h-4 accent-[#b5894e] rounded"
                  />
                  <span className="text-sm text-amber-800">I agree to the luggage notice.</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={e => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 accent-[#b5894e] rounded"
                  />
                  <span className="text-sm text-amber-800">
                    I agree to SeatShare's{' '}
                    <span className="underline cursor-pointer font-medium">Terms & Conditions</span>
                    {' '}and{' '}
                    <span className="underline cursor-pointer font-medium">Privacy Policy</span>.
                  </span>
                </label>
              </div>
            </div>

            <button
              disabled={!valid}
              onClick={() => onSubmit({ passengers: details, kin: { name: kinName, phone: kinPhone } })}
              className="w-full py-4 rounded-xl bg-[#b5894e] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-base hover:bg-[#9a7340] transition-all duration-200"
            >
              Continue
            </button>
          </div>
        </div>

        <button onClick={onBack} className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:text-[#b5894e] hover:border-[#b5894e] bg-white transition-all">
          <ArrowLeft className="w-4 h-4" /> Go Back…
        </button>
      </div>
    </div>
  );
}

// Booking Summary
function BookingSummary({ bookingData, operator, seats, onPay, onBack }: any) {
  const total = seats.length * operator.price;
  return (
    <div className="min-h-screen bg-[#faf7f2] pt-24 pb-16">
      <div className="max-w-xl mx-auto px-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-[#b5894e] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          {/* Header strip */}
          <div className="bg-gradient-to-r from-[#b5894e] to-[#9a7340] px-6 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{operator.logo}</span>
              <div>
                <p className="font-bold text-lg">{operator.company}</p>
                <p className="text-sm text-white/80">{operator.vehicle}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-sm"><MapPin className="w-4 h-4" />Route</div>
              <span className="font-semibold text-gray-900">{bookingData.from} → {bookingData.to}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-sm"><Calendar className="w-4 h-4" />Date</div>
              <span className="font-semibold text-gray-900">{bookingData.date}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-sm"><Clock className="w-4 h-4" />Departure</div>
              <span className="font-semibold text-gray-900">{operator.departure}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-sm"><Car className="w-4 h-4" />Seats</div>
              <span className="font-semibold text-gray-900">#{seats.join(', #')}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-sm"><Users className="w-4 h-4" />Passengers</div>
              <span className="font-semibold text-gray-900">{seats.length}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="text-gray-500 text-sm">Price per seat</div>
              <span className="font-semibold text-gray-900">₦{operator.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-[#faf7f2] px-6 py-4 flex items-center justify-between border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-[#b5894e]">₦{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 mb-6">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700">Seats are held for 15 minutes. Complete payment to confirm your booking.</p>
        </div>

        <button onClick={onPay} className="w-full py-4 rounded-2xl bg-[#b5894e] text-white font-semibold text-base hover:bg-[#9a7340] transition-all duration-200 shadow-md">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

// Payment screen
function PaymentScreen({ total, onConfirm, onBack }: { total: number; onConfirm: () => void; onBack: () => void }) {
  const [method, setMethod] = useState<string | null>(null);
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);

  const methods = [
    { id: 'card', label: 'Debit / Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, Verve' },
    { id: 'paystack', label: 'Paystack', icon: Shield, desc: 'Pay securely via Paystack' },
    { id: 'transfer', label: 'Bank Transfer', icon: Building2, desc: 'Direct bank transfer' },
    { id: 'ussd', label: 'USSD', icon: Smartphone, desc: '*737#, *901# and more' },
  ];

  const handlePay = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    onConfirm();
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-24 pb-16">
      <div className="max-w-xl mx-auto px-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-[#b5894e] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment</h2>
        <p className="text-gray-500 mb-6">Select how you'd like to pay</p>

        {/* Amount bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 flex items-center justify-between shadow-sm border border-gray-100">
          <span className="text-gray-600 text-sm">Amount to pay</span>
          <span className="text-2xl font-bold text-[#b5894e]">₦{total.toLocaleString()}</span>
        </div>

        {/* Payment methods */}
        <div className="space-y-3 mb-6">
          {methods.map(m => {
            const Icon = m.icon;
            const active = method === m.id;
            return (
              <button key={m.id} onClick={() => setMethod(m.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 bg-white text-left ${
                  active ? 'border-[#b5894e] shadow-md' : 'border-gray-200 hover:border-[#b5894e]/40'}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? 'bg-[#b5894e]' : 'bg-gray-100'}`}>
                  <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{m.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${active ? 'border-[#b5894e] bg-[#b5894e]' : 'border-gray-300'}`}>
                  {active && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Card fields */}
        {method === 'card' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Card Number</label>
              <input type="text" placeholder="0000 0000 0000 0000" maxLength={19}
                value={cardNum} onChange={e => setCardNum(e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim())}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] bg-gray-50 font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Expiry</label>
                <input type="text" placeholder="MM / YY" maxLength={7}
                  value={expiry} onChange={e => setExpiry(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] bg-gray-50 font-mono" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">CVV</label>
                <input type="password" placeholder="•••" maxLength={3}
                  value={cvv} onChange={e => setCvv(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] bg-gray-50 font-mono" />
              </div>
            </div>
          </div>
        )}

        {method === 'transfer' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Transfer to:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Bank</span><span className="font-medium">Zenith Bank</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Account Name</span><span className="font-medium">SeatShare Ltd</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Account No.</span><span className="font-mono font-bold text-[#b5894e]">0123456789</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-bold">₦{total.toLocaleString()}</span></div>
            </div>
          </div>
        )}

        {method === 'ussd' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Dial one of these codes:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['*737#', '*901#', '*770#', '*966#'].map(code => (
                <div key={code} className="bg-gray-50 rounded-xl p-3 text-center font-mono font-bold text-[#b5894e]">{code}</div>
              ))}
            </div>
          </div>
        )}

        <button disabled={!method || processing} onClick={handlePay}
          className="w-full py-4 rounded-2xl bg-[#b5894e] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-base hover:bg-[#9a7340] transition-all duration-200 shadow-md flex items-center justify-center gap-2">
          {processing ? (
            <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Processing…</>
          ) : `Pay ₦${total.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
}

// Success confirmation
function BookingConfirmed({ operator, seats, bookingData, onDone }: any) {
  const ref = `SS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-4 pt-24">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-green-400 to-green-600 px-6 py-10 text-center text-white">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
            <p className="text-green-100 mt-1 text-sm">Your seats have been reserved</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Booking Reference</p>
              <p className="text-2xl font-mono font-bold text-[#b5894e] tracking-widest">{ref}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Company</span><span className="font-semibold">{operator.company}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Route</span><span className="font-semibold">{bookingData?.from} → {bookingData?.to}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-semibold">{bookingData?.date}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Departure</span><span className="font-semibold">{operator.departure}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Seats</span><span className="font-semibold">#{seats.join(', #')}</span></div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              Screenshot or save your booking reference. A confirmation will be sent to your email.
            </div>

            <button onClick={onDone} className="w-full py-3.5 rounded-2xl bg-[#b5894e] text-white font-semibold hover:bg-[#9a7340] transition-all">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───
export function BookingResults({ bookingData, pendingSeatData, isLoggedIn, onBack, onSeatContinue, onDone }: BookingResultsProps) {
  const [loading, setLoading] = useState(true);
  const [innerStep, setInnerStep] = useState<'list' | 'seats' | 'details' | 'summary' | 'payment' | 'done'>('list');
  const [selectedOperator, setSelectedOperator] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [_passengerDetails, setPassengerDetails] = useState<any[]>([]);
  const [infoModal, setInfoModal] = useState<any>(null);

  useEffect(() => {
    // If we came back after auth-gate with pending seat data
    if (pendingSeatData && !loading) {
      setSelectedOperator(pendingSeatData.operator);
      setSelectedSeats(pendingSeatData.seats);
      setInnerStep('details');
    }
  }, [pendingSeatData, loading]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1800);
  }, []);


  const total = selectedOperator ? selectedSeats.length * selectedOperator.price : 0;

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf7f2] gap-6">
      <div className="flex gap-2">
        {[0,1,2].map(i => (
          <div key={i} className="w-3 h-3 rounded-full bg-[#b5894e] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <p className="text-lg font-semibold text-gray-700">Finding rides going your way…</p>
      <p className="text-sm text-gray-400">{bookingData?.from} → {bookingData?.to} · {bookingData?.date}</p>
    </div>
  );

  // ── Done ──
  if (innerStep === 'done') return (
    <BookingConfirmed operator={selectedOperator} seats={selectedSeats} bookingData={bookingData} onDone={onDone} />
  );

  // ── Payment ──
  if (innerStep === 'payment') return (
    <PaymentScreen total={total} onBack={() => setInnerStep('summary')} onConfirm={() => setInnerStep('done')} />
  );

  // ── Summary ──
  if (innerStep === 'summary') return (
    <BookingSummary bookingData={bookingData} operator={selectedOperator} seats={selectedSeats}
      onBack={() => setInnerStep(isLoggedIn ? 'seats' : 'details')}
      onPay={() => setInnerStep('payment')} />
  );

  // ── Guest details ──
  if (innerStep === 'details') return (
    <UserDetailsForm adults={bookingData?.adults || 1}
      onBack={() => setInnerStep('seats')}
      onSubmit={(details) => { setPassengerDetails(details); setInnerStep('summary'); }} />
  );

  // ── Stepper bar for list + seats ──
  const stepLabels = ['Select Ride', 'Choose Seats'];
  const stepIdx = innerStep === 'list' ? 0 : 1;

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">

        {/* Back */}
        <button onClick={innerStep === 'seats' ? () => setInnerStep('list') : onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#b5894e] transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          {innerStep === 'seats' ? 'Back to rides' : 'Back to search'}
        </button>

        {/* Route pill */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
            <MapPin className="w-4 h-4 text-[#b5894e]" />
            {bookingData?.from}
            <ChevronRight className="w-3 h-3 text-gray-400" />
            {bookingData?.to}
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-500 shadow-sm">
            <Calendar className="w-4 h-4 text-[#b5894e]" />
            {bookingData?.date}
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-500 shadow-sm">
            <Users className="w-4 h-4 text-[#b5894e]" />
            {bookingData?.adults} passenger{(bookingData?.adults || 1) > 1 ? 's' : ''}
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === stepIdx ? 'bg-[#b5894e] text-white shadow-md' :
                i < stepIdx ? 'bg-green-500 text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>
                {i < stepIdx ? <CheckCircle className="w-4 h-4" /> : <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">{i + 1}</span>}
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < stepLabels.length - 1 && <div className="w-8 h-0.5 bg-gray-200 rounded" />}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Ride list ── */}
        {innerStep === 'list' && (
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">{operators.length} rides found</p>
            {operators.map(op => (
              <div key={op.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group">
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                    {/* Logo / company */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 bg-gray-50 border border-gray-100">
                        {op.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold text-gray-900">{op.company}</h3>
                          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-amber-700">{op.rating}</span>
                            <span className="text-xs text-amber-600">({op.reviews})</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{op.vehicle}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{op.tagline}</p>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {op.amenities.map(a => (
                            <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{a}</span>
                          ))}
                          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
                            {op.seats - op.takenSeats.length} seats left
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Time + price */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 sm:text-right sm:flex-shrink-0">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="text-center">
                          <p className="font-bold text-gray-900">{op.departure}</p>
                          <p className="text-xs text-gray-500">{bookingData?.from}</p>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-12 h-0.5 bg-gray-300 rounded" />
                          <span className="text-xs text-gray-400">{op.duration}</span>
                          <div className="w-12 h-0.5 bg-gray-300 rounded" />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-gray-900">{op.arrival}</p>
                          <p className="text-xs text-gray-500">{bookingData?.to}</p>
                        </div>
                      </div>

                      <div className="sm:mt-2">
                        <p className="text-2xl font-bold text-[#b5894e]">₦{op.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">per seat</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <button onClick={() => setInfoModal(op)}
                      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#b5894e] transition-colors">
                      <Info className="w-4 h-4" /> More Info
                    </button>
                    <button
                      onClick={() => { setSelectedOperator(op); setSelectedSeats([]); setInnerStep('seats'); }}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#b5894e] hover:bg-[#9a7340] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm group-hover:shadow-md">
                      Select Ride <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── STEP 2: Seat selection ── */}
        {innerStep === 'seats' && selectedOperator && (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Seat map */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Select Your Seat{(bookingData?.adults || 1) > 1 ? 's' : ''}</h3>
              <p className="text-sm text-gray-500 mb-6">Pick {bookingData?.adults || 1} seat{(bookingData?.adults || 1) > 1 ? 's' : ''} from the available options</p>

              <SeatMap
                total={selectedOperator.seats}
                taken={selectedOperator.takenSeats}
                selected={selectedSeats}
                onToggle={(seat) => {
                  const max = bookingData?.adults || 1;
                  if (selectedSeats.includes(seat)) {
                    setSelectedSeats(selectedSeats.filter(s => s !== seat));
                  } else if (selectedSeats.length < max) {
                    setSelectedSeats([...selectedSeats, seat]);
                  }
                }}
              />
            </div>

            {/* Summary sidebar */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{selectedOperator.logo}</span>
                  <div>
                    <p className="font-bold text-gray-900">{selectedOperator.company}</p>
                    <p className="text-xs text-gray-500">{selectedOperator.vehicle}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between"><span className="text-gray-500">Departure</span><span className="font-medium">{selectedOperator.departure}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Route</span><span className="font-medium">{bookingData?.from} → {bookingData?.to}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Selected seats</span>
                    <span className="font-medium">{selectedSeats.length > 0 ? `#${selectedSeats.join(', #')}` : '—'}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-[#b5894e] text-lg">₦{(selectedSeats.length * selectedOperator.price).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedSeats.length < (bookingData?.adults || 1) && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Please select {(bookingData?.adults || 1) - selectedSeats.length} more seat{(bookingData?.adults || 1) - selectedSeats.length > 1 ? 's' : ''}
                </div>
              )}

              <button
                disabled={selectedSeats.length !== (bookingData?.adults || 1)}
                onClick={() => onSeatContinue(selectedOperator, selectedSeats)}
                className="w-full py-3.5 rounded-2xl bg-[#b5894e] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold hover:bg-[#9a7340] transition-all duration-200 shadow-md flex items-center justify-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* More Info Modal */}
      {infoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setInfoModal(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#b5894e] to-[#9a7340] px-6 py-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{infoModal.logo}</span>
                <div>
                  <h3 className="font-bold text-lg">{infoModal.company}</h3>
                  <p className="text-sm text-white/80">{infoModal.vehicle}</p>
                </div>
              </div>
              <button onClick={() => setInfoModal(null)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-gray-900">{infoModal.rating}</span>
                <span className="text-gray-500 text-sm">({infoModal.reviews} reviews)</span>
              </div>
              <p className="text-gray-600 text-sm">{infoModal.tagline}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-500">Departure</span><span className="font-medium">{infoModal.departure}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-500">Arrival</span><span className="font-medium">{infoModal.arrival}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-500">Duration</span><span className="font-medium">{infoModal.duration}</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-500">Available seats</span><span className="font-medium text-green-600">{infoModal.seats - infoModal.takenSeats.length}</span></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {infoModal.amenities.map((a: string) => (
                  <span key={a} className="bg-[#faf7f2] border border-[#e8dbc6] text-[#b5894e] text-xs px-3 py-1.5 rounded-full font-medium">{a}</span>
                ))}
              </div>
              <button onClick={() => { setSelectedOperator(infoModal); setSelectedSeats([]); setInnerStep('seats'); setInfoModal(null); }}
                className="w-full py-3 rounded-xl bg-[#b5894e] text-white font-semibold hover:bg-[#9a7340] transition-all text-sm">
                Select This Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}