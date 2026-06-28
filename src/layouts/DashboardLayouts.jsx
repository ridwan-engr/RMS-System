import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

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