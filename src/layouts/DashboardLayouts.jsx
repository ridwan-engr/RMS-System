import Navbar from "../components/navbar/Navbar.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";

export default function DashboardLayout({ children }) {

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >

        <Navbar />

        <main
          style={{
            padding: "25px"
          }}
        >
          {children}
        </main>

      </div>

    </div>

  );

}