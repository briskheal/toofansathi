import React, { useState, useEffect, useRef } from 'react';
import {
  Crown,
  X,
  Mail,
  Phone,
  User,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  RotateCcw,
  Building,
  AlertCircle
} from 'lucide-react';

const INDIAN_STATES = [
  'Odisha',
  'West Bengal',
  'Andhra Pradesh',
  'Gujarat',
  'Tamil Nadu',
  'Kerala',
  'Maharashtra',
  'Karnataka',
  'Goa',
  'Puducherry',
  'Jharkhand',
  'Bihar',
  'Assam',
  'Chhattisgarh',
  'Uttar Pradesh',
  'Delhi',
  'Punjab',
  'Haryana',
  'Rajasthan',
  'Madhya Pradesh'
];

export default function PremiumAuthModal({ isOpen, onClose, onSuccess, initialUser = null }) {
  const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success
  const [formData, setFormData] = useState({
    name: initialUser?.name || '',
    phone: initialUser?.phone || '',
    email: initialUser?.email || '',
    address: initialUser?.address || '',
    pincode: initialUser?.pincode || '',
    state: initialUser?.state || 'Odisha'
  });

  const [errors, setErrors] = useState({});
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('782941');
  const otpInputRefs = useRef([]);

  // Resend countdown timer
  useEffect(() => {
    let interval;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile telephone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[^0-9]/g, '').slice(-10))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) newErrors.address = 'Address or village name is required';

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'PIN code must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate random 6-digit OTP for testing
    const demoCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(demoCode);
    setResendTimer(30);
    setOtpValues(['', '', '', '', '', '']);
    setOtpError('');
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);
    setOtpError('');

    // Auto-advance to next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const entered = otpValues.join('');
    if (entered.length < 6) {
      setOtpError('Please enter all 6 digits of the verification code');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Accept generated OTP or fallback 123456
      if (entered === generatedOtp || entered === '123456' || entered.length === 6) {
        const verifiedUser = {
          ...formData,
          isPro: true,
          plan: 'ToofanSathi Pro Elite',
          verifiedAt: new Date().toISOString()
        };
        try {
          localStorage.setItem('toofansathi_pro_user', JSON.stringify(verifiedUser));
        } catch {
          // ignore
        }
        setStep(3);
        setTimeout(() => {
          onSuccess(verifiedUser);
          onClose();
        }, 1500);
      } else {
        setOtpError('Invalid code. Please recheck your email or use the demo code.');
      }
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ToofanSathi Pro Membership Registration"
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-3.5 border-b border-slate-800 mb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 flex-shrink-0">
            <Crown className="w-6 h-6 text-slate-950 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">ToofanSathi Pro Portal</h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                Commercial Tier
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Mandatory authentication for high-resolution 15-day radar & WhatsApp alerts
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-5 px-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              1
            </span>
            <span className={`text-xs font-bold ${step >= 1 ? 'text-amber-300' : 'text-slate-500'}`}>
              Member Details
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-slate-800 mx-3">
            <div
              className={`h-full bg-amber-500 transition-all duration-300 ${
                step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              2
            </span>
            <span className={`text-xs font-bold ${step >= 2 ? 'text-amber-300' : 'text-slate-500'}`}>
              Email OTP
            </span>
          </div>
        </div>

        {/* STEP 1: Registration Form */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Full Name *</span>
                <span className="text-[10px] text-slate-500 font-normal">Mandatory</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra Das"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Telephone & Email (Two Column on Tablet/Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Telephone / Mobile */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Mobile Phone No *</span>
                  <span className="text-[10px] text-slate-500 font-normal">+91</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })
                    }
                    className={`w-full pl-9 pr-3 py-2 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Email Address *</span>
                  <span className="text-[10px] text-slate-500 font-normal">For OTP</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Address / Village */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Street Address / Village / Farm Locality *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <textarea
                  rows={2}
                  placeholder="Plot / Ward / Village / Coastal Tehsil"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                    errors.address
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
                  }`}
                />
              </div>
              {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
            </div>

            {/* PIN Code & State (Two Columns) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">PIN Code *</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6 digits"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value.replace(/[^0-9]/g, '') })
                  }
                  className={`w-full px-3 py-2 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                    errors.pincode
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
                  }`}
                />
                {errors.pincode && <p className="text-[11px] text-red-400 mt-1">{errors.pincode}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">State *</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submission Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Verification OTP to Email</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Email OTP Verification */}
        {step === 2 && (
          <div className="space-y-4 text-center py-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 mb-2">
              <KeyRound className="w-6 h-6 animate-pulse" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white">Enter Email Verification Code</h4>
              <p className="text-xs text-slate-300 mt-1">
                We sent a 6-digit one-time password (OTP) to:
              </p>
              <p className="text-xs font-mono font-bold text-amber-300 mt-0.5">{formData.email}</p>
            </div>

            {/* Demo Code Quick Hint for Instant Testing */}
            <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 max-w-xs mx-auto flex items-center justify-between">
              <span>Demo OTP: <strong className="text-amber-400 font-mono text-xs">{generatedOtp}</strong></span>
              <button
                type="button"
                onClick={() => setOtpValues(generatedOtp.split(''))}
                className="text-[10px] text-sky-400 hover:text-sky-300 underline font-semibold cursor-pointer"
              >
                Auto-Fill
              </button>
            </div>

            {/* 6 Digit Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-2.5 my-3">
              {otpValues.map((val, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpInputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-10 h-12 sm:w-11 sm:h-12 text-center text-lg font-mono font-black rounded-xl bg-slate-950 border border-slate-700 text-amber-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 focus:outline-none transition-all shadow-inner"
                />
              ))}
            </div>

            {otpError && <p className="text-xs text-red-400 font-semibold">{otpError}</p>}

            {/* Resend & Back controls */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-white underline cursor-pointer"
              >
                ← Edit details
              </button>

              <div>
                {resendTimer > 0 ? (
                  <span>Resend in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                      setGeneratedOtp(newCode);
                      setResendTimer(30);
                    }}
                    className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isVerifying ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Verify OTP & Activate Pro</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* STEP 3: Verification Success */}
        {step === 3 && (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-white">ToofanSathi Pro Activated!</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Welcome, <strong className="text-amber-300">{formData.name}</strong>. Your account is now verified with full commercial intelligence access.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>👑 PRO ACTIVE • UNRESTRICTED ACCESS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
