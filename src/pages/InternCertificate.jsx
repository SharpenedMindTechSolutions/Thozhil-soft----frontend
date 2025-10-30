import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function InternCertificate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    intern_id: "",
    intern_name: "",
    intern_course: "",
    intern_doj: "",
    intern_duration: "",
    intern_email: "",
    stipend_amount: "",
    intern_gender: "",
    intern_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/newinterns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message || "Intern details submitted successfully!");
      setFormData({
        intern_id: "",
        intern_name: "",
        intern_course: "",
        intern_doj: "",
        intern_duration: "",
        intern_email: "",
        stipend_amount: "",
        intern_gender: "",
        intern_type: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit intern details.");
    }
    navigate("/letters");
  };

  // --- Styles ---
  const containerStyle = {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "30px 40px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    fontFamily: "'Poppins', sans-serif",
    color: "#333",
    border: "1px solid #e0e0e0",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1a73e8",
    fontWeight: "700",
    fontSize: "26px",
  };

  const formGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px 30px",
  };

  const labelStyle = { fontWeight: "500", marginBottom: "6px", color: "#555", fontSize: "14px" };
  const inputStyle = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
  };
  const selectStyle = { ...inputStyle };
  const radioLabelStyle = { display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#555" };
  const submitBtnStyle = {
    padding: "12px 0",
    backgroundColor: "#1a73e8",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    transition: "all 0.3s",
    boxShadow: "0 4px 10px rgba(26,115,232,0.3)",
    gridColumn: "1 / -1", // full width button
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Intern Details Form</h2>

      <form onSubmit={handleSubmit} style={formGrid}>
        {/* Left Column Inputs */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Intern ID</label>
          <input style={inputStyle} type="text" name="intern_id" value={formData.intern_id} onChange={handleChange} required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Intern Name</label>
          <input style={inputStyle} type="text" name="intern_name" value={formData.intern_name} onChange={handleChange} required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Course</label>
          <input style={inputStyle} type="text" name="intern_course" value={formData.intern_course} onChange={handleChange} required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Date of Joining</label>
          <input style={inputStyle} type="date" name="intern_doj" value={formData.intern_doj} onChange={handleChange} required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Duration (months)</label>
          <input style={inputStyle} type="number" name="intern_duration" value={formData.intern_duration} onChange={handleChange} required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} type="email" name="intern_email" value={formData.intern_email} onChange={handleChange} required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Stipend Amount</label>
          <input style={inputStyle} type="number" name="stipend_amount" value={formData.stipend_amount} onChange={handleChange} required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Gender</label>
          <div style={{ display: "flex", gap: "15px", marginTop: "6px" }}>
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} style={radioLabelStyle}>
                <input type="radio" name="intern_gender" value={gender} checked={formData.intern_gender === gender} onChange={handleChange} />
                {gender}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Intern Type</label>
          <select style={selectStyle} name="intern_type" value={formData.intern_type} onChange={handleChange} required>
            <option value="">--Select Type--</option>
            <option value="College Student">College Student</option>
            <option value="Employee">Employee</option>
            <option value="Career Breaker">Career Breaker</option>
          </select>
        </div>

        <button type="submit" style={submitBtnStyle}>Submit</button>
      </form>
    </div>
  );
}

export default InternCertificate;
