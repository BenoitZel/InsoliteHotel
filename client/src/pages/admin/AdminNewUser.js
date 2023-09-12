import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userInputs } from "../../AdminformSource";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const AdminNewUser = () => {

  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  //OVERRIDE PREVIOUS INFO STATE WITH USER ID  
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  //POST IMG TO CLOUDINARY AND TAKE URL
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData()
      data.append("file", file)
      data.append("upload_preset", "upload")
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dgvf6xwzq/image/upload", data);
      const { url } = uploadRes.data
      //POST USER INFOS AND PHOTOS - REDIRECTION
      const newUser = {
        ...info,
        img: url,
      };
      await axios.post("/auth/register", newUser);
      navigate("/admin/users");
    } catch (error) {
      console.error("Une erreur s'est produite lors de la validation", errors);
      setErrors("Une erreur s'est produite lors de la validation, veuillez réessayer'");
    }
  }

  return (
    <div className="new">
      <AdminSidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Ajouter un utilisateur</h1>
        </div>

        {/* SHOW PHOTO UPLOAD OR BY DEFAULT */}
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="Pictures" />
          </div>

          {/* UPOLAD PHOTOS */}
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {/* FORM WITH MAP ON INPUTS FROM ADMINFORMSOURCE */}
              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
                </div>
              ))}
              <button onClick={handleClick}>Valider</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewUser;
