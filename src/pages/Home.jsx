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
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 30px",
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
            }}
          />
        </div>

        {/* Navbar Button */}
        <div style={{ marginTop: "10px" }}>
          <Link
            to="/adminlogin"
            className="btn btn-light rounded-pill px-4 py-2 shadow-sm"
            style={{
              fontWeight: "600",
              color: "#2e6c9b",
              fontSize: "1rem",
              border: "2px solid #2e6c9b",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2e6c9b", e.target.style.color = "#fff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#fff", e.target.style.color = "#2e6c9b")}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <section
        className="text-center"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#150906",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontWeight: "600",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            marginBottom: "20px",
            color: "#1f1f1f",
            opacity: 0.9,
          }}
        >
          Empowering Businesses, Enabling Growth
        </h1>

        <pre
          style={{
            fontWeight: "400",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            marginBottom: "40px",
            color: "#1f1f1f",
            opacity: 0.9,
      
          }}
        >
          “We believe in empowering businesses with smart digital <br />
          tools and enabling growth through innovation — All in One.”
        </pre>

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
            transition: "0.3s ease",
            boxShadow: "0 5px 15px rgba(255, 78, 80, 0.3)",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
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
    </div>
  );
}

export default Home;
