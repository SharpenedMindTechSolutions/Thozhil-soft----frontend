import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const ADMIN_USER = import.meta.env.VITE_ADMIN_USER;
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (form.username === ADMIN_USER && form.password === ADMIN_PASS) {
        showToast("✅ Login Successful", "success");
        localStorage.setItem("isAdminLoggedIn", "true");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        showToast("❌ Invalid username or password", "danger");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #000428, #004e92)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "45px 40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
        }}
      >
        <h2
          className="text-center mb-2"
          style={{
            fontWeight: "700",
            fontSize: "2rem",
            color: "#FFD700",
            textShadow: "0 0 10px rgba(255,215,0,0.6)",
          }}
        >
          SMD Admin Login
        </h2>
        <p className="text-center text-white-50 mb-4">
          Access the administrator dashboard
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4 position-relative">
            <FaUserAlt
              style={{
                position: "absolute",
                top: "50%",
                left: "15px",
                transform: "translateY(-50%)",
                color: "#FFD700",
                opacity: 0.9,
              }}
            />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              autoComplete="off"
              required
              style={{
                width: "100%",
                padding: "14px 14px 14px 45px",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #FFD700")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255,255,255,0.4)")
              }
            />
          </div>

          {/* Password */}
          <div className="mb-4 position-relative">
            <FaLock
              style={{
                position: "absolute",
                top: "50%",
                left: "15px",
                transform: "translateY(-50%)",
                color: "#FFD700",
                opacity: 0.9,
              }}
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              style={{
                width: "100%",
                padding: "14px 14px 14px 45px",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #FFD700")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255,255,255,0.4)")
              }
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "50px",
              border: "none",
              background: loading
                ? "linear-gradient(90deg, #999, #777)"
                : "linear-gradient(90deg, #FFD700, #FF8C00)",
              color: "#000",
              fontWeight: "700",
              fontSize: "1.1rem",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 20px rgba(255,215,0,0.4)",
              transition: "0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    border: "3px solid #000",
                    borderTop: "3px solid transparent",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p
          className="text-center mt-4 text-white-50"
          style={{ fontSize: "0.85rem" }}
        >
          &copy; SMD Admin Portal 2025
        </p>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`toast align-items-center text-bg-${toast.type} border-0 position-fixed top-0 end-0 m-3 show`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setToast({ ...toast, show: false })}
            ></button>
          </div>
        </div>
      )}

      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          div[style*='width: 400px'] {
            width: 90% !important;
            padding: 35px 25px !important;
          }
        }
      `}
      </style>
    </div>
  );
}

export default AdminLogin;
