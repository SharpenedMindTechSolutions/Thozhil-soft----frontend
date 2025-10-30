import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaDownload,
  FaPlusCircle,
  FaUserPlus,
  FaArrowLeft,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/logo1.jpg"; // Your logo

const API_URL = import.meta.env.VITE_API_URL;

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentUser, setCurrentUser] = useState(null);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const [payslipForm, setPayslipForm] = useState({
    Employee_id: "",
    month: "",
    year: "",
  });

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

  const navigate = useNavigate();

  // Redirect if admin not logged in
  useEffect(() => {
    const isAdminLogged = localStorage.getItem("isAdminLoggedIn");
    if (!isAdminLogged || isAdminLogged === "true") {
      navigate("/users");
    }
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/employees`);
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        showToast("Error fetching users", "danger");
      }
    };
    fetchUsers();
  }, []);

  // Toast function
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2500);
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Employee_id") {
      setForm({ ...form, [name]: value.toUpperCase() });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Open modal
  const openModal = (mode, user = null) => {
    setModalMode(mode);
    setCurrentUser(user);
    setForm(
      user || {
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
      }
    );
    setShowModal(true);
  };

  // Add/Edit Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast({ show: false, message: "", type: "success" });

    let url = `${API_URL}/register`;
    let method = "POST";
    if (modalMode === "edit") {
      url = `${API_URL}/update_user`;
      method = "POST";
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        showToast(
          modalMode === "add"
            ? "Employee Registered Successfully ✅"
            : "Employee Updated Successfully ✅",
          "success"
        );
        setShowModal(false);

        const updatedRes = await fetch(`${API_URL}/employees`);
        const updatedData = await updatedRes.json();
        setUsers(updatedData);
      } else {
        showToast(data.message || "Error ❌", "danger");
      }
    } catch (err) {
      showToast("Backend Error ❌", "danger");
    }
  };

  // Delete user
  const confirmDelete = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/delete_user`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Employee_id: deleteUserId }),
      });
      const data = await response.json();
      showToast(data.message || data.error, "info");
      setUsers((prevUsers) => prevUsers.filter((user) => user.Employee_id !== deleteUserId));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Payslip Download
  const handlePayslipDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/download_payslip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payslipForm),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Duplicate_Payslip_for_${payslipForm.Employee_id}_${payslipForm.month}_${payslipForm.year}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        showToast("Payslip Downloaded ✅", "success");
        setShowPayslipModal(false);
      } else {
        showToast("Failed to download payslip ❌", "danger");
      }
    } catch (err) {
      console.error(err);
      showToast("Error downloading payslip ❌", "danger");
    } finally {
      setLoading(false);
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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    showToast("✅ Logged out successfully!");
    setTimeout(() => navigate("/adminlogin"), 2200);
  };

  return (
    <div className="container-fluid my-4">
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 40px",
          background: "linear-gradient(135deg, rgba(46,108,155,1) 0%, rgba(18,48,73,1) 100%)",
          color: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderRadius: "8px",
        }}
      >
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <img
            src={logo}
            alt="logo"
            className="me-3"
            style={{ width: 120, objectFit: "cover", backgroundColor: "white" , padding:"5px" , borderRadius:"2px"}}
          />
          <h4 className="m-0">Employee Management</h4>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft /> Go Back
          </button>
          {/* <button className="btn btn-success btn-sm" onClick={() => openModal("add")}>
            <FaUserPlus /> Add Employee
          </button> */}
          <button className="btn btn-warning btn-sm" onClick={() => navigate("/makeslip", { state: { users } })}>
            <FaPlusCircle /> MakeSlip
          </button>
          <button className="btn btn-info btn-sm" onClick={() => setShowPayslipModal(true)}>
            <FaDownload /> Download Payslip
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </nav>

      {/* Users Table */}
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.Employee_id || index + 1}</td>
                        <td>{user.Employee_name}</td>
                        <td>{user.Employee_email}</td>
                        <td>{user.Employee_designation || "User"}</td>
                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            <button className="btn btn-sm btn-primary" onClick={() => openModal("edit", user)}>
                              <FaEdit />
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => confirmDelete(user.Employee_id)}>
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals & Toasts */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalMode === "add" ? "New Employee Registration" : "Edit Employee"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="row g-3">
                  {fields.map(([name, label]) => (
                    <div className="col-12 col-md-4" key={name}>
                      <label className="form-label">{label}</label>
                      <input
                        type={name.includes("email") ? "email" : "text"}
                        name={name}
                        className="form-control"
                        value={form[name]}
                        onChange={(e) => {
                          if (name === "Employee_id") {
                            setForm({ ...form, [name]: e.target.value.toUpperCase() });
                          } else {
                            setForm({ ...form, [name]: e.target.value });
                          }
                        }}
                        required
                        disabled={name === "Employee_id" && modalMode === "edit"}
                        // placeholder={label}
                        style={name === "Employee_id" ? { textTransform: "uppercase" } : {}}
                      />
                    </div>
                  ))}
                  <div className="col-12 text-center mt-3">
                    <button type="submit" className="btn btn-primary px-5">
                      {modalMode === "add" ? "Register" : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content text-center p-3">
              <h5 className="mb-3">Confirm Delete</h5>
              <p>Are you sure you want to delete this employee?</p>
              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayslipModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-md modal-dialog-centered modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Download Payslip</h5>
                <button type="button" className="btn-close" onClick={() => setShowPayslipModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handlePayslipDownload} className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Employee ID</label>
                    <input
                      type="text"
                      name="Employee_id"
                      className="form-control"
                      value={payslipForm.Employee_id}
                      onChange={(e) => setPayslipForm({ ...payslipForm, Employee_id: e.target.value.toUpperCase() })}
                      required
                      style={{ textTransform: "uppercase" }}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Month</label>
                    <select
                      name="month"
                      className="form-select"
                      value={payslipForm.month}
                      onChange={(e) => setPayslipForm({ ...payslipForm, month: e.target.value })}
                      required
                    >
                      <option value="">Select Month</option>
                      {[
                        "January","February","March","April","May","June",
                        "July","August","September","October","November","December"
                      ].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Year</label>
                    <input
                      type="number"
                      name="year"
                      className="form-control"
                      placeholder="e.g., 2025"
                      value={payslipForm.year}
                      onChange={(e) => setPayslipForm({ ...payslipForm, year: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 text-center mt-3">
                    <button type="submit" className="btn btn-success px-5" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Downloading...
                        </>
                      ) : "Download"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default UsersTable;
