import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const API_URL = import.meta.env.VITE_API_URL;

function ExperienceLetter() {
  const initialForm = {
    Employee_name: "",
    Employee_id: "",
    Employee_designation: "",
    Employee_gender: "",
    Employee_date_of_joining: "",
    Employee_date_of_relieving: "",
    Employee_work_mode: "",
  };

  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const navigate = useNavigate();

  const editableFields = ["Employee_date_of_relieving", "Employee_work_mode"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Employee_id") {
      setForm({ ...form, [name]: value.toUpperCase() });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const fetchDetails = async () => {
    if (!form.Employee_id.trim()) return;
    try {
      const res = await fetch(`${API_URL}/experience_letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Employee_id: form.Employee_id }),
      });
      const data = await res.json();

      if (res.ok) {
        const normalizedData = {
          ...data,
          Employee_date_of_joining: data.Employee_date_of_joining || data.date_of_joining || "",
        };
        setForm({ ...initialForm, ...normalizedData });
        setIsFetched(true);
      } else {
        alert(data.error || "Employee not found");
        setIsFetched(false);
      }
    } catch (err) {
      console.error("Error fetching employee:", err);
      setIsFetched(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setMessage("");
    setToast({ show: false, message: "", type: "success" });
    setIsFetched(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setToast({ show: false, message: "", type: "success" });
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/experience_letter_download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("content-type") || "";

      if (res.ok && contentType.includes("application/pdf")) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${form.Employee_name || "Employee"}_Experience_Letter.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setMessage("✅ Experience Letter downloaded successfully!");
        setToast({ show: true, message: "Letter downloaded!", type: "success" });

        setTimeout(() => navigate("/letters"), 1000);
      } else {
        const data = await res.json().catch(() => ({}));
        setMessage(data.error || "Something went wrong");
        setToast({ show: true, message: data.error || "Error", type: "danger" });
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Letter Not Generated. Check all input fields.");
      setToast({ show: true, message: "Letter Not Generated", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4f8 0%, #e2e6ea 100%)",
        position: "relative",
        padding: "15px",
      }}
    >
      <div
        className="card shadow-lg border-0 w-100"
        style={{
          maxWidth: "900px",
          borderRadius: "18px",
          backgroundColor: "#ffffff",
        }}
      >
        {/* ✅ Card Header */}
        <div
          className="card-header d-flex justify-content-between align-items-center flex-wrap"
          style={{
            backgroundColor: "#004085",
            color: "white",
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
            padding: "15px 25px",
            position: "relative",
          }}
        >
          {/* Left - Go Back Button */}
          <Link
            to="/letters"
            className="btn btn-light btn-sm fw-semibold"
            style={{
              borderRadius: "8px",
              padding: "6px 12px",
              fontWeight: "600",
              color: "#004085",
            }}
          >
            ← Go Back
          </Link>

          {/* Center - Title */}
          <h5
            className="m-0 fw-bold text-white text-center flex-grow-1"
            style={{
              fontSize: "1.1rem",
              textAlign: "center",
            }}
          >
            SMD Employee’s Experience Letter Maker
          </h5>

          {/* Right - Logo */}
          <img
            src={logo}
            alt="logo"
            style={{
              width: "55px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* ✅ Card Body */}
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {[
                ["Employee_id", "Employee ID", "text", true],
                ["Employee_name", "Employee Name", "text"],
                ["Employee_designation", "Designation", "text"],
                ["Employee_gender", "Gender", "text"],
                ["Employee_date_of_joining", "Date of Joining", "text"],
                ["Employee_date_of_relieving", "Date of Relieving", "date"],
                ["Employee_work_mode", "Work Mode", "text"],
              ].map(([name, label, type, blur], idx) => (
                <div className="col-12 col-md-6" key={idx}>
                  <label className="form-label fw-semibold text-secondary">{label}</label>
                  <input
                    type={type}
                    className="form-control shadow-sm"
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    onBlur={blur ? fetchDetails : undefined}
                    required={["Employee_id", "Employee_name", "Employee_designation", "Employee_work_mode", "Employee_date_of_relieving"].includes(name)}
                    style={{
                      textTransform: name === "Employee_id" ? "uppercase" : "none",
                      borderRadius: "8px",
                      border: "1px solid #ced4da",
                      transition: "0.2s",
                    }}
                    disabled={isFetched && !editableFields.includes(name) && name !== "Employee_id"}
                  />
                </div>
              ))}
            </div>

            {message && (
              <p
                className={`text-center mt-4 fw-semibold ${
                  toast.type === "success" ? "text-success" : "text-danger"
                }`}
              >
                {message}
              </p>
            )}

            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
              <button
                type="submit"
                className="btn btn-primary px-5 py-2 fw-semibold"
                disabled={loading}
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#004085",
                  border: "none",
                  minWidth: "180px",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Generating...
                  </>
                ) : (
                  "Download Letter"
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary px-5 py-2 fw-semibold"
                onClick={handleReset}
                disabled={loading}
                style={{ borderRadius: "10px", minWidth: "180px" }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* ✅ Footer */}
        <div
          className="card-footer text-center text-muted"
          style={{
            fontSize: "14px",
            backgroundColor: "#f8f9fa",
            borderBottomLeftRadius: "18px",
            borderBottomRightRadius: "18px",
          }}
        >
          Sharpened Mind Tech & Solution Pvt Ltd
        </div>
      </div>
    </div>
  );
}

export default ExperienceLetter;

