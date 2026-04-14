import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Info,
} from 'lucide-react';
import type { BookingFormData } from '../App';

interface BookingResultsProps {
  bookingData: BookingFormData | null;
  onBack: () => void;
}

const operators = [
  {
    id: 1,
    company: 'ABC Transport Inc',
    price: 34000,
    seats: 6,
    takenSeats: [2, 5],
    vehicle: 'Sienna / Hiace',
    driver: 'Michael Johnson',
    phone: '+234 812 345 6789',
    owner: 'Mr. Adewale Johnson',
    fleet: ['Sienna', 'Hiace'],
    description: 'Reliable intercity transport for students.',
  },
  {
    id: 2,
    company: 'Express Transports',
    price: 54000,
    seats: 8,
    takenSeats: [1, 3, 6],
    vehicle: 'Hiace Bus',
    driver: 'Sarah Williams',
    phone: '+234 803 456 7890',
    owner: 'Mrs. Funke Daniels',
    fleet: ['Hiace'],
    description: 'Affordable and fast transport.',
  },
];

export function BookingResults({
  bookingData,
  onBack,
}: BookingResultsProps) {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedOperator, setSelectedOperator] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [confirmed, setConfirmed] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const toggleSeat = (seat: number) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const total = selectedOperator
    ? selectedSeats.length * selectedOperator.price
    : 0;

  if (confirmed && selectedOperator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <Check className="mx-auto text-green-500 w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold">Booking Confirmed</h2>
          <p className="mt-2 text-gray-600">
            {selectedSeats.length} seat(s) booked with {selectedOperator.company}
          </p>
          <button onClick={onBack} className="btn-primary mt-6">
            Back Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-3">⚡</div>
          <p className="text-lg font-semibold">
            Finding rides going your way...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <button onClick={onBack} className="flex items-center gap-2 mb-6">
          <ArrowLeft /> Back
        </button>

        {/* STEPPER */}
        <div className="flex gap-4 mb-8">
          {['Select Ride', 'Choose Seats', 'Payment'].map((s, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-full text-sm ${
                step >= i + 1
                  ? 'bg-[#b5894e] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            {operators.map((op: any) => (
              <div
                key={op.id}
                className="bg-white p-6 rounded-3xl shadow flex justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold">{op.company}</h3>
                  <p className="text-gray-500">{op.vehicle}</p>

                  <button
                    onClick={() => setShowMoreInfo(op)}
                    className="text-[#b5894e] text-sm mt-2 flex items-center gap-1"
                  >
                    <Info size={14} /> More Info
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-[#b5894e]">
                    ₦{op.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">per seat</p>

                  <button
                    onClick={() => {
                      setSelectedOperator(op);
                      setStep(2);
                    }}
                    className="btn-primary mt-3"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2 — SEAT MAP */}
        {step === 2 && selectedOperator && (
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-bold mb-6">Select Seats</h3>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {Array.from({ length: selectedOperator.seats }).map((_, i) => {
                const seat = i + 1;
                const taken = selectedOperator.takenSeats.includes(seat);
                const selected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    disabled={taken}
                    onClick={() => toggleSeat(seat)}
                    className={`p-4 rounded-xl border text-sm font-medium ${
                      taken
                        ? 'bg-gray-300 cursor-not-allowed'
                        : selected
                        ? 'bg-[#b5894e] text-white'
                        : 'bg-white'
                    }`}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>

            <button
              disabled={!selectedSeats.length}
              onClick={() => setStep(3)}
              className="btn-primary w-full"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 3 — PAYMENT */}
        {step === 3 && selectedOperator && (
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-bold mb-6">Payment</h3>

            <div className="mb-6">
              {['card', 'bank', 'paystack'].map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`block w-full mb-2 p-3 rounded-xl border ${
                    paymentMethod === m
                      ? 'border-[#b5894e]'
                      : 'border-gray-200'
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mb-6 text-sm">
              <p>Seats: {selectedSeats.length}</p>
              <p>Total: ₦{total.toLocaleString()}</p>
            </div>

            <button
              onClick={() => setConfirmed(true)}
              className="btn-primary w-full"
            >
              Confirm Booking
            </button>
          </div>
        )}

        {/* MODAL */}
        {showMoreInfo && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-white p-8 rounded-3xl max-w-md">
              <h3 className="text-xl font-bold mb-4">
                {showMoreInfo.company}
              </h3>
              <p>{showMoreInfo.description}</p>
              <button
                onClick={() => setShowMoreInfo(null)}
                className="btn-primary mt-4 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}