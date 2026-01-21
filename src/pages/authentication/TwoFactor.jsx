import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verify2FALogin } from "../../services/adminAuth.service";

export function TwoFactorPage() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box automatically
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const tempToken = localStorage.getItem("tempToken");
    const code = otp.join("");

    if (code.length !== 6) return;

    try {
      setLoading(true);

      const res = await verify2FALogin({
        otp: code,
        tempToken,
      });

      localStorage.removeItem("tempToken");
      localStorage.setItem("token", res.data.token);

      navigate("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-2">
          Two-Factor Authentication
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the 6-digit code from your authenticator app
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || otp.join("").length !== 6}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Having trouble? Check your device time sync.
        </p>
      </div>
    </div>
  );
}
