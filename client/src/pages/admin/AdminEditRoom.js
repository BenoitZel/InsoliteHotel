import AdminSidebar from "../../components/admin/AdminSidebar";
import { useState } from "react";
import useFetch from "../../components/useFetch";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AdminEditRoom = () => {

    //USELOCATION REACT HOOK - TAKE THE URL AND SPLIT INTO AN ARRAY - TAKE ONLY INDEX 4
    const location = useLocation();
    const id = location.pathname.split("/")[4];

    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const [errors, setErrors] = useState({});

    //USEFETCH COMPONENT - ROOM BY ID
    const { data } = useFetch(`/rooms/${id}`);

    const navigate = useNavigate();

    //OVERRIDE PREVIOUS INFO STATE WITH ROOM ID   
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    //UPDATE ROOM INFOS - REDIRECTION
    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumber = { number: rooms };
        try {
            await axios.put(`/rooms/${id}`, { ...info, roomNumber });
            navigate("/admin/rooms");
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
                    <h1>Modifier une chambre</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {/* FORM INPUTS */}
                            <div onChange={handleChange} className="formInput">
                                <label>Titre</label>
                                <input type="text" id="title" label="Titre" placeholder={data.title} />
                                <label>Description</label>
                                <input type="text" id="desc" label="Description" placeholder={data.desc} />
                                <label>Prix</label>
                                <input type="text" id="price" label="Prix" placeholder={data.price} />
                                <label>Personnes max</label>
                                <input type="text" id="maxPeople" label="Personnes max" placeholder={data.maxPeople} />
                            </div>
                            <div className="formInput">
                                <label>Numéro de la chambre (obligatoire)</label>
                                <textarea onChange={(e) => setRooms(e.target.value)} placeholder={data.roomnumbers} cols="30" rows="3"></textarea>
                            </div>
                            <button onClick={handleClick}>Valider</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEditRoom