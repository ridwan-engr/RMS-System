import { Routes, Route, Navigate } from "react-router-dom";

import Monitoring from "./pages/Monitoring.jsx";
import Analytics from "./pages/Analytics.jsx";
;

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/monitoring" replace />}
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
        path="*"
        element={<Navigate to="/monitoring" replace />}
      />

    </Routes>
  );
}

export default App;