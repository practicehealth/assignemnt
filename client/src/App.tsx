import { Account } from "./components/accounts/createaccount"
import { Navbar } from "./components/navbar/navbar"
import { Home } from "./components/Home/hone"
import { Data } from "./components/data/data"
import { Routes, Route, BrowserRouter, Outlet, Navigate } from 'react-router-dom'
import { useState } from "react"
function App() {

  const [islogin, setislogin] = useState(false);

  const PrivateRoutes: React.FC = () => {

    return islogin ? (
      <>
        <Outlet />
      </>
    ) : (
      <Navigate replace to="/login" />
    );
  };

  return (
    <BrowserRouter>
      {islogin ? <Navbar /> : null}
      <Routes>

        <Route
          path="/login"
          element={<Account setislogin={setislogin} />}
        />

        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/data" element={<PrivateRoutes />}>
          <Route path="/data" element={<Data />} />
        </Route>
      </Routes>


    </BrowserRouter>
  )
}

export default App
