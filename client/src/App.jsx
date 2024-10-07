import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/home/Home"
import Login from './pages/auth/Login'
import Register from "./pages/auth/Register"
import Favorite from "./pages/user/Favorite"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* General route : Anyone can access this page */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/" element={<Home />} />


        {/* User Routes */}
        {/* v1 means version 1 */}
        <Route path="/v1/user/favorite" element={ 
          <ProtectedRoute requiredRole="user">
            <Favorite />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
