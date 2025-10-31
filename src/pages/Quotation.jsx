// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import logo from "../assets/logo.png";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const API_URL = import.meta.env.VITE_API_URL;

// function Quotation() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false); // ✅ Loading state

//   const [formData, setFormData] = useState({
//     client_name: "",
//     client_address: "",
//     client_email: "",
//     client_mobile: "",
//     quantity1: "",
//     cost1: "",
//     quantity2: "",
//     cost2: "",
//     quantity3: "",
//     cost3: "",
//     quantity4: "",
//     cost4: "",
//     quantity5: "",
//     cost5: "",
//   });

//   const inputStyle = {
//     padding: "10px 12px",
//     borderRadius: "8px",
//     border: "1.5px solid #ccc",
//     fontSize: "14px",
//     outline: "none",
//     backgroundColor: "#f9f9fc",
//     transition: "0.3s",
//     width: "100%",
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // ✅ Start loading
//     try {
//       const response = await fetch(`${API_URL}/quotation_api`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error("Failed to generate PDF");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${formData.client_name}_website_quotation.pdf`;
//       link.click();
//       window.URL.revokeObjectURL(url);

//       toast.success("✅ PDF generated successfully!");
//       handleReset();
//       navigate("/letters");
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Error generating PDF");
//     } finally {
//       setLoading(false); // ✅ Stop loading
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       client_name: "",
//       client_address: "",
//       client_email: "",
//       client_mobile: "",
//       quantity1: "",
//       cost1: "",
//       quantity2: "",
//       cost2: "",
//       quantity3: "",
//       cost3: "",
//       quantity4: "",
//       cost4: "",
//       quantity5: "",
//       cost5: "",
//     });
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #74ABE2, #5563DE)",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           maxWidth: "1100px",
//           background: "#fff",
//           padding: "35px",
//           borderRadius: "16px",
//           boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
//         }}
//       >
//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/letters")}
//           style={{
//             position: "absolute",
//             top: "20px",
//             left: "20px",
//             display: "flex",
//             alignItems: "center",
//             gap: "6px",
//             background: "none",
//             border: "2px solid #007bff",
//             color: "#007bff",
//             borderRadius: "8px",
//             padding: "6px 14px",
//             fontSize: "15px",
//             cursor: "pointer",
//             fontWeight: "600",
//             transition: "0.3s",
//           }}
//           onMouseOver={(e) => {
//             e.target.style.background = "#007bff";
//             e.target.style.color = "#fff";
//           }}
//           onMouseOut={(e) => {
//             e.target.style.background = "none";
//             e.target.style.color = "#007bff";
//           }}
//         >
//           <FaArrowLeft /> Go Back
//         </button>

//         {/* Logo */}
//         <img
//           src={logo}
//           alt="Logo"
//           style={{
//             position: "absolute",
//             top: "20px",
//             right: "20px",
//             width: "80px",
//             borderRadius: "8px",
//           }}
//         />

//         <div style={{ textAlign: "center", marginBottom: "30px" }}>
//           <h2
//             style={{
//               margin: 0,
//               color: "#2c3e50",
//               fontWeight: "700",
//               fontSize: "24px",
//               letterSpacing: "0.5px",
//             }}
//           >
//             SMD Website Quotation Form
//           </h2>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* ---- Client Info ---- */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//               gap: "20px",
//               marginBottom: "30px",
//             }}
//           >
//             {[
//               { label: "Name", name: "client_name", type: "text" },
//               { label: "Address", name: "client_address", type: "text" },
//               { label: "Email", name: "client_email", type: "email" },
//               { label: "Mobile", name: "client_mobile", type: "text" },
//             ].map((field) => (
//               <div key={field.name} style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ fontWeight: "600", marginBottom: "6px", color: "#333" }}>
//                   {field.label}
//                 </label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field.label.toLowerCase()}`}
//                   style={inputStyle}
//                   required
//                 />
//               </div>
//             ))}
//           </div>

