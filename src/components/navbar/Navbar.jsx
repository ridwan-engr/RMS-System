import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {

    logout();

    navigate("/");

  }

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary shadow"
    >

      <div className="container-fluid">

        <span
          className="navbar-brand fw-bold"
        >
          HEMAP Dashboard
        </span>

        <div className="ms-auto d-flex align-items-center">

          <span className="text-white me-4">

            Welcome

            <strong>

              {" "}

              {user?.name || "Engineer"}

            </strong>

          </span>

          <button
            className="btn btn-light"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );

}