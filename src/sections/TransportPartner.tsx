import { useEffect, useRef, useState } from 'react';
import {
  Building2, MapPin, Phone, Mail, Users, Car, Upload,
  X, CheckCircle, ChevronRight, User, Briefcase, FileText,
  Camera, ArrowRight
} from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Wider Audience',
    description: 'Reach thousands of daily commuters and intercity travelers across Nigeria.',
  },
  {
    icon: Car,
    title: 'Fill Every Seat',
    description: 'Maximize occupancy on every trip and increase your revenue per route.',
  },
  {
    icon: CheckCircle,
    title: 'Trusted Platform',
    description: 'Join a verified network that builds passenger confidence in your brand.',
  },
];

type FormStep = 'company' | 'contact' | 'upload' | 'done';

export function TransportPartner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<FormStep>('company');
  const sectionRef = useRef<HTMLElement>(null);

  // form state
  const [form, setForm] = useState({
    companyName: '',
    address: '',
    businessType: '',
    fleetSize: '',
    routes: '',
    ownerName: '',
    ownerAge: '',
    occupation: '',
    phone: '',
    email: '',
    logoFile: null as File | null,
    logoPreview: '',
    fleetFile: null as File | null,
    fleetPreview: '',
    idFile: null as File | null,
    idName: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  const update = (key: string, value: string | File | null) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileKey: string,
    previewKey: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    update(fileKey, file);
    const reader = new FileReader();
    reader.onload = (ev) => update(previewKey, ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    update('idFile', file);
    update('idName', file.name);
  };

  const openModal = () => {
    setStep('company');
    setShowModal(true);
  };

  const steps: { id: FormStep; label: string }[] = [
    { id: 'company', label: 'Company' },
    { id: 'contact', label: 'Contact' },
    { id: 'upload', label: 'Documents' },
    { id: 'done', label: 'Done' },
  ];
  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <>
      {/* ─────────────────── SECTION ─────────────────── */}
      <section
        ref={sectionRef}
        id="transport-partners"
        className="py-20 lg:py-32 bg-[#faf7f2] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span
              className={`inline-block uppercase tracking-widest text-xs font-semibold text-[#b5894e] mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Transport Companies
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Grow Your Business{' '}
              <span className="text-[#b5894e]">With SeatShare</span>
            </h2>
            <p
              className={`mt-4 text-lg text-gray-500 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              List your fleet on SeatShare and connect with passengers travelling your
              routes every day. Registration is free — we only earn when you do.
            </p>
          </div>

          {/* Card — mimics the GIGM/PASS card style from the screenshot */}
          <div
            className={`relative rounded-3xl overflow-hidden transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src="/step-1.jpg"
                alt="Transport fleet on the road"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
            </div>

            {/* Content Grid */}
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-8 lg:p-16">
              {/* Left — pitch */}
              <div className="text-white space-y-8">
                <div className="inline-flex items-center gap-2 bg-[#b5894e]/20 border border-[#b5894e]/40 rounded-full px-4 py-1.5">
                  <Building2 className="w-4 h-4 text-[#d4a574]" />
                  <span className="text-sm font-medium text-[#d4a574]">Partner Programme</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-semibold leading-snug">
                  Register Your{' '}
                  <span className="text-[#d4a574]">Transport Company</span>{' '}
                  Today
                </h3>

                <p className="text-gray-300 text-base leading-relaxed max-w-md">
                  Whether you run buses, minivans, or luxury coaches — SeatShare puts
                  your seats in front of the right passengers. Apply in minutes and
                  an onboarding specialist will be in touch.
                </p>

                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-3 bg-[#b5894e] hover:bg-[#9a7340] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#b5894e]/30 hover:-translate-y-0.5 group"
                >
                  Register Your Company
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#d4a574]" />
                  Prefer to call? Reach us on{' '}
                  <a href="tel:+2349000000000" className="text-[#d4a574] hover:underline font-medium">
                    +234 900 000 0000
                  </a>
                </p>
              </div>

              {/* Right — benefits */}
              <div className="flex flex-col justify-center gap-5">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={b.title}
                      className={`flex items-start gap-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                      }`}
                      style={{ transitionDelay: `${400 + i * 120}ms` }}
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#b5894e]/30 border border-[#b5894e]/40 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#d4a574]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{b.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{b.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── MODAL ─────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#b5894e] px-8 py-6 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-white text-xl font-semibold">Partner Registration</h3>
                <p className="text-[#f5e4c8] text-sm mt-0.5">
                  {step !== 'done' ? `Step ${stepIndex + 1} of 3` : 'Application Submitted!'}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Step indicator */}
            {step !== 'done' && (
              <div className="px-8 pt-6 flex items-center gap-2 flex-shrink-0">
                {steps.slice(0, 3).map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2 flex-1 last:flex-none">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                        i < stepIndex
                          ? 'bg-[#b5894e] border-[#b5894e] text-white'
                          : i === stepIndex
                          ? 'bg-white border-[#b5894e] text-[#b5894e]'
                          : 'bg-white border-gray-200 text-gray-400'
                      }`}
                    >
                      {i < stepIndex ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${i === stepIndex ? 'text-[#b5894e]' : 'text-gray-400'}`}>
                      {s.label}
                    </span>
                    {i < 2 && <div className={`flex-1 h-0.5 rounded-full ${i < stepIndex ? 'bg-[#b5894e]' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
            )}

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-8 py-6">

              {/* ── Step 1: Company Info ── */}
              {step === 'company' && (
                <div className="space-y-5">
                  <p className="text-gray-500 text-sm mb-6">Tell us about your transport business.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Company / Business Name *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="e.g. ABC Transport Ltd"
                          value={form.companyName}
                          onChange={(e) => update('companyName', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Business Type *
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          value={form.businessType}
                          onChange={(e) => update('businessType', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all appearance-none bg-white"
                        >
                          <option value="">Select type…</option>
                          <option>Intercity Bus</option>
                          <option>Intrastate Minivan</option>
                          <option>Luxury Coach</option>
                          <option>Shared Taxi</option>
                          <option>Mixed Fleet</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Business Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Street, city, state"
                        value={form.address}
                        onChange={(e) => update('address', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Fleet Size
                      </label>
                      <div className="relative">
                        <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          value={form.fleetSize}
                          onChange={(e) => update('fleetSize', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all appearance-none bg-white"
                        >
                          <option value="">Select range…</option>
                          <option>1 – 5 vehicles</option>
                          <option>6 – 20 vehicles</option>
                          <option>21 – 50 vehicles</option>
                          <option>51+ vehicles</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Main Routes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lagos – Abuja"
                        value={form.routes}
                        onChange={(e) => update('routes', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('contact')}
                    disabled={!form.companyName || !form.businessType || !form.address}
                    className="w-full flex items-center justify-center gap-2 bg-[#b5894e] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:bg-[#9a7340] hover:shadow-lg hover:shadow-[#b5894e]/20 mt-2"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── Step 2: Contact / Owner Info ── */}
              {step === 'contact' && (
                <div className="space-y-5">
                  <p className="text-gray-500 text-sm mb-6">Tell us about the business owner or primary contact.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="First and last name"
                          value={form.ownerName}
                          onChange={(e) => update('ownerName', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Age
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 35"
                        min={18}
                        max={100}
                        value={form.ownerAge}
                        onChange={(e) => update('ownerAge', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Occupation / Role in Business
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="e.g. Owner, Operations Manager"
                        value={form.occupation}
                        onChange={(e) => update('occupation', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setStep('company')}
                      className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep('upload')}
                      disabled={!form.ownerName || !form.phone || !form.email}
                      className="flex-[2] flex items-center justify-center gap-2 bg-[#b5894e] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:bg-[#9a7340]"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 3: Documents / Photos ── */}
              {step === 'upload' && (
                <div className="space-y-6">
                  <p className="text-gray-500 text-sm mb-2">Upload your company logo, a fleet photo, and a valid ID document.</p>

                  {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <label className="cursor-pointer flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-[#b5894e] transition-colors group bg-gray-50/50">
                      {form.logoPreview ? (
                        <img src={form.logoPreview} alt="Logo preview" className="h-20 object-contain rounded-lg" />
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-xl bg-[#b5894e]/10 flex items-center justify-center group-hover:bg-[#b5894e]/20 transition-colors">
                            <Camera className="w-6 h-6 text-[#b5894e]" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-700">Click to upload logo</p>
                            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5 MB</p>
                          </div>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, 'logoFile', 'logoPreview')}
                      />
                    </label>
                  </div>

                  {/* Fleet Photo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fleet / Vehicle Photo
                    </label>
                    <label className="cursor-pointer flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-[#b5894e] transition-colors group bg-gray-50/50">
                      {form.fleetPreview ? (
                        <img src={form.fleetPreview} alt="Fleet preview" className="h-24 object-cover rounded-xl w-full" />
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-xl bg-[#b5894e]/10 flex items-center justify-center group-hover:bg-[#b5894e]/20 transition-colors">
                            <Car className="w-6 h-6 text-[#b5894e]" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-700">Upload a fleet photo</p>
                            <p className="text-xs text-gray-400 mt-0.5">Shows passengers what to expect</p>
                          </div>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, 'fleetFile', 'fleetPreview')}
                      />
                    </label>
                  </div>

                  {/* ID / CAC Document */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CAC Certificate or Valid ID
                    </label>
                    <label className="cursor-pointer flex items-center gap-4 border-2 border-dashed border-gray-200 rounded-2xl p-5 hover:border-[#b5894e] transition-colors bg-gray-50/50">
                      <div className="w-11 h-11 rounded-xl bg-[#b5894e]/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#b5894e]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700">
                          {form.idName || 'Upload CAC or Government ID'}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG up to 10 MB</p>
                      </div>
                      <Upload className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleDocChange} />
                    </label>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setStep('contact')}
                      className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep('done')}
                      className="flex-[2] bg-[#b5894e] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:bg-[#9a7340] hover:shadow-lg hover:shadow-[#b5894e]/20"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              )}

              {/* ── Done ── */}
              {step === 'done' && (
                <div className="flex flex-col items-center text-center py-8 space-y-5">
                  <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-semibold text-gray-900">Application Received!</h4>
                    <p className="text-gray-500 mt-2 max-w-sm">
                      Thanks, <strong>{form.ownerName || 'Partner'}</strong>! Your registration for{' '}
                      <strong>{form.companyName || 'your company'}</strong> is under review.
                    </p>
                  </div>

                  {/* What happens next */}
                  <div className="w-full bg-[#faf7f2] border border-[#e8dbc6] rounded-2xl p-5 text-left space-y-4">
                    <p className="text-sm font-semibold text-gray-700">What happens next:</p>
                    {[
                      { num: '1', text: 'Our team reviews your application within 48 hours.' },
                      { num: '2', text: 'A SeatShare specialist will call you on the number you provided to schedule a brief onboarding interview.' },
                      { num: '3', text: 'Once verified, your routes go live and passengers can start booking your seats.' },
                    ].map((item) => (
                      <div key={item.num} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#b5894e] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {item.num}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 flex items-start gap-3 w-full text-left">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Expect a call from <strong>+234 900 000 0000</strong>. Save this number — it's
                      our official onboarding line.
                    </span>
                  </div>

                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full bg-[#b5894e] text-white font-semibold py-3.5 rounded-xl hover:bg-[#9a7340] transition-all duration-300"
                  >
                    Got it, thanks!
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