//           {/* ---- Item Header ---- */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "2fr 1fr 1fr",
//               gap: "15px",
//               fontWeight: "700",
//               color: "#555",
//               marginBottom: "10px",
//               textAlign: "center",
//             }}
//           >
//             <div>Description</div>
//             <div>Quantity</div>
//             <div>Cost</div>
//           </div>

//           {/* ---- Items ---- */}
//           {[
//             "Web Application Design & Setup",
//             "Web Application Backend",
//             "Virtual Private Server Deployment Cost",
//             "Hostinger Charge and Email Charge",
//             "SEO Cost",
//           ].map((desc, i) => {
//             const qty = `quantity${i + 1}`;
//             const cost = `cost${i + 1}`;
//             return (
//               <div
//                 key={i}
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "2fr 1fr 1fr",
//                   gap: "15px",
//                   marginBottom: "15px",
//                   alignItems: "center",
//                 }}
//               >
//                 <div style={{ fontWeight: "600" }}>{desc}</div>
//                 <input
//                   type="number"
//                   placeholder="Qty"
//                   name={qty}
//                   value={formData[qty]}
//                   onChange={handleChange}
//                   style={inputStyle}
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Cost"
//                   name={cost}
//                   value={formData[cost]}
//                   onChange={handleChange}
//                   style={inputStyle}
//                   required
//                 />
//               </div>
//             );
//           })}

//           {/* ---- Buttons ---- */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "20px",
//               marginTop: "30px",
//             }}
//           >
//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 background: loading
//                   ? "linear-gradient(135deg, #aaa, #ccc)"
//                   : "linear-gradient(135deg, #007bff, #5563DE)",
//                 color: "#fff",
//                 padding: "12px 45px",
//                 border: "none",
//                 borderRadius: "10px",
//                 fontSize: "17px",
//                 fontWeight: "600",
//                 cursor: loading ? "not-allowed" : "pointer",
//                 transition: "0.3s",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "8px",
//               }}
//             >
//               {loading ? (
//                 <>
//                   <div
//                     className="spinner"
//                     style={{
//                       border: "3px solid #fff",
//                       borderTop: "3px solid transparent",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       animation: "spin 1s linear infinite",
//                     }}
//                   ></div>
//                   Generating...
//                 </>
//               ) : (
//                 "Submit"
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={handleReset}
//               style={{
//                 background: "#f8f9fa",
//                 color: "#333",
//                 padding: "12px 45px",
//                 border: "1.5px solid #ccc",
//                 borderRadius: "10px",
//                 fontSize: "17px",
//                 fontWeight: "600",
//                 cursor: "pointer",
//                 transition: "0.3s",
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         </form>

//         {/* Toast Notification */}
//         <ToastContainer position="top-right" autoClose={3000} />
//       </div>

//       {/* Spinner Animation */}
//       <style>
//         {`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}
//       </style>
//     </div>
//   );
// }

// export default Quotation;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

