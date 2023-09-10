import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import DeleteAccount from './pages/DeleteAccount'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/forgotpwd' element={ <ForgotPassword /> } />
        <Route path='/deleteact' element={ <DeleteAccount /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
