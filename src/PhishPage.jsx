import React, { useEffect } from "react";

export default function PhishPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uid = params.get("uid") || "unknown";

    const ngrokUrl = import.meta.env.VITE_NGROK_URL;
    if (!ngrokUrl) {
      console.error("VITE_NGROK_URL is not defined in the environment variables.");
      return;
    }

    // Sending a fetch request with custom headers
   fetch(`${ngrokUrl}/log-phish?user=${encodeURIComponent(uid)}&time=${encodeURIComponent(new Date().toISOString())}&ngrok-skip-browser-warning=true`, {
      method: "GET",
      headers: {
         "ngrok-skip-browser-warning": "true",
      }
    }).catch(err => console.error("Error logging phishing attempt:", err));
  }, []);

  return (
    <div style={pageStyle}>
      <img src="https://media1.tenor.com/m/_8Fm48kIrXQAAAAd/wahoo-fish.gif" alt="Rotating fish" style={imageStyle} />
      <h1 style={{ color: "#c82333" }}>You’ve just been <strong>phished</strong>!</h1>
      <p style={{ fontSize: "1.2em", marginTop: "1em", color: "#555" }}>
        This was a security awareness test conducted by your team.
      </p>
      <div style={containerStyle}>
        <h2 style={{ marginBottom: "1em" }}>Simulated Login Page</h2>
        <input type="text" placeholder="Username" style={inputStyle} disabled />
        <input type="password" placeholder="Password" style={inputStyle} disabled />
        <button style={buttonStyle} disabled>Login</button>
        <p style={{ marginTop: "1em", color: "#888", fontSize: "0.9em" }}>
          (But actually... don't enter anything. You're already caught!)
        </p>
      </div>
      {/* Content Security Policy Update */}
     <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://cdn.ngrok.com 'unsafe-eval' 'unsafe-inline'; font-src 'self' https://assets.ngrok.com;"/>

    </div>
  );
}

const pageStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f8f9fa",
  minHeight: "100vh",
  padding: "2em",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const imageStyle = {
  width: "300px",
  marginBottom: "1em",
};

const containerStyle = {
  marginTop: "2em",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  padding: "2em",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "100%",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "0.5em",
  margin: "0.5em 0",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "0.5em 1em",
  border: "none",
  borderRadius: "4px",
  cursor: "not-allowed",
};
