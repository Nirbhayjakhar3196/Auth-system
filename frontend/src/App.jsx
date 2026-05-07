import {BrowserRouter, Routes , Route} from "react-router-dom"

import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetFunction from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div >
      
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot" element={<ForgotPassword/>} />
          <Route path="/reset/:token" element={<ResetFunction/>} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
            } />

        </Routes>

      
      </BrowserRouter>

    </div>
  );
}

export default App;
