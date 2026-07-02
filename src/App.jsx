import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Monitoring from "./pages/Monitoring.jsx";
import Analytics from "./pages/Analytics.jsx";
import Site from "./pages/Site.jsx";
import Solar from "./pages/Solar.jsx";
import Battery from "./pages/Battery.jsx";
import EnergyRecord from "./pages/EnergyRecord.jsx";
import FaultLog from "./pages/FaultLog.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/monitoring" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/monitoring"
        element={<Monitoring />}
      />

      <Route
        path="/analytics"
        element={<Analytics />}
      />

      <Route
        path="/sites"
        element={<Site />}
      />

      <Route
        path="/solar"
        element={<Solar />}
      />

      <Route
        path="/battery"
        element={<Battery />}
      />

      <Route
        path="/faults"
        element={<FaultLog />}
      />

      <Route
        path="/energy"
        element={<EnergyRecord />}
      />

      <Route
        path="*"
        element={<Navigate to="/monitoring" replace />}
      />

    </Routes>
  );
}

export default App;