import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminDatatable from "../../components/admin/AdminDatatable"

const AdminList = ({ columns }) => {

  return (

    <div className="list">
      <AdminSidebar />
      <div className="listContainer">
        {/* PROPS COLUMN <- FROM APP <-  FROM DATATABLESOURCE (USERCOLUMN, HOTELCOLUMN, ROOMCOLUMN) */}
        <AdminDatatable columns={columns} />
      </div>
    </div>
  )
}

export default AdminList