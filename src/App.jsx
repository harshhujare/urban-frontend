import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Home/Navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import HostDashboard from "./pages/Host/HostDashboard";
import AddPropertyPage from "./pages/Host/AddPropertyPage";
import PropertyDetailPage from "./pages/Properties/PropertyDetailPage";
import AccountPage from "./pages/Account/AccountPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import BottomNav from "./components/Navigation/BottomNav";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <div className="pb-16 md:pb-0">
            <Navbar />
            <Routes>
              {/* Home Page - Shows all properties (minimalist, no Hero banner) */}
              <Route path="/" element={<HomePage />} />

              {/* Property Detail Page */}
              <Route path="/property/:id" element={<PropertyDetailPage />} />

              {/* Host Dashboard - Protected */}
              <Route
                path="/host/dashboard"
                element={
                  <ProtectedRoute>
                    <HostDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Add Property - Multi-step form - Protected */}
              <Route
                path="/host/dashboard/add-property"
                element={
                  <ProtectedRoute>
                    <AddPropertyPage />
                  </ProtectedRoute>
                }
              />

              {/* Account Settings Page - Protected */}
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                }
              />
            </Routes>

            {/* Mobile Bottom Navigation */}
            <BottomNav />
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
