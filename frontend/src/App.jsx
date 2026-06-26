import {BrowserRouter, Routes , Route} from "react-router-dom"

import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetFunction from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <div >
      
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot" element={<ForgotPassword/>} />
          <Route path="/reset/:token" element={<ResetFunction/>} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
            } />
          <Route path="/admin" element={
            <AdminRoute>
              <Admin/>
            </AdminRoute>
          } />

        </Routes>

      
      </BrowserRouter>

    </div>
  );
}

export default App;
