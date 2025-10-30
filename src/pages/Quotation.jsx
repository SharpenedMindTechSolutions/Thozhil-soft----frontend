// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import logo from "../assets/logo.png";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const API_URL = import.meta.env.VITE_API_URL;

// function Quotation() {
//   const navigate = useNavigate();

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
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
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
//               gridTemplateColumns: "repeat(4, 1fr)",
//               gap: "20px",
//               marginBottom: "30px",
//             }}
//           >
//             {[
//               {
//                 label: "Name",
//                 name: "client_name",
//                 type: "text",
//                 placeholder: "Enter name",
//               },
//               {
//                 label: "Address",
//                 name: "client_address",
//                 type: "text",
//                 placeholder: "Enter address",
//               },
//               {
//                 label: "Email",
//                 name: "client_email",
//                 type: "email",
//                 placeholder: "Enter email",
//               },
//               {
//                 label: "Mobile",
//                 name: "client_mobile",
//                 type: "text",
//                 placeholder: "Enter mobile",
//               },
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
//                   placeholder={field.placeholder}
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
//               gridTemplateColumns: "repeat(3, 1fr)",
//               gap: "20px",
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
//                   gridTemplateColumns: "repeat(3, 1fr)",
//                   gap: "20px",
//                   marginBottom: "15px",
//                 }}
//               >
//                 <div style={{ padding: "10px", fontWeight: "600" }}>{desc}</div>
//                 <input
//                   type="number"
//                   placeholder="Quantity"
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
//               marginTop: "20px",
//             }}
//           >
//             <button
//               type="submit"
//               style={{
//                 background: "linear-gradient(135deg, #007bff, #5563DE)",
//                 color: "#fff",
//                 padding: "12px 45px",
//                 border: "none",
//                 borderRadius: "10px",
//                 fontSize: "17px",
//                 fontWeight: "600",
//                 cursor: "pointer",
//                 transition: "0.3s",
//               }}
//             >
//               Submit
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
  const [loading, setLoading] = useState(false); // ✅ Loading state

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

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1.5px solid #ccc",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#f9f9fc",
    transition: "0.3s",
    width: "100%",
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading
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
      setLoading(false); // ✅ Stop loading
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #74ABE2, #5563DE)",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          background: "#fff",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/letters")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "2px solid #007bff",
            color: "#007bff",
            borderRadius: "8px",
            padding: "6px 14px",
            fontSize: "15px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#007bff";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "none";
            e.target.style.color = "#007bff";
          }}
        >
          <FaArrowLeft /> Go Back
        </button>

        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "80px",
            borderRadius: "8px",
          }}
        />

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              margin: 0,
              color: "#2c3e50",
              fontWeight: "700",
              fontSize: "24px",
              letterSpacing: "0.5px",
            }}
          >
            SMD Website Quotation Form
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ---- Client Info ---- */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {[
              { label: "Name", name: "client_name", type: "text" },
              { label: "Address", name: "client_address", type: "text" },
              { label: "Email", name: "client_email", type: "email" },
              { label: "Mobile", name: "client_mobile", type: "text" },
            ].map((field) => (
              <div key={field.name} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "600", marginBottom: "6px", color: "#333" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  style={inputStyle}
                  required
                />
              </div>
            ))}
          </div>

          {/* ---- Item Header ---- */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "15px",
              fontWeight: "700",
              color: "#555",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            <div>Description</div>
            <div>Quantity</div>
            <div>Cost</div>
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
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  gap: "15px",
                  marginBottom: "15px",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "600" }}>{desc}</div>
                <input
                  type="number"
                  placeholder="Qty"
                  name={qty}
                  value={formData[qty]}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
                <input
                  type="number"
                  placeholder="Cost"
                  name={cost}
                  value={formData[cost]}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            );
          })}

          {/* ---- Buttons ---- */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading
                  ? "linear-gradient(135deg, #aaa, #ccc)"
                  : "linear-gradient(135deg, #007bff, #5563DE)",
                color: "#fff",
                padding: "12px 45px",
                border: "none",
                borderRadius: "10px",
                fontSize: "17px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <div
                    className="spinner"
                    style={{
                      border: "3px solid #fff",
                      borderTop: "3px solid transparent",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  Generating...
                </>
              ) : (
                "Submit"
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              style={{
                background: "#f8f9fa",
                color: "#333",
                padding: "12px 45px",
                border: "1.5px solid #ccc",
                borderRadius: "10px",
                fontSize: "17px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Reset
            </button>
          </div>
        </form>

        {/* Toast Notification */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      {/* Spinner Animation */}
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
}

export default Quotation;
