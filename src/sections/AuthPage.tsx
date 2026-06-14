import { useState, useEffect, useRef } from 'react';
import {
  Car, UserPlus, LogIn, UserCheck, ArrowLeft,
  Eye, EyeOff, Lock, Mail, User,
  CheckCircle, ChevronRight, Shield, Tag, Gift
} from 'lucide-react';

type AuthView =
  | 'entry'
  | 'signup-phone'
  | 'signup-otp'
  | 'signup-details'
  | 'signup-password'
  | 'signin';

type AuthPageProps = {
  mode?: 'gate' | 'full';
  onBack: () => void;
  onAuthSuccess: (mode: 'guest' | 'user' | 'signin' | 'signup', name?: string) => void;
};

/* ─────────────────────────────────────────────────────
   ALL helper components are defined at MODULE level
   so React never recreates them between renders.
───────────────────────────────────────────────────── */

function Logo() {
  return (
    <div className="flex items-center gap-2 mb-10">
      <div className="w-11 h-11 bg-[#b5894e] rounded-xl flex items-center justify-center shadow-lg">
        <Car className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold font-['Fraunces'] text-gray-900">SeatShare</span>
    </div>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-start pt-10 pb-20 px-4">
      <Logo />
      {children}
    </div>
  );
}

function Card({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <PageShell>
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="px-8 pt-8 pb-2">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="px-8 pt-5 pb-8 space-y-4">
          {children}
        </div>
      </div>
    </PageShell>
  );
}

