import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from '../useFetch';
import axios from "axios";

const AdminDatatable = ({ columns }) => {

  //USELOCATION AND SPLIT URL
  const location = useLocation();
  const path = location.pathname.split("/admin/")[1]
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [errors, setErrors] = useState({});

  //USEFETCH COMPONENT - USERS HOTELS OR ROOMS
  const { data } = useFetch(`/${path}`);

  //USEFFECT REACT HOOK - ANY DATA MOVE SET LIST WITH DATA
  useEffect(() => {
    setList(data)
  }, [data])

  //FUNCTION AND AXIOS TO DELETE USER, HOTEL OR ROOM
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      //FILTER PULL ITEM._ID FROM ARRAY LIST
      setList(list.filter((item) => item._id !== id));
    } catch (errors) {
      console.error("Une erreur s'est produite lors de la suppression", errors);
      setErrors("Une erreur s'est produite lors de la suppression");
    }
  };

  //UPDATE BUTTON NAVIGATE TO EDITS PAGES
  const handleView = async (id) => {
    try {
      navigate(`/admin/${path}/edit/${id}`)
    } catch (err) {
      console.error("Une erreur s'est produite lors de la selection modification", errors);
      setErrors("Une erreur s'est produite, veuillez réessayer");
    }
  };

  //DEFINITION OF DATATABLE COLUMN ACTION BUTTONS
  const actionColumn = [
    {
      field: "action", headerName: "Action", width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleView(params.row._id)}>Modifier</div>
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}> Supprimer </div>
          </div>
        )
      }
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {/* EDIT BUTTON NAVIGATE TO NEWS PAGES */}
        <Link to={`/admin/${path}/new`} className="link">
          Ajouter
        </Link>
      </div>
      {/* Material UI DATAGRID*/}
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default AdminDatatable;
