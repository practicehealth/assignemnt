import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/layout/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgetPassword from "./pages/ForgetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          {/* Public routes */}
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          {/* Protected Routes */}
          <Route
            path="dashboard"
            element={<ProtectedRoute children={<Dashboard />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