function FieldWrap({ label, icon, children }: {
  label: string; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className={`relative ${icon ? '' : ''}`}>
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            {icon}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

const perks = [
  { icon: Tag,    text: 'Get Additional 5% off' },
  { icon: Shield, text: 'Manage your booking' },
  { icon: Gift,   text: 'Get exclusive deals and offers' },
];

/* ─────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────── */
export function AuthPage({ onBack, onAuthSuccess }: AuthPageProps) {
  const [view, setView] = useState<AuthView>('entry');

  /* sign-up state */
  const [phone, setPhone]         = useState('');
  const [otp, setOtp]             = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(179);
  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [showCpw, setShowCpw]     = useState(false);
  const [pwError, setPwError]     = useState('');
  const [agree, setAgree]         = useState(false);

  /* sign-in state */
  const [siEmail, setSiEmail] = useState('');
  const [siPw, setSiPw]       = useState('');
  const [showSiPw, setShowSiPw] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (view !== 'signup-otp') return;
    setCountdown(179);
    const t = setInterval(() => setCountdown(c => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [view]);

  const fmtTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[i] = val; setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const validatePw = () => {
    if (password.length < 8) { setPwError('Password must be at least 8 characters'); return false; }
    if (password !== confirmPw) { setPwError('Passwords do not match'); return false; }
    setPwError(''); return true;
  };

  const inputCls = "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5894e] focus:ring-2 focus:ring-[#b5894e]/20 transition-all bg-white";

  /* ── ENTRY ── */
  if (view === 'entry') return (
    <PageShell>
      <div className="w-full max-w-[480px]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            Book seats to enjoy the best<br />travel experience with SeatShare
          </h1>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Sign Up',            sub: 'Create a new account with us',              icon: UserPlus,  view: 'signup-phone' as AuthView, dashed: false },
            { label: 'Sign In',            sub: 'Already have an account with us',            icon: LogIn,     view: 'signin'       as AuthView, dashed: false },
            { label: 'Continue as a Guest',sub: 'Enjoy great discounts on your next bookings',icon: UserCheck, view: null,                       dashed: true  },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => item.view ? setView(item.view) : onAuthSuccess('guest')}
                className={`w-full flex items-center gap-4 bg-white rounded-2xl px-5 py-4 hover:bg-[#faf7f2] hover:shadow-md transition-all duration-200 group border-2 ${item.dashed ? 'border-dashed border-[#b5894e]/50 hover:border-[#b5894e]' : 'border-[#b5894e]'}`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#b5894e]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b5894e]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#b5894e]" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-gray-900 text-base">{item.label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.sub}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#b5894e] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>

        <button onClick={onBack} className="mt-6 flex items-center gap-2 text-sm text-gray-500 hover:text-[#b5894e] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home Page
        </button>

        <div className="mt-10">
          <p className="text-sm font-semibold text-gray-700 mb-3">Why sign up on SeatShare?</p>
          <div className="flex flex-wrap gap-2">
            {perks.map(p => {
              const Icon = p.icon;
              return (
                <div key={p.text} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600">
                  <Icon className="w-3.5 h-3.5 text-[#b5894e]" /> {p.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );

  /* ── SIGN UP — phone ── */
  if (view === 'signup-phone') return (
    <Card title="Create an Account" subtitle="Kindly enter your phone number to get started">
      <FieldWrap label="Phone Number">
        <div className="flex w-full border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#b5894e] focus-within:ring-2 focus-within:ring-[#b5894e]/20 transition-all">
          <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200 text-sm font-medium text-gray-700 select-none flex-shrink-0">
            <span>🇳🇬</span> NG <span className="text-gray-400 text-xs">▾</span>
          </div>
          <input
            type="tel"
            placeholder="+234 XXX XXX XXXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="flex-1 px-3 py-3 text-sm bg-white focus:outline-none min-w-0"
          />
        </div>
      </FieldWrap>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-0.5 accent-[#b5894e]" />
        <span className="text-sm text-gray-600">
          I agree to SeatShare's <span className="text-[#b5894e] underline">Terms & Conditions</span> and <span className="text-[#b5894e] underline">Privacy Policy</span>
        </span>
      </label>

      <button onClick={() => agree && phone && setView('signup-otp')} disabled={!agree || !phone}
        className="w-full py-3.5 rounded-xl bg-[#b5894e] disabled:bg-[#d4b48a] text-white font-semibold text-sm hover:bg-[#9a7340] transition-all">
        Continue
      </button>
      <p className="text-center text-sm text-gray-500">
        Already have an account? <button onClick={() => setView('signin')} className="text-[#b5894e] font-semibold hover:underline">Sign In</button>
      </p>
      <button onClick={() => setView('entry')} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#b5894e] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
    </Card>
  );

  /* ── SIGN UP — OTP ── */
  if (view === 'signup-otp') return (
    <Card title="Enter Verification Code" subtitle={`A 6-digit code has been sent to ${phone || '+234 XXX XXXX'}`}>
      <div className="flex justify-between gap-2 py-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => { otpRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleOtpChange(i, e.target.value)}
            onKeyDown={e => handleOtpKey(i, e)}
            className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all focus:outline-none ${
              digit ? 'border-[#b5894e] bg-[#faf7f2] text-[#b5894e]' : 'border-gray-200 bg-gray-50 text-gray-700 focus:border-[#b5894e]'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Didn't receive OTP?</span>
        {countdown > 0
          ? <span className="text-gray-500">Resend in <strong>{fmtTime(countdown)}</strong></span>
          : <button onClick={() => setCountdown(179)} className="text-[#b5894e] font-semibold hover:underline">Resend OTP</button>}
      </div>

      <button onClick={() => otp.every(d => d) && setView('signup-details')} disabled={!otp.every(d => d)}
        className="w-full py-3.5 rounded-xl bg-[#b5894e] disabled:bg-[#d4b48a] text-white font-semibold text-sm hover:bg-[#9a7340] transition-all">
        Verify OTP
      </button>
      <button onClick={() => setView('signup-phone')} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#b5894e] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
    </Card>
  );

  /* ── SIGN UP — details ── */
  if (view === 'signup-details') return (
    <Card title="Your Details" subtitle="Tell us a bit about yourself">
      <FieldWrap label="Full Name" icon={<User className="w-4 h-4" />}>
        <input type="text" placeholder="First and Last Name" value={fullName} onChange={e => setFullName(e.target.value)} className={inputCls} />
      </FieldWrap>

      <FieldWrap label="Email Address" icon={<Mail className="w-4 h-4" />}>
        <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
      </FieldWrap>

      <button onClick={() => fullName && email && setView('signup-password')} disabled={!fullName || !email}
        className="w-full py-3.5 rounded-xl bg-[#b5894e] disabled:bg-[#d4b48a] text-white font-semibold text-sm hover:bg-[#9a7340] transition-all">
        Continue
      </button>
      <button onClick={() => setView('signup-otp')} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#b5894e] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
    </Card>
  );

  /* ── SIGN UP — password ── */
  if (view === 'signup-password') return (
    <Card title="Create Password" subtitle="Kindly fill in your preferred password">
      <FieldWrap label="Enter Password" icon={<Lock className="w-4 h-4" />}>
        <input
          type={showPw ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={e => { setPassword(e.target.value); setPwError(''); }}
          className={`${inputCls} pr-10 ${pwError && password.length < 8 ? 'border-red-400 focus:border-red-400' : ''}`}
        />
        <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </FieldWrap>
      {pwError && password.length < 8 && <p className="text-red-500 text-xs -mt-2">{pwError}</p>}

      <FieldWrap label="Confirm Password" icon={<Lock className="w-4 h-4" />}>
        <input
          type={showCpw ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPw}
          onChange={e => { setConfirmPw(e.target.value); setPwError(''); }}
          className={`${inputCls} pr-10`}
        />
        <button type="button" onClick={() => setShowCpw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </FieldWrap>
      {pwError && password.length >= 8 && <p className="text-red-500 text-xs -mt-2">{pwError}</p>}

      {password.length > 0 && (
        <div className="space-y-1 -mt-1">
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${
              password.length < 6 ? 'w-1/4 bg-red-400' :
              password.length < 8 ? 'w-1/2 bg-orange-400' :
              password.length < 12 ? 'w-3/4 bg-yellow-400' : 'w-full bg-green-500'}`} />
          </div>
          <p className="text-xs text-gray-400">
            {password.length < 6 ? 'Weak' : password.length < 8 ? 'Fair' : password.length < 12 ? 'Good' : 'Strong'} password
          </p>
        </div>
      )}

      <button onClick={() => { if (validatePw()) onAuthSuccess('user', fullName); }} disabled={!password || !confirmPw}
        className="w-full py-3.5 rounded-xl bg-[#b5894e] disabled:bg-[#d4b48a] text-white font-semibold text-sm hover:bg-[#9a7340] transition-all">
        Get Started
      </button>
      <p className="text-center text-sm text-gray-500">
        Account already exists? <button onClick={() => setView('signin')} className="text-[#b5894e] font-semibold hover:underline">Sign In</button>
      </p>
      <button onClick={() => setView('signup-details')} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#b5894e] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
    </Card>
  );

  /* ── SIGN IN ── */
  if (view === 'signin') return (
    <Card title="Welcome Back" subtitle="Enter your details to sign in to your account">
      <FieldWrap label="Email or Phone Number" icon={<Mail className="w-4 h-4" />}>
        <input
          type="text"
          placeholder="Email or Phone Number"
          value={siEmail}
          onChange={e => setSiEmail(e.target.value)}
          className={inputCls}
        />
      </FieldWrap>

      <FieldWrap label="Password" icon={<Lock className="w-4 h-4" />}>
        <input
          type={showSiPw ? 'text' : 'password'}
          placeholder="Password"
          value={siPw}
          onChange={e => setSiPw(e.target.value)}
          className={`${inputCls} pr-10`}
        />
        <button type="button" onClick={() => setShowSiPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {showSiPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </FieldWrap>

      <div className="flex justify-end -mt-1">
        <button className="text-sm text-[#b5894e] hover:underline">Forgot Password?</button>
      </div>

      <button onClick={() => siEmail && siPw && onAuthSuccess('user', siEmail.split('@')[0])} disabled={!siEmail || !siPw}
        className="w-full py-3.5 rounded-xl bg-[#b5894e] disabled:bg-[#d4b48a] text-white font-semibold text-sm hover:bg-[#9a7340] transition-all">
        Sign In
      </button>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <div className="flex-1 h-px bg-gray-200" /> OR <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {['Google', 'Apple'].map(s => (
          <button key={s} className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-[#b5894e] transition-all">
            {s}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500">
        Don't have an account? <button onClick={() => setView('signup-phone')} className="text-[#b5894e] font-semibold hover:underline">Sign up</button>
      </p>
      <button onClick={() => setView('entry')} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#b5894e] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
    </Card>
  );

  return null;
}

/* ── Success Toast ── */
export function SuccessToast({ name, onDone }: { name?: string; onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 450);
    const t2 = setTimeout(() => setPhase('out'), 450 + 3200);
    const t3 = setTimeout(() => onDone(), 450 + 3200 + 420);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const animClass =
    phase === 'in'  ? 'animate-slide-in-right' :
    phase === 'out' ? 'animate-slide-out-right' : '';

  return (
    <div className={`fixed top-6 right-6 z-[200] ${animClass}`} style={{ minWidth: 300 }}>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              {name ? `Welcome, ${name}!` : 'Logged in successfully'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Taking you to booking…</p>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          {phase !== 'in' && <div className="h-full bg-green-500 animate-drain" />}
        </div>
      </div>
    </div>
  );
}
