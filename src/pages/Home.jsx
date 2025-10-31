import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.jpg";

function Home() {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffffff 0%, #2e6c9b 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 25px",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(8px)",
          color: "#150906",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          flexWrap: "wrap",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "180px",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
              maxWidth: "100%",
            }}
          />
        </div>

        {/* Navbar Button */}
        <div style={{ marginTop: "10px" }}>
          <Link
            to="/adminlogin"
            className="nav-button"
            style={{
              display: "inline-block",
              fontWeight: "600",
              color: "#2e6c9b",
              fontSize: "1rem",
              border: "2px solid #2e6c9b",
              borderRadius: "50px",
              padding: "10px 22px",
              transition: "all 0.3s ease",
              textDecoration: "none",
              backgroundColor: "#fff",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#2e6c9b";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#2e6c9b";
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ✅ Main Section */}
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#150906",
          padding: "30px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontWeight: "600",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            marginBottom: "20px",
            color: "#1f1f1f",
            opacity: 0.9,
            lineHeight: "1.3",
          }}
        >
          Empowering Businesses, Enabling Growth
        </h1>

        <p
          style={{
            fontWeight: "400",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            marginBottom: "40px",
            color: "#1f1f1f",
            opacity: 0.9,
            lineHeight: "1.6",
            maxWidth: "700px",
          }}
        >
          “We believe in empowering businesses with smart digital tools and enabling growth through innovation — All in One.”
        </p>

        <Link
          to="/adminlogin"
          style={{
            textDecoration: "none",
            background: "linear-gradient(90deg, #f9d423, #ff4e50)",
            color: "#fff",
            padding: "14px 36px",
            borderRadius: "50px",
            fontSize: "1.1rem",
            fontWeight: "600",
            transition: "transform 0.3s ease",
            boxShadow: "0 5px 15px rgba(255, 78, 80, 0.3)",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Get Started
        </Link>
      </section>

      {/* ✅ Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "15px",
          background: "rgba(0, 0, 0, 0.05)",
          color: "#2e2e2e",
          fontSize: "0.9rem",
        }}
      >
        © 2025 SMD Technologies. All rights reserved.
      </footer>

      {/* ✅ Inline Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            nav {
              flex-direction: column;
              text-align: center;
              gap: 10px;
            }

            img {
              width: 140px !important;
            }

            .nav-button {
              margin-top: 10px !important;
              font-size: 0.95rem !important;
              padding: 8px 20px !important;
            }

            h1 {
              font-size: 1.8rem !important;
            }

            p {
              font-size: 1rem !important;
            }
          }

          @media (max-width: 480px) {
            nav {
              padding: 10px 15px !important;
            }

            img {
              width: 120px !important;
            }

            h1 {
              font-size: 1.6rem !important;
            }

            p {
              font-size: 0.95rem !important;
            }

            a {
              padding: 12px 28px !important;
              font-size: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
