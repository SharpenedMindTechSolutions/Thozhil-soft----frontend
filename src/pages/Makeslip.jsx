import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import logo from "../assets/logo.png";

function Makeslip() {
  const initialForm = {
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
    Employee_days_of_working: "",
    Employee_lc_pm: "",
    Employee_slc_pre_month: "",
    Employee_payslip_month: "",
    Employee_std_basic_salary: "",
    Employee_e_basic_salary: "",
    Employee_std_hra: "",
    Employee_e_hra: "",
    Employee_std_holiday: "",
    Employee_e_holiday: "",
    Employee_std_engagement_pay: "",
    Employee_e_engagement_pay: "",
    Employee_std_other: "",
    Employee_e_statutory: "",
    Employee_e_medical: "",
  };

  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  // Updated handleChange to automatically uppercase Employee_id
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Employee_id") {
      setForm({ ...form, [name]: value.toUpperCase() });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const fetchDetails = async () => {
    if (!form.Employee_id) return;
    try {
      const res = await fetch(`${API_URL}/emp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Employee_id: form.Employee_id }),
      });
      const data = await res.json();
      if (res.ok) setForm({ ...initialForm, ...data });
      else alert(data.error || "Employee not found");
    } catch (err) {
      console.error("Error fetching employee:", err);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setMessage("");
    setToast({ show: false, message: "", type: "success" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setToast({ show: false, message: "", type: "success" });
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/store`, {
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
        a.download = `${form.Employee_name || "Employee"}_${date}_${time}_Payslip.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setMessage("Payslip generated and downloaded successfully");
        setToast({ show: true, message: "Payslip downloaded!", type: "success" });

        setTimeout(() => navigate("/users"), 1000);
      } else {
        const data = await res.json().catch(() => ({}));
        setMessage(data.error || "Something went wrong");
        setToast({ show: true, message: data.error || "Error", type: "danger" });
        navigate("/makeslip");
      }
    } catch (err) {
      console.error(err);
      setMessage("Payslip Not Generated. Check all input fields.");
      setToast({ show: true, message: "Payslip Not Generated", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid my-4 px-3">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-3 p-md-4">
              {/* Header */}
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                <Link to="/users" className="btn btn-outline-primary btn-sm">
                  ← Go Back
                </Link>
                <img
                  src={logo}
                  alt="logo"
                  className="img-fluid rounded-circle"
                  style={{ width: "80px", height: "87px", objectFit: "cover" }}
                />
              </div>

              <h4 className="text-center mb-4 text-primary fw-bold">
                SMD PAYSLIP GENERATOR
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="row gy-3">
                  {/* LEFT SIDE */}
                  <div className="col-12 col-md-6">
                    <div className="row gy-3">
                      {[
                        ["Employee_id", "Employee ID", "text", true],
                        ["Employee_name", "Name", "text"],
                        ["Employee_email", "Email", "email"],
                        ["Employee_designation", "Designation", "text"],
                        ["Employee_gender", "Gender", "text"],
                        ["Employee_date_of_joining", "Date of Joining", "text"],
                        ["Employee_pan_no", "PAN Number", "text"],
                        ["Employee_uan_no", "UAN Number", "text"],
                        ["Employee_pf_pension_no", "PF / Pension Number", "text"],
                        ["Employee_bank_name", "Bank Name", "text"],
                        ["Employee_account_no", "Account Number", "text"],
                        ["Employee_ifsc_code", "IFSC Code", "text"],
                        ["Employee_bank_location", "Bank Location", "text"],
                        ["Employee_department", "Department", "text"],
                        ["Employee_band", "Band", "text"],
                      ].map(([name, label, type, blur], idx) => (
                        <div className="col-12 col-md-6" key={idx}>
                          <label className="form-label">{label}</label>
                          <input
                            type={type}
                            className="form-control"
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            onBlur={blur ? fetchDetails : undefined}
                            required={name === "Employee_id"}
                            style={name === "Employee_id" ? { textTransform: "uppercase" } : {}}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="col-12 col-md-6">
                    <div className="row gy-3">
                      <div className="col-12">
                        <label className="form-label">Days of Working</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Employee_days_of_working"
                          value={form.Employee_days_of_working}
                          onChange={handleChange}
                          placeholder="Enter number"
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">LWP / Previous Month</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Employee_lc_pm"
                          value={form.Employee_lc_pm}
                          onChange={handleChange}
                          placeholder="Enter number"
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">
                          Sabbatical Leave Current/Previous Month
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="Employee_slc_pre_month"
                          value={form.Employee_slc_pre_month}
                          onChange={handleChange}
                          placeholder="Enter number"
                        />
                      </div>

                      {/* Payslip Month Dropdown */}
                      <div className="col-12 col-md-6">
                        <label className="form-label">Payslip Month</label>
                        <select
                          name="Employee_payslip_month"
                          className="form-select"
                          value={form.Employee_payslip_month || ""}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Month</option>
                          {[
                            "January","February","March","April","May","June",
                            "July","August","September","October","November","December"
                          ].map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>

                      {/* Salary Details */}
                      <label className="form-label text-center fw-bold mt-4">SALARY DETAILS</label>

                      {[
                        ["Employee_std_basic_salary", "Standard Basic Salary"],
                        ["Employee_e_basic_salary", "Earning Basic Salary"],
                        ["Employee_std_hra", "Standard HRA"],
                        ["Employee_e_hra", "Earning HRA"],
                        ["Employee_std_holiday", "Standard Holiday Allowance"],
                        ["Employee_e_holiday", "Earning Holiday Allowance"],
                        ["Employee_std_engagement_pay", "Standard Engagement Pay"],
                        ["Employee_e_engagement_pay", "Earning Engagement Pay"],
                        ["Employee_std_other", "Standard Other Allowance"],
                        ["Employee_e_statutory", "Earning Statutory Bonus"],
                        ["Employee_e_medical", "Medical Premium Payable"],
                      ].map(([name, label], idx) => (
                        <div
                          key={idx}
                          className={`${idx === 10 ? "col-12" : "col-12 col-md-6"}`}
                        >
                          <label className="form-label">{label}</label>
                          <input
                            type="text"
                            className="form-control"
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            placeholder="Enter number"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Toast message */}
                {message && (
                  <p
                    className={`text-center mt-3 fw-semibold ${
                      toast.type === "success" ? "text-success" : "text-danger"
                    }`}
                  >
                    {message}
                  </p>
                )}

                {/* Buttons */}
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary flex-fill d-flex justify-content-center align-items-center"
                    disabled={loading}
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
                      "Generate Payslip"
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Makeslip;




