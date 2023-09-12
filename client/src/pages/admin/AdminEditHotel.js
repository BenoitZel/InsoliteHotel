import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import useFetch from "../../components/useFetch";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const AdminEditHotel = () => {

  //USELOCATION REACT HOOK - TAKE THE URL AND SPLIT INTO AN ARRAY - TAKE ONLY INDEX 4
  const location = useLocation();
  const id = location.pathname.split("/")[4];

  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState({})
  const [errors, setErrors] = useState({});

  //USEFETCH COMPONENT - HOTEL BY ID
  const { data, loading } = useFetch(`/hotels/find/${id}`);

  const navigate = useNavigate();

  //OVERRIDE PREVIOUS INFO STATE WITH HOTEL ID   
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  //PUT SELECTED ROOMS INTO AN ARRAY AND SETROOMS
  const handleSelect = (e) => {
    try {
      const value = Array.from(e.target.selectedOptions, option => option.value)
      setRooms(value);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la selection des chambres", errors);
      setErrors("Une erreur s'est produite lors de la selection des chambres, veuillez réessayer'");
    }
  }

  //POST IMG TO CLOUDINARY AND TAKE URL
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        //Put all objects into one list
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload")
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dgvf6xwzq/image/upload", data);
          const { url } = uploadRes.data;
          return url
        }));
      //UPDATE HOTEL WITH ROOMS, INFOS AND PHOTOS - REDIRECTION
      const newhotel = { ...info, rooms, photos: list };
      await axios.put(`/hotels/${id}`, newhotel)
      navigate("/admin/hotels");
    } catch (err) {
      console.error("Une erreur s'est produite lors de la validation", errors);
      setErrors("Une erreur s'est produite lors de la validation, veuillez réessayer'");
    }
  }

  return (
    <div className="new">
      <AdminSidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Modifier un hotel</h1>
        </div>

        {/* SHOW PHOTOS UPLOAD OR BY DEFAULT */}
        <div className="bottom">
          <div className="left">
            <img
              src={files ? (URL.createObjectURL(files[0])) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="Pictures" />
          </div>

          {/* UPLOAD PHOTOS AND FORM */}
          <div className="right">
            <form>
              <div className="divInput">
                <label htmlFor="file">
                  Images : <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" multiple onChange={(e) => setFiles(e.target.files)} style={{ display: "none" }} />
              </div>
              <div onChange={handleChange} className="formInput">
                <label>Nom</label>
                <input type="text" id="name" label="Nom" placeholder={data.name} />
                <label>Type</label>
                <input type="text" id="type" label="Type" placeholder={data.type} />
                <label>Ville</label>
                <input type="text" id="city" label="Ville" placeholder={data.city} />
                <label>Adresse</label>
                <input type="text" id="address" label="Adresse" placeholder={data.address} />
                <label>Distance des commerces</label>
                <input type="text" id="distance" label="Distance des commerces" placeholder={data.distance} />
                <label>Titre de votre annonce</label>
                <input type="text" id="title" label="Titre de votre annonce" placeholder={data.title} />
                <label>Description</label>
                <input type="text" id="desc" label="Description" placeholder={data.desc} />
                <label>Prix de la chambre minimum</label>
                <input type="text" id="cheapestPrice" label="Prix de la chambre minimum" placeholder={data.cheapestPrice} />
                <label>Disponible</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>Non</option>
                  <option value={true}>Oui</option>
                </select>
              </div>

              {/* Room selection */}
              <div className="selectRooms">
                <label>Sélectionner une chambre (obligatoire)</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading ? "Chargement..." : data.rooms && data.rooms.map((roomId) => (
                    <option key={roomId} value={roomId}>
                      {roomId}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Valider</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditHotel;
