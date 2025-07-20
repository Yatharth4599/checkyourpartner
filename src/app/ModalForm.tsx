"use client";
import { useState } from "react";

export default function ModalForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [relationship, setRelationship] = useState<string[]>([]);
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

  const handleCheckbox = (value: string) => {
    setRelationship((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

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
    } catch (err) {
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
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email,
      name: formData.get("name") as string,
      insta: formData.get("insta") as string,
      partnerName: formData.get("partnerName") as string,
      partnerInsta: formData.get("partnerInsta") as string,
      phone: formData.get("phone") as string,
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
        setSuccess("Form submitted successfully! We'll contact you soon.");
        form.reset();
        setRelationship([]);
        setEmail("");
        setOtpSent(false);
        setOtpVerified(false);
        setOtpInput("");
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
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
          <label className="font-medium">Your Partner's Name <span className="text-pink-600">*</span></label>
          <input name="partnerName" type="text" placeholder="Your Partner's Name" className="input" required />
          <label className="font-medium">Partner's Instagram ID <span className="text-pink-600">*</span></label>
          <input name="partnerInsta" type="text" placeholder="Partner's Instagram ID" className="input" required />
          <label className="font-medium">Your Phone Number (WhatsApp) <span className="text-pink-600">*</span></label>
          <input name="phone" type="tel" placeholder="Your Phone Number (WhatsApp)" className="input" required />
          <div>
            <label className="block font-semibold mb-1">Your relationship with them: <span className="text-pink-600">*</span></label>
            <div className="flex flex-wrap gap-2">
              {[
                "Spouse/Legal Partner",
                "Relationship",
                "Situationship",
                "Fiancé(e)",
                "Arrange Marriage Purposes",
                "Just Curious to Know",
              ].map((label) => (
                <label key={label} className="flex items-center gap-1 bg-pink-50 px-3 py-1 rounded-full cursor-pointer text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={relationship.includes(label)}
                    onChange={() => handleCheckbox(label)}
                    className="accent-pink-600"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <label className="font-medium">Anything you want to share with us (optional)</label>
          <textarea name="message" placeholder="Anything you want to share with us (optional)" className="input min-h-[80px] resize-y" />
          <button type="submit" disabled={loading || !otpVerified} className="mt-4 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg text-lg hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed">
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