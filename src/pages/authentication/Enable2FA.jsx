import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { setup2FA, verify2FASetup } from "../../services/adminAuth.service";

export function Enable2FA() {
  const [qr, setQr] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setup2FA().then((res) => {
      setQr(res.data.qrCode);
    });
  }, []);

  const verify = async () => {
    if (otp.length !== 6) return;

    try {
      setLoading(true);
      await verify2FASetup(otp);
      navigate("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Secure Your Account
          </h1>
          <p className="text-gray-600">
            Enable two-factor authentication to continue
          </p>
        </div>

        {/* Steps */}
        <ol className="space-y-4 mb-6 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="font-semibold">1.</span>
            Scan the QR code using Google Authenticator or Authy
          </li>
          <li className="flex gap-3">
            <span className="font-semibold">2.</span>
            Enter the 6-digit code from the app
          </li>
          <li className="flex gap-3">
            <span className="font-semibold">3.</span>
            Continue to your dashboard
          </li>
        </ol>

        {/* QR */}
        {qr && (
          <div className="flex justify-center mb-6">
            <img
              src={qr}
              alt="QR Code"
              className="border rounded-lg p-2"
            />
          </div>
        )}

        {/* OTP Input */}
        <div className="mb-6">
          <input
            type="text"
            maxLength={6}
            inputMode="numeric"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center tracking-widest text-lg py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={verify}
          disabled={loading || otp.length !== 6}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Verifying..." : "Enable & Continue"}
        </button>

        {/* Footer note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          This step is mandatory for admin security.
        </p>
      </div>
    </div>
  );
}
