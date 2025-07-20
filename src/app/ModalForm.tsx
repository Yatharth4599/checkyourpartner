"use client";
import { useState } from "react";

export default function ModalForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [relationship, setRelationship] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");

  // Remove handleCheckbox, not needed for radio

  async function handleSendOtp(e: React.MouseEvent) {
    e.preventDefault();
    setOtpLoading(true);
    setOtpError(null);
    setOtpSuccess(null);
    setOtpSent(false);
    setOtpVerified(false);
    setOtpInput("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (result.success) {
        setOtp(result.otp); // For demo only
        setOtpSent(true);
        setOtpSuccess("OTP sent to your email!");
      } else {
        setOtpError(result.message || "Failed to send OTP");
      }
    } catch (_err) {
      setOtpError("Failed to send OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  }

  function handleVerifyOtp(e: React.MouseEvent) {
    e.preventDefault();
    setOtpError(null);
    if (otpInput === otp) {
      setOtpVerified(true);
      setOtpSuccess("Email verified!");
    } else {
      setOtpError("Invalid OTP. Please check your email and try again.");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    if (!otpVerified) {
      setError("Please verify your email with OTP before proceeding to payment.");
      setLoading(false);
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email,
      name: formData.get("name") as string,
      insta: formData.get("insta") as string,
      partnerName: formData.get("partnerName") as string,
      partnerInsta: formData.get("partnerInsta") as string,
      phone: `${countryCode}${formData.get("phone") as string}`,
      relationship,
      message: formData.get("message") as string,
    };
    try {
      const res = await fetch("/api/loyalty-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        // Instead of showing success, trigger Stripe Checkout
        const stripeRes = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const stripeData = await stripeRes.json();
        if (stripeData.url) {
          window.location.href = stripeData.url;
          return;
        } else {
          setError("Payment session creation failed. Please try again.");
        }
        // form.reset();
        // setRelationship("");
        // setEmail("");
        // setOtpSent(false);
        // setOtpVerified(false);
        // setOtpInput("");
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (_err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all duration-300">
      <div className="relative bg-white border border-pink-100 rounded-3xl shadow-2xl w-full max-w-md mx-2 p-4 sm:p-6 animate-modal-pop max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-pink-600 text-2xl font-bold transition"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-extrabold text-center mb-2 text-pink-600">Start Loyalty Test</h2>
        <p className="text-center text-gray-500 mb-6">Fill in the details below to begin your confidential loyalty test.</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="font-medium">Your Email <span className="text-pink-600">*</span></label>
          <div className="flex gap-2 items-center">
            <input name="email" type="email" placeholder="Your Email" className="input flex-1" required value={email} onChange={e => setEmail(e.target.value)} disabled={otpSent || otpVerified} />
            <button type="button" onClick={handleSendOtp} disabled={otpLoading || !email || otpSent || otpVerified} className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-4 py-2 rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed">
              {otpLoading ? "Sending..." : otpVerified ? "Verified" : otpSent ? "Sent" : "Send OTP"}
            </button>
          </div>
          {otpSent && !otpVerified && (
            <div className="flex gap-2 items-center mt-1">
              <input type="text" placeholder="Enter OTP" className="input flex-1" value={otpInput} onChange={e => setOtpInput(e.target.value)} maxLength={6} />
              <button type="button" onClick={handleVerifyOtp} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow transition">Verify</button>
            </div>
          )}
          {otpSuccess && <div className="text-green-600 text-center font-semibold mt-1">{otpSuccess}</div>}
          {otpError && <div className="text-red-600 text-center font-semibold mt-1">{otpError}</div>}
          <label className="font-medium">Your Name <span className="text-pink-600">*</span></label>
          <input name="name" type="text" placeholder="Your Name" className="input" required />
          <label className="font-medium">Your Instagram ID <span className="text-pink-600">*</span></label>
          <input name="insta" type="text" placeholder="Your Instagram ID" className="input" required />
          <label className="font-medium">Your Partner&apos;s Name <span className="text-pink-600">*</span></label>
          <input name="partnerName" type="text" placeholder="Your Partner&apos;s Name" className="input" required />
          <label className="font-medium">Partner&apos;s Instagram ID <span className="text-pink-600">*</span></label>
          <input name="partnerInsta" type="text" placeholder="Partner&apos;s Instagram ID" className="input" required />
          <label className="font-medium">Your Phone Number (WhatsApp) <span className="text-pink-600">*</span></label>
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={countryCode}
              onChange={e => setCountryCode(e.target.value)}
              className="input w-28 px-2 py-2 text-base"
              required
            >
              <option value="+1">🇺🇸 +1</option>
              <option value="+91">🇮🇳 +91</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+81">🇯🇵 +81</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+33">🇫🇷 +33</option>
              <option value="+55">🇧🇷 +55</option>
              <option value="+7">🇷🇺 +7</option>
              <option value="+234">🇳🇬 +234</option>
              <option value="+27">🇿🇦 +27</option>
              <option value="+63">🇵🇭 +63</option>
              <option value="+62">🇮🇩 +62</option>
              <option value="+92">🇵🇰 +92</option>
              <option value="+880">🇧🇩 +880</option>
              <option value="+20">🇪🇬 +20</option>
              <option value="+966">🇸🇦 +966</option>
              <option value="+972">🇮🇱 +972</option>
              <option value="+82">🇰🇷 +82</option>
              <option value="+34">🇪🇸 +34</option>
              <option value="+39">🇮🇹 +39</option>
              <option value="+90">🇹🇷 +90</option>
              <option value="+48">🇵🇱 +48</option>
              <option value="+351">🇵🇹 +351</option>
              <option value="+380">🇺🇦 +380</option>
              <option value="+1-876">🇯🇲 +1-876</option>
              <option value="+1-868">🇹🇹 +1-868</option>
              <option value="+1-246">🇧🇧 +1-246</option>
              <option value="+1-264">🇦🇮 +1-264</option>
              <option value="+1-268">🇧🇧 +1-268</option>
              <option value="+1-473">🇬🇩 +1-473</option>
              <option value="+1-758">🇱🇨 +1-758</option>
              <option value="+1-784">🇻🇨 +1-784</option>
              <option value="+1-809">🇩🇴 +1-809</option>
              <option value="+1-829">🇩🇴 +1-829</option>
              <option value="+1-849">🇩🇴 +1-849</option>
              <option value="+1-868">🇹🇹 +1-868</option>
              <option value="+1-876">🇯🇲 +1-876</option>
            </select>
            <input name="phone" type="tel" placeholder="Your Phone Number (WhatsApp)" className="input flex-1" required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Your relationship with them: <span className="text-pink-600">*</span></label>
            <div className="flex flex-wrap gap-2">
              {[
                "Spouse/Legal Partner",
                "Dating",
                "Situationship",
                "Fiancé(e)",
                "Arrange Marriage Purposes",
                "Just Curious to Know",
              ].map((label) => (
                <label key={label} className="flex items-center gap-1 bg-pink-50 px-3 py-1 rounded-full cursor-pointer text-sm font-medium">
                  <input
                    type="radio"
                    name="relationship"
                    value={label}
                    checked={relationship === label}
                    onChange={() => setRelationship(label)}
                    className="accent-pink-600"
                    required
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <label className="font-medium">Anything you want to share with us (optional)</label>
          <textarea name="message" placeholder="Anything you want to share with us (optional)" className="input min-h-[80px] resize-y" />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              required
              className="accent-pink-600"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline text-pink-600 hover:text-pink-800">Terms and Conditions</a><span className="text-pink-600">*</span></label>
          </div>
          <button type="submit" disabled={loading || !agreed} className="mt-4 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg text-lg hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Submitting..." : "Pay & Start Test"}
          </button>
          {success && <div className="text-green-600 text-center font-semibold mt-2">{success}</div>}
          {error && <div className="text-red-600 text-center font-semibold mt-2">{error}</div>}
        </form>
      </div>
      <style jsx global>{`
        .input {
          @apply w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none transition shadow-sm bg-gray-50;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        .animate-modal-pop {
          animation: modalPop 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPop {
          0% { opacity: 0; transform: scale(0.7) translateY(60px); }
          80% { opacity: 1; transform: scale(1.04) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
} 