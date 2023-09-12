import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/admin/AdminHome";
import AdminList from "./pages/admin/AdminList";
import AdminNewUser from "./pages/admin/AdminNewUser";
import AdminNewHotel from "./pages/admin/AdminNewHotel";
import AdminNewRoom from "./pages/admin/AdminNewRoom";
import { AuthContext } from "./components/context/AuthContext";
import AdminEditHotel from "./pages/admin/AdminEditHotel";
import AdminEditRoom from "./pages/admin/AdminEditRoom";
import AdminEditUser from "./pages/admin/AdminEditUser";
import { hotelColumns, roomColumns, userColumns } from "./Admindatatablesource";
import Page403 from "./pages/Page403";

function App() {

  const { user } = useContext(AuthContext);

  // PROTECTED ROUTE WITH AUTH COTEXT / IF USER -> OK
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pag403" element={<Page403 />} />

        {(user === null || user.isAdmin === false) ? ("") : (
          <Route path="/admin">
            <Route index element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
            <Route path="users">
              <Route index element={<ProtectedRoute><AdminList columns={userColumns} /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><AdminNewUser /></ProtectedRoute>} />
              <Route path="edit/:id" element={<ProtectedRoute><AdminEditUser /></ProtectedRoute>} />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoute><AdminList columns={hotelColumns} /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><AdminNewHotel /></ProtectedRoute>} />
              <Route path="edit/:id" element={<ProtectedRoute><AdminEditHotel /></ProtectedRoute>} />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRoute><AdminList columns={roomColumns} /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><AdminNewRoom /></ProtectedRoute>} />
              <Route path="edit/:id" element={<ProtectedRoute><AdminEditRoom /></ProtectedRoute>} />
            </Route>
          </Route>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
