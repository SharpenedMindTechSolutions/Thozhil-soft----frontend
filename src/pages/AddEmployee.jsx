import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.jpg";
import { FaArrowLeft } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function AddEmployee() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 2500);
  };

  const [form, setForm] = useState({
    Employee_name: "",
    Employee_id: "",
    Employee_email: "",
    Employee_designation: "",
    Employee_gender: "",
    Employee_date_of_joining: "",
    Employee_pan_no: "",
    Employee_uan_no: "",
    Employee_pf_pension_no: "",
    Employee_bank_name: "",
    Employee_account_no: "",
    Employee_ifsc_code: "",
    Employee_bank_location: "",
    Employee_department: "",
    Employee_band: "",
    Employee_std_basic_salary: "",
    Employee_std_hra: "",
    Employee_std_holiday: "",
    Employee_std_engagement_pay: "",
    Employee_std_other: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "Employee_id" ? value.toUpperCase() : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Employee Registered Successfully ✅", "success");
        setTimeout(() => navigate("/users"), 2000);
      } else {
        showToast(data.message || "Error ❌", "danger");
      }
    } catch (error) {
      showToast("Backend Error ❌", "danger");
    }
  };

  const fields = [
    ["Employee_name", "Full Name"],
    ["Employee_id", "Employee ID"],
    ["Employee_email", "Email"],
    ["Employee_designation", "Designation"],
    ["Employee_gender", "Gender"],
    ["Employee_date_of_joining", "Date of Joining"],
    ["Employee_pan_no", "PAN No"],
    ["Employee_uan_no", "UAN No"],
    ["Employee_pf_pension_no", "PF / Pension No"],
    ["Employee_bank_name", "Bank Name"],
    ["Employee_account_no", "Account No"],
    ["Employee_ifsc_code", "IFSC Code"],
    ["Employee_bank_location", "Bank Location"],
    ["Employee_department", "Department"],
    ["Employee_band", "Band"],
    ["Employee_std_basic_salary", "Standard Basic Salary"],
    ["Employee_std_hra", "HRA"],
    ["Employee_std_holiday", "Holiday Allowance"],
    ["Employee_std_engagement_pay", "Engagement Pay"],
    ["Employee_std_other", "Other Allowance"],
  ];

  return (
    <div className="container my-4">
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgba(46,108,155,1) 0%, rgba(18,48,73,1) 100%)",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "100px",
              objectFit: "cover",
              backgroundColor: "white",
              borderRadius: "2px",
              padding: "4px",
            }}
          />
          <h5 className="m-0">Add New Employee</h5>
        </div>
        <button
          className="btn btn-light btn-sm"
          onClick={() => navigate("/dashboard")}
        >
          <FaArrowLeft /> Go Back
        </button>
      </nav>

      <div className="card shadow mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            {fields.map(([name, label]) => (
              <div className="col-12 col-md-4" key={name}>
                <label className="form-label">{label}</label>
                <input
                  type={
                    name.includes("email")
                      ? "email"
                      : name.includes("date")
                      ? "date"
                      : "text"
                  }
                  name={name}
                  className="form-control"
                  value={form[name]}
                  onChange={handleChange}
                  required
                  style={
                    name === "Employee_id"
                      ? { textTransform: "uppercase" }
                      : {}
                  }
                />
              </div>
            ))}
            <div className="col-12 text-center mt-3">
              <button type="submit" className="btn btn-primary px-5">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      {toast.show && (
        <div
          className={`toast align-items-center text-bg-${toast.type} border-0 position-fixed top-0 end-0 m-3 show`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ zIndex: 2000 }}
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
    </div>
  );
}

export default AddEmployee;
