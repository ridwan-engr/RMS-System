import { NavLink } from "react-router-dom";

const menus = [

  {
    title: "Dashboard",
    path: "/dashboard"
  },

  {
    title: "Monitoring",
    path: "/monitoring"
  },

  {
    title: "Analytics",
    path: "/analytics"
  },

  {
    title: "Sites",
    path: "/sites"
  },

  {
    title: "Solar",
    path: "/solar"
  },

  {
    title: "Battery",
    path: "/battery"
  },

  {
    title: "Generator",
    path: "/generator"
  },

  {
    title: "Grid",
    path: "/grid"
  },

  {
    title: "Energy",
    path: "/energy"
  },

  {
    title: "Forecast",
    path: "/forecast"
  },

  {
    title: "Faults",
    path: "/faults"
  },

  {
    title: "Reports",
    path: "/reports"
  },

  //{
   // title: "Settings",
  //  path: "/settings"
 // }

];

export default function Sidebar() {

  return (

    <div
      style={{
        width: "250px",
        background: "#1f2937",
        color: "#fff",
        minHeight: "100vh"
      }}
    >

      <div
        className="text-center py-4"
      >

        <h4>

          RMS 

        </h4>

      </div>

      <ul
        className="nav flex-column"
      >

        {

          menus.map((menu) => (

            <li
              key={menu.path}
              className="nav-item"
            >

              <NavLink

                to={menu.path}

                className={({ isActive }) =>

                  `nav-link text-white ${isActive ? "bg-primary" : ""}`

                }

              >

                {menu.title}

              </NavLink>

            </li>

          ))

        }

      </ul>

    </div>

  );

}