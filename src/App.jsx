import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Makeslip from './pages/Makeslip';
import AdminLogin from './pages/AdminLogin';
import UsersTable from './pages/UsersTable';
import ProtectedRoute from './pages/ProtectRoutes';
import Dashboard from "./pages/Dashboard";
import Letters from "./pages/Letters";
import InternOfferLetter from "./pages/InternOfferLetter";
import ExperienceLetter from "./pages/ExperienceLetter";
import AddEmployee from "./pages/AddEmployee";
import SmdInternCertificateForm from "./pages/SmdInternCertificateForm";
import Quotation from "./pages/Quotation";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route 
          path="/makeslip" 
          element={
            <ProtectedRoute>
              <Makeslip />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <UsersTable />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/letters" 
          element={
            <ProtectedRoute>
              <Letters />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/internofferletters" 
          element={
            <ProtectedRoute>
              <InternOfferLetter />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/experienceletter" 
          element={
            <ProtectedRoute>
              <ExperienceLetter />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/addemployee" 
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/smdinterncertify" 
          element={
            <ProtectedRoute>
              <SmdInternCertificateForm />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/quotation" 
          element={
            <ProtectedRoute>
              <Quotation />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </Router>
  );
}

export default App;
