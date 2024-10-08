import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/home/Home"
import Login from './pages/auth/Login'
import Register from "./pages/auth/Register"
import Favorite from "./pages/user/Favorite"
import NotFoundPage from "./pages/404/404"
import Search from "./pages/recipe-search/Search"
import About from "./pages/user/About"
import Profile from "./pages/user/Profile"
import RecipeSearch from "./pages/recipe-search/Dashboard"

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
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />


        {/* User Routes */}
        {/* v1 means version 1 */}
        <Route path="/favorite" element={
          <ProtectedRoute requiredRole="user">
            <Favorite />
          </ProtectedRoute>
        } />

        <Route path="/recipes" element={
          <ProtectedRoute requiredRole="user">
            <Search />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute requiredRole="user">
            <Profile />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
