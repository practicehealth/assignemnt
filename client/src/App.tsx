import Login from "./components/Login-component"
import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home-component";
import NavBar from "./components/NavBar-component";
import Signup from "./components/Signup-component";
import ForgotPassword from "./components/ForgotPassword-componenent";
import NotFound from "./components/NotFount";
import ResourceTypes from "./components/Resource-types-component";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import ProtectedRoutes from "./utils/ProtectedRoute";
import ForgetPasswordChange from "./components/ForgetPasswordChange-component";
const App: FC = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/resourcetype/:resourcetype" element={<ResourceTypes />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetpasswordtoken/:token" element={<ForgetPasswordChange />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  )
}

export default App
