import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useFetch from "../../components/useFetch";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const AdminEditUser = () => {

    //USELOCATION REACT HOOK - TAKE THE URL AND SPLIT INTO AN ARRAY - TAKE ONLY INDEX 4
    const location = useLocation();
    const id = location.pathname.split("/")[4];

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const [errors, setErrors] = useState({});

    //USEFETCH COMPONENT - USER BY ID
    const { data } = useFetch(`/users/${id}`);

    const navigate = useNavigate();

    //USEEFFECT REACT HOOK - SETINFOS IF DATA CHANGE
    useEffect(() => {
        if (data) {
            setInfo({
                username: data.username,
                email: data.email,
                city: data.city,
                country: data.country,
                phone: data.phone,
            });
        }
    }, [data]);

    //OVERRIDE PREVIOUS INFO STATE WITH USER ID  
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    //UPDATE IMG TO CLOUDINARY AND TAKE URL
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dgvf6xwzq/image/upload", data);
            const { url } = uploadRes.data;
            //UPDATE USER INFOS AND PHOTOS - REDIRECTION
            const updatedUser = {
                ...data,
                img: url,
            };
            await axios.put(`/users/${id}`, updatedUser); // Utilisez la bonne URL pour mettre à jour l'utilisateur
            navigate("/admin/users");
        } catch (error) {
            console.error("Une erreur s'est produite lors de la validation", errors);
            setErrors("Une erreur s'est produite lors de la validation, veuillez réessayer'");
        }
    };

    return (
        <div className="new">
            <AdminSidebar />
            <div className="newContainer">
                <div className="top">
                    <h1>Modifier un utilisateur</h1>
                </div>

                {/* SHOW PHOTOS UPLOAD OR BY DEFAULT */}
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

                            {/* FORM INPUTS */}
                            <div onChange={handleChange} className="formInput">
                                <label>Nom</label>
                                <input type="text" id="username" label="Titre" placeholder={info.username} />
                                <label>Email</label>
                                <input type="text" id="email" label="Email" placeholder={info.email} />
                                <label>Ville</label>
                                <input type="text" id="city" label="Ville" placeholder={info.city} />
                                <label>Pays</label>
                                <input type="text" id="country" label="Pays" placeholder={info.country} />
                                <label>Téléphone</label>
                                <input type="text" id="phone" label="Téléphone" placeholder={info.phone} />
                            </div>
                            <button onClick={handleClick}>Valider</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEditUser;
