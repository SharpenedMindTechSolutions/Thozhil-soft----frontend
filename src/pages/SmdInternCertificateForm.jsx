import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const API_URL = import.meta.env.VITE_API_URL;

function SmdInternCertificateForm() {
  const initialForm = {
    intern_id: "",
    intern_name: "",
    intern_course: "",
    intern_gender: "",
    intern_doj: "",
    intern_duration: "",
    intern_project: "",
    };

  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const navigate = useNavigate();

  const editableFields = ["intern_project"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "intern_id") {
      setForm({ ...form, [name]: value.toUpperCase() });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const fetchDetails = async () => {
    if (!form.intern_id.trim()) return;
    try {
        const res = await fetch(`${API_URL}/smdintern`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intern_id: form.intern_id }),
        });
        const data = await res.json();

        if (res.ok) {
        const normalizedData = {
            ...data,
            intern_doj: data.intern_doj || data.date_of_joining || data.Employee_date_of_joining || "",
        };
        setForm({ ...initialForm, ...normalizedData });
        setIsFetched(true);
        } else {
        alert(data.error || "Intern not found");
        setIsFetched(false);
        }
    } catch (err) {
        console.error("Error fetching intern:", err);
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
      const res = await fetch(`${API_URL}/smd_intern_certify_download`, {
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
        a.download = `${form.intern_name || "Intern"}_Intern_Certificate.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setMessage("✅ Intern Certificate downloaded successfully!");
        setToast({ show: true, message: "Certificate downloaded!", type: "success" });

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
            SMD Intern Certificate Maker
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
                ["intern_id", "Intern ID", "text", true],
                ["intern_name", "Intern Name", "text"],
                ["intern_gender", "Gender", "text"],
                ["intern_doj", "Date of Joining", "text"],
                ["intern_course", "Intern Course", "text"],
                ["intern_duration", "Course Duration", "text"],
                ["intern_project", "Intern Project Description", "text"], // <- we'll treat this differently
                ].map(([name, label, type, blur], idx) => (
                <div className="col-12 col-md-6" key={idx}>
                    <label className="form-label fw-semibold text-secondary">{label}</label>

                    {/* 👇 Custom condition for textarea */}
                    {name === "intern_project" ? (
                    <>
                        <textarea
                        className="form-control shadow-sm"
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        maxLength="300"
                        placeholder="Write up to 300 characters..."
                        rows="4"
                        style={{
                            borderRadius: "8px",
                            border: "1px solid #ced4da",
                            resize: "none",
                            transition: "0.2s",
                        }}
                        ></textarea>
                        <div
                        style={{
                            textAlign: "right",
                            fontSize: "12px",
                            color: form[name]?.length >= 300 ? "red" : "gray",
                        }}
                        >
                        {form[name]?.length || 0}/300 characters
                        </div>
                    </>
                    ) : (
                    <input
                        type={type}
                        className="form-control shadow-sm"
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        onBlur={blur ? fetchDetails : undefined}
                        required={["intern_id", "intern_name", "intern_gender", "intern_doj", "intern_course", "intern_duration", "intern_project"].includes(name)}
                        style={{
                        textTransform: name === "intern_id" ? "uppercase" : "none",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        transition: "0.2s",
                        }}
                        disabled={isFetched && !editableFields.includes(name) && name !== "intern_id"}
                    />
                    )}
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
                  "Download Certificate"
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

export default SmdInternCertificateForm;
