import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.jpg";
import { FiLogOut } from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "" });
  const [menuOpen, setMenuOpen] = useState(false);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    showToast("✅ Logged out successfully!");
    setTimeout(() => navigate("/adminlogin"), 2200);
  };

  return (
    <div style={{ fontFamily: "Poppins, Arial, sans-serif", position: "relative" }}>
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: "20px",
            backgroundColor: "#2e6c9b",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "500",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 2000,
            animation: "fadein 0.3s ease-in-out",
          }}
        >
          {toast.message}
        </div>
      )}

      
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          background:
            "linear-gradient(135deg, rgba(46,108,155,1) 0%, rgba(18,48,73,1) 100%)",
          color: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          flexWrap: "wrap",
        }}
      >
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "120px",
              height: "auto",
              borderRadius: "2px",
              objectFit: "cover",
              backgroundColor: "white",
              padding: "5px",
            }}
          />
        </div>

        
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ☰
        </div>

       
        <div
          style={{
            display: menuOpen ? "flex" : "none",
            flexDirection: "column",
            width: "100%",
            marginTop: "10px",
            gap: "10px",
          }}
          className="mobile-menu"
        >
          <NavButtons handleLogout={handleLogout} />
        </div>

        
        <div
          className="desktop-menu"
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <NavButtons handleLogout={handleLogout} />
        </div>
      </nav>

      
      <section
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(135deg, #f7fbff 0%, rgba(46,108,155,0.2) 100%)",
          color: "#123049",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "80%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "6px",
              objectFit: "cover",
            }}
          />
        </div>
      </section>
      <style>
        {`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .menu-toggle {
            display: block !important;
          }
          .mobile-menu {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 10px 0;
            animation: slideDown 0.3s ease;
          }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
      </style>
    </div>
  );
}


function NavButtons({ handleLogout }) {
  return (
    <>

      <Link
        to="/addemployee"
        style={buttonStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        Add New Employee
      </Link>

      <Link
        to="/users"
        style={buttonStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        Payslip
      </Link>

      <Link
        to="/letters"
        style={buttonStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        Letter's
      </Link>

      <button
        onClick={handleLogout}
        style={buttonStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        <FiLogOut /> Logout
      </button>
    </>
  );
}


const buttonStyle = {
  backgroundColor: "#ffffff",
  color: "#2e6c9b",
  border: "none",
  padding: "10px 20px",
  borderRadius: "25px",
  fontWeight: "600",
  fontSize: "15px",
  transition: "all 0.3s ease",
  textDecoration: "none",
  boxShadow: "0 2px 5px rgba(255,255,255,0.2)",
  cursor: "pointer",
  textAlign: "center",
};

const hoverIn = (e) => {
  e.target.style.backgroundColor = "#123049";
  e.target.style.color = "#ffffff";
  e.target.style.transform = "scale(1.05)";
  e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
};

const hoverOut = (e) => {
  e.target.style.backgroundColor = "#ffffff";
  e.target.style.color = "#2e6c9b";
  e.target.style.transform = "scale(1)";
  e.target.style.boxShadow = "0 2px 5px rgba(255,255,255,0.2)";
};

export default Dashboard;
