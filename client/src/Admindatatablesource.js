

//DEFINITION OF DATATABLE COLUMNS USERS DETAILS - MUI
export const userColumns = [
  { field: "id", headerName: "ID", width: 3 },
  {
    field: "user", headerName: "Utilisateur", width: 200,
    //AVATAR - USERNAME
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      )
    }
  },
  { field: "email", headerName: "Email", width: 210, },
  { field: "country", headerName: "Pays", width: 120 },
  { field: "city", headerName: "Ville", width: 200 },
  { field: "phone", headerName: "Téléphone", width: 170 },
];


//DEFINITION OF DATATABLE COLUMNS HOTELS DETAILS - MUI
export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Nom", width: 200, },
  { field: "type", headerName: "Type", width: 200 },
  { field: "title", headerName: "Titre", width: 200 },
  { field: "city", headerName: "Ville", width: 200 },
];


//DEFINITION OF DATATABLE COLUMNS ROOMS DETAILS - MUI
export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Titre", width: 250 },
  { field: "desc", headerName: "Description", width: 450 },
  { field: "price", headerName: "Prix", width: 100 },
  { field: "maxPeople", headerName: "Personnes max", width: 100 },
];