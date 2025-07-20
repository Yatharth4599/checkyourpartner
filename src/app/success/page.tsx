"use client";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-fuchsia-50 to-blue-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center animate-modal-pop">
        <span className="text-5xl mb-4">🎉</span>
        <h1 className="text-3xl font-extrabold text-pink-600 mb-2 text-center">Payment Successful!</h1>
        <p className="text-gray-700 text-center mb-4">Thank you for booking your loyalty test. Our team will contact you soon with the next steps.<br/>Your trust means a lot to us!</p>
        <a href="/" className="mt-4 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg text-lg hover:scale-105 transition-transform">Return to Home</a>
      </div>
      <style jsx global>{`
        .animate-modal-pop {
          animation: modalPop 0.35s cubic-bezier(0.22, 1, 0.36, 1);
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