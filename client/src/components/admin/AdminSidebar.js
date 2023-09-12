import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminSidebar = () => {

  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Retour sur <br /> InsoliteHotel </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* USERS BUTTON ACCESS CONDITION TO SUPERADMIN */}
          {(user.isSuperAdmin === false) ? ("") : (
            <Link to="/admin/users" style={{ textDecoration: "none" }}>
              <li>
                <button className="headerButton">
                  <PersonOutlineIcon className="icon" />
                  Utilisateurs
                </button>
              </li>
            </Link>
          )}
          {/* HOTELS BUTTON ACCESS */}
          <Link to="/admin/hotels" style={{ textDecoration: "none" }}>
            <li>
              <button className="headerButton">
                <StoreIcon className="icon" />
                Hotels
              </button>
            </li>
          </Link>
          {/* ROOMS BUTTON ACCESS */}
          <Link to="/admin/rooms" style={{ textDecoration: "none" }}>
            <li>
              <button className="headerButton">
                <RoomServiceIcon className="icon" />
                Chambres
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
