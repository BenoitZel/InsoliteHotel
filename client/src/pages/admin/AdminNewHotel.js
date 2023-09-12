import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hotelInputs } from "../../AdminformSource";
import useFetch from "../../components/useFetch";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const AdminNewHotel = () => {

  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState({})
  const [errors, setErrors] = useState({});

  //USEFETCH COMPONENT - ALL ROOMS
  const { data, loading } = useFetch("/rooms");

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
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload")
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dgvf6xwzq/image/upload", data);
          const { url } = uploadRes.data;
          return url
        }));
      //POST FINAL NEW HOTEL WITH ROOMS, INFOS AND PHOTOS
      const newhotel = { ...info, rooms, photos: list };
      await axios.post("/hotels", newhotel)
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
          <h1>Ajouter un hotel</h1>
        </div>

        {/* SHOW PHOTOS UPLOAD OR BY DEFAULT */}
        <div className="bottom">
          <div className="left">
            <img
              src={files ? URL.createObjectURL(files[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="Pictures" />
          </div>

          {/* UPLOAD PHOTOS */}
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {/* FORM WITH MAP ON INPUTS FROM ADMINFORMSOURCE */}
              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              {/* FORM INPUT FEATURED */}
              <div className="formInput">
                <label>Disponible</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>Non</option>
                  <option value={true}>Oui</option>
                </select>
              </div>

              {/* ROOM SELECTION */}
              <div className="selectRooms">
                <label>Chambres</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading ? "loading" : data &&
                    data.map((room) => (
                      <option
                        key={room._id}
                        value={room._id}>{room.title}</option>
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

export default AdminNewHotel;
