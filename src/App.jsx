import { Routes, Route, Navigate } from "react-router-dom";

import Analytics from "./pages/Analytics.jsx";
import Monitoring from "./pages/Monitoring.jsx";
// import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/monitoring" replace />} />

      <Route
        path="/monitoring"
        element={<Monitoring />}
      />

      <Route
        path="/analytics"
        element={<Analytics />}
      />

      {/* <Route path="/settings" element={<Settings />} /> */}
    </Routes>
  );
}

export default App;