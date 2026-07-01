import { Routes, Route, Navigate } from "react-router-dom";

import Analytics from "./pages/Analytics.jsx";
import Monitoring from "./pages/Monitoring.jsx";
import Site from "./pages/Site.jsx";
import Login from "./pages/Login.jsx";
import Solar from "./pages/Solar.jsx";
import Battery from "./pages/Battery.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EnergyRecord from "./pages/EnergyRecord.jsx";
import FaultLog from "./pages/FaultLog.jsx";

// import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>

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
        element={<Analytics />}
      />

       <Route
        path="/auth/login"
        element={<Login />}
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
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/faultsl"
        element={<FaultLog />}
      />

      <Route
        path="/energy"
        element={<EnergyRecord />}
      />

      {/* <Route path="/settings" element={<Settings />} /> */}
    </Routes>
  );
}

export default App;