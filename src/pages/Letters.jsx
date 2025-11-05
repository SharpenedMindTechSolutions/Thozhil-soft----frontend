import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

// ---------------- Modal Component ----------------
function Modal({ children, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={(e) => e.stopPropagation()} role="dialog">
        {children}
      </div>
    </div>,
    document.body
  );
}

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.45)",
  zIndex: 9999,
};

const modalContent = {
  width: "90%",
  maxWidth: "720px",
  background: "#fff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  maxHeight: "90vh",
  overflowY: "auto",
};

// ---------------- Letters Component ----------------
function Letters() {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [openMenus, setOpenMenus] = useState({});
  const [interns, setInterns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false); // ✅ Properly placed hook

  const [formData, setFormData] = useState({
    internId: "",
    internName: "",
    course: "",
    project: "",
    attendance: "",
    testMark: "",
    starting: "",
    ending: "",
  });

  const firstInputRef = useRef(null);
  const navigate = useNavigate();

  // ---------------- Fetch Interns ----------------
  useEffect(() => {
    if (activeMenu === "Internship" && activeSubMenu === "SMD Intern's") {
      fetch(`${API_URL}/fetch/interns`)
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          setInterns(data || []);
          toast.success(data.length ? "Intern data fetched successfully!" : "No intern data found.");
        })
        .catch(() => toast.error("Failed to fetch intern data."));
    }
  }, [activeMenu, activeSubMenu]);

  useEffect(() => {
    if (showModal) setTimeout(() => firstInputRef.current?.focus?.(), 60);
  }, [showModal]);

  // ---------------- Handlers ----------------
  const handleGoBack = () => navigate("/dashboard");
  const toggleMenu = (menu) => setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value.toUpperCase() }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading animation
    try {
      const response = await fetch(`${API_URL}/mkuintern`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${formData.internName}_${formData.course}_mku_intern_Certificate.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success("PDF generated successfully!");

      setFormData({
        internId: "",
        internName: "",
        course: "",
        project: "",
        attendance: "",
        testMark: "",
        starting: "",
        ending: "",
      });
      setShowModal(false);
      setActiveSubMenu("");
      navigate("/letters");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF");
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  // ---------------- Render Content ----------------
  const renderContent = () => {
    if (activeMenu === "Internship" && activeSubMenu === "SMD Intern's") {
      return (
        <div>
          <div style={responsiveButtonContainer}>
            <button style={buttonStyle} onClick={() => navigate("/internofferletters")}>
              + Add New Intern
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: "#f0f0f0" }}>
                  <th style={tableCellStyle}>Intern ID</th>
                  <th style={tableCellStyle}>Name</th>
                  <th style={tableCellStyle}>Course</th>
                  <th style={tableCellStyle}>Date of Joining</th>
                  <th style={tableCellStyle}>Email</th>
                  <th style={tableCellStyle}>Stipend</th>
                </tr>
              </thead>
              <tbody>
                {interns.map((i) => (
                  <tr key={i.intern_id}>
                    <td style={tableCellStyle}>{i.intern_id}</td>
                    <td style={tableCellStyle}>{i.intern_name}</td>
                    <td style={tableCellStyle}>{i.intern_course}</td>
                    <td style={tableCellStyle}>{i.intern_doj}</td>
                    <td style={tableCellStyle}>{i.intern_email}</td>
                    <td style={tableCellStyle}>{i.stipend_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return <img src={logo} alt="Logo" style={styles.logoImage1} />;
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={{ ...styles.sidebar, left: sidebarOpen ? 0 : "-280px" }}>
        <div style={styles.sidebarHeader}>
          <img src={logo} alt="Logo" style={styles.logoImage} />
          <button style={styles.hamburger} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
        </div>

        <ul style={styles.menuList}>
          <li style={menuItemStyle(activeMenu === "Internship")} onClick={() => toggleMenu("Internship")}>
            <span>Internship</span>
            {openMenus["Internship"] ? <FaChevronUp /> : <FaChevronDown />}
          </li>
          {openMenus["Internship"] && (
            <ul style={styles.subMenuList}>
              <li
                style={subMenuItemStyle(activeSubMenu === "SMD Intern's")}
                onClick={() => {
                  setActiveMenu("Internship");
                  setActiveSubMenu("SMD Intern's");
                }}
              >
                Intern Student
              </li>
              <li
                style={subMenuItemStyle(activeSubMenu === "Certificate")}
                onClick={() => {
                  setActiveMenu("Internship");
                  setActiveSubMenu("Certificate");
                  navigate("/smdinterncertify");
                }}
              >
                Certificate
              </li>
            </ul>
          )}

          {["Experience Letter", "Relieving Letter", "Offer Letter", "Quotation Letter"].map((m) => (
            <li
              key={m}
              style={menuItemStyle(activeMenu === m)}
              onClick={() => {
                setActiveMenu(m);
                setActiveSubMenu("");
                if (m === "Experience Letter") navigate("/experienceletter");
                if (m === "Quotation Letter") navigate("/quotation");
              }}
            >
              {m}
            </li>
          ))}

          <li style={menuItemStyle(activeMenu === "MKU Mini Internship")} onClick={() => toggleMenu("MKU Mini Internship")}>
            <span>MKU Mini Internship</span>
            {openMenus["MKU Mini Internship"] ? <FaChevronUp /> : <FaChevronDown />}
          </li>
          {openMenus["MKU Mini Internship"] && (
            <ul style={styles.subMenuList}>
              <li
                style={subMenuItemStyle(activeSubMenu === "Add Intern")}
                onClick={() => {
                  setActiveMenu("MKU Mini Internship");
                  setActiveSubMenu("Add Intern");
                  setShowModal(true);
                }}
              >
                Add Intern & Download Certificate
              </li>
            </ul>
          )}
        </ul>

        <button style={styles.goBackButton} onClick={handleGoBack}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Go Back
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h2>
          {activeMenu || "Dashboard"} {activeSubMenu ? `- ${activeSubMenu}` : ""}
        </h2>
        <div style={styles.card}>{renderContent()}</div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => { setShowModal(false); setActiveSubMenu(""); }}>
          <InternForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            firstInputRef={firstInputRef}
            setShowModal={setShowModal}
            loading={loading}
          />
        </Modal>
      )}
      <ToastContainer position="top-right" />
    </div>
  );
}

// ---------------- Intern Form ----------------
const InternForm = ({ formData, setFormData, handleSubmit, firstInputRef, setShowModal, loading }) => (
  <div
    style={{
      padding: "20px",
      borderRadius: "12px",
      background: "#f9fafb",
      width: "100%",
      maxWidth: "720px",
      boxSizing: "border-box",
    }}
  >
    <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.5rem", fontWeight: "600" }}>
      Internship Details
    </h2>

    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px 12px",
      }}
    >
      {["internId", "internName", "course", "project", "attendance", "testMark", "starting", "ending"].map((field) => (
        <div key={field} style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: "500", marginBottom: "4px", color: "#374151" }}>
            {field === "internId"
              ? "Intern ID"
              : field === "internName"
              ? "Intern Name"
              : field === "starting"
              ? "Start Date"
              : field === "ending"
              ? "End Date"
              : field.charAt(0).toUpperCase() + field.slice(1)}
          </label>

          {field === "course" ? (
            <select
              name="course"
              value={formData.course || ""}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
              style={inputStyle}
            >
              <option value="">Select Course</option>
              <option value="Android">Android</option>
              <option value="Data Science">Data Science</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Python">Python AI & ML</option>
              <option value="Full Stack">Full Stack</option>
            </select>
          ) : (
            <input
              ref={field === "internId" ? firstInputRef : null}
              type={["starting", "ending"].includes(field) ? "date" : "text"}
              name={field}
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
              style={inputStyle}
            />
          )}
        </div>
      ))}

      {/* Buttons */}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button
          type="button"
          onClick={() => setShowModal(false)}
          style={{ ...buttonStyle, background: "#e5e7eb", color: "#374151" }}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            background: loading ? "#2563eb" : "#3b82f6",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
            opacity: loading ? 0.8 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <span
              style={{
                display: "inline-block",
                width: "18px",
                height: "18px",
                border: "3px solid rgba(255, 255, 255, 0.6)",
                borderTop: "3px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>

    {/* Spinner animation */}
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// ---------------- Styles ----------------
const styles = {
  container: { display: "flex", fontFamily: "'Poppins', sans-serif", background: "#f8f9fa", minHeight: "100vh" },
  sidebar: { position: "fixed", top: 0, left: 0, width: "260px", height: "100%", background: "#1e293b", padding: "20px 10px", display: "flex", flexDirection: "column", transition: "left 0.3s ease", zIndex: 1000 },
  sidebarHeader: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px", position: "relative" },
  logoImage: { width: "100px", borderRadius: "8px", backgroundColor: "#fff", padding: "5px", display: "block", margin: "0 auto" },
  hamburger: { display: "none", fontSize: "1.4rem", background: "transparent", border: "none", color: "#fff", cursor: "pointer" },
  menuList: { listStyle: "none", padding: 0, flex: 1 },
  subMenuList: { listStyle: "none", paddingLeft: "16px", marginTop: "5px" },
  content: { flex: 1, marginLeft: "260px", padding: "20px", transition: "margin-left 0.3s ease" },
  card: { background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  logoImage1: { width: "250px", display: "block", margin: "50px auto" },
  goBackButton: { padding: "10px 20px", backgroundColor: "#f59e0b", borderRadius: "12px", border: "none", marginTop: "auto", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", color: "#1f2937" },
};

const tableStyle = { width: "100%", borderCollapse: "collapse", minWidth: "600px" };
const tableCellStyle = { padding: "10px", border: "1px solid #ddd", fontSize: "0.9rem" };
const responsiveButtonContainer = { display: "flex", justifyContent: "flex-end", marginBottom: "15px" };
const menuItemStyle = (active) => ({
  padding: "12px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
  color: active ? "#fff" : "#cbd5e1",
  fontWeight: active ? 600 : 500,
  background: active ? "#2563eb" : "transparent",
});
const subMenuItemStyle = (active) => ({
  padding: "10px 12px",
  borderRadius: "8px",
  marginBottom: "6px",
  color: active ? "#fff" : "#cbd5e1",
  background: active ? "#2563eb" : "transparent",
  cursor: "pointer",
});
const buttonStyle = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s ease",
};
const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "0.9rem",
  backgroundColor: "#fff",
  transition: "border-color 0.2s",
};

export default Letters;