function Quotation() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    client_name: "",
    client_address: "",
    client_email: "",
    client_mobile: "",
    quantity1: "",
    cost1: "",
    quantity2: "",
    cost2: "",
    quantity3: "",
    cost3: "",
    quantity4: "",
    cost4: "",
    quantity5: "",
    cost5: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/quotation_api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${formData.client_name}_website_quotation.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success("✅ PDF generated successfully!");
      handleReset();
      navigate("/letters");
    } catch (err) {
      console.error(err);
      toast.error("❌ Error generating PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      client_name: "",
      client_address: "",
      client_email: "",
      client_mobile: "",
      quantity1: "",
      cost1: "",
      quantity2: "",
      cost2: "",
      quantity3: "",
      cost3: "",
      quantity4: "",
      cost4: "",
      quantity5: "",
      cost5: "",
    });
  };

  return (
    <div className="main">
      <div className="card">
        {/* Back Button */}
        <button onClick={() => navigate("/letters")} className="back-btn">
          <FaArrowLeft /> Go Back
        </button>

        {/* Logo */}
        <img src={logo} alt="Logo" className="logo" />

        <h2 className="title">SMD Website Quotation Form</h2>

        <form onSubmit={handleSubmit}>
          {/* ---- Client Info ---- */}
          <div className="client-info">
            {[
              { label: "Name", name: "client_name", type: "text" },
              { label: "Address", name: "client_address", type: "text" },
              { label: "Email", name: "client_email", type: "email" },
              { label: "Mobile", name: "client_mobile", type: "text" },
            ].map((field) => (
              <div key={field.name} className="input-box">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required
                />
              </div>
            ))}
          </div>

          {/* ---- Table Header ---- */}
          <div className="table-header">
            <span>Description</span>
            <span>Quantity</span>
            <span>Cost</span>
          </div>

          {/* ---- Items ---- */}
          {[
            "Web Application Design & Setup",
            "Web Application Backend",
            "Virtual Private Server Deployment Cost",
            "Hostinger Charge and Email Charge",
            "SEO Cost",
          ].map((desc, i) => {
            const qty = `quantity${i + 1}`;
            const cost = `cost${i + 1}`;
            return (
              <div key={i} className="item-row">
                <div className="desc">{desc}</div>
                <input
                  type="number"
                  placeholder="Qty"
                  name={qty}
                  value={formData[qty]}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  placeholder="Cost"
                  name={cost}
                  value={formData[cost]}
                  onChange={handleChange}
                  required
                />
              </div>
            );
          })}

          {/* ---- Buttons ---- */}
          <div className="btn-box">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <div className="spinner"></div> Generating...
                </>
              ) : (
                "Submit"
              )}
            </button>

            <button type="button" onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      {/* Responsive CSS */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .main {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: linear-gradient(135deg, #74ABE2, #5563DE);
        }

        .card {
          background: #fff;
          width: 100%;
          max-width: 900px;
          border-radius: 14px;
          padding: 30px 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          position: relative;
        }

        .title {
          text-align: center;
          color: #2c3e50;
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 60px;
          margin-bottom: 25px;
        }

        .logo {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 70px;
          border-radius: 8px;
        }

        .back-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 2px solid #007bff;
          color: #007bff;
          background: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
        }
        .back-btn:hover {
          background: #007bff;
          color: #fff;
        }

        .client-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-bottom: 30px;
        }

        .input-box {
          display: flex;
          flex-direction: column;
        }
        .input-box label {
          font-weight: 600;
          margin-bottom: 5px;
          color: #333;
        }
        .input-box input {
          padding: 10px;
          border: 1.5px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
          background: #f9f9fc;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          text-align: center;
          font-weight: 700;
          color: #555;
          margin-bottom: 10px;
        }

        .item-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .item-row .desc {
          font-weight: 600;
          color: #222;
        }
        .item-row input {
          padding: 8px;
          border: 1.5px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
          width: 100%;
        }

        .btn-box {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 25px;
        }

        .submit-btn, .reset-btn {
          padding: 12px 35px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .submit-btn {
          background: linear-gradient(135deg, #007bff, #5563DE);
          color: #fff;
          border: none;
        }
        .submit-btn:disabled {
          background: linear-gradient(135deg, #aaa, #ccc);
          cursor: not-allowed;
        }
        .reset-btn {
          background: #f8f9fa;
          color: #333;
          border: 1.5px solid #ccc;
        }

        .spinner {
          border: 3px solid #fff;
          border-top: 3px solid transparent;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* ✅ RESPONSIVE FIXES */
        @media (max-width: 768px) {
          .logo {
            position: static;
            display: block;
            margin: 0 auto 10px;
          }

          .back-btn {
            position: static;
            margin-bottom: 10px;
          }

          .title {
            margin-top: 10px;
            font-size: 1.3rem;
          }

          .table-header, .item-row {
            grid-template-columns: 1fr 1fr;
          }
          .desc {
            grid-column: span 2;
            text-align: center;
            font-size: 14px;
            margin-bottom: 5px;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 20px 15px;
          }
          .title {
            font-size: 1.2rem;
          }
          .submit-btn, .reset-btn {
            width: 100%;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default Quotation;
