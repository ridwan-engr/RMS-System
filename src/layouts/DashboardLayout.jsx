import Navbar from "../components/navbar/Navbar.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";

export default function DashboardLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f6f9"
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Top Navigation */}
        <Navbar />

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto"
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}