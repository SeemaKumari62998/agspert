import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./Context/FakeAuthContext";
import Login from "../src/Login";
import ProtectedRoute from "../Ui/ProtectedRoute";
import MainTab from "../Ui/MainTab";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <MainTab />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
