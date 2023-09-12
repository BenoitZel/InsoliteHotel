import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { roomInputs } from "../../AdminformSource";
import useFetch from "../../components/useFetch";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminNewRoom = () => {

  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState({});

  //USEFETCH ALL HOTELS
  const { data, loading } = useFetch("/hotels");

  const navigate = useNavigate();

  //OVERRIDE PREVIOUS INFO STATE WITH ROOM ID   
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  //POST NEW ROOM INFOS AND ROOMNUMBER
  const handleClick = async (e) => {
    e.preventDefault();
    //Split roomNumbers into a array, map this array and put this into number (Object)
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
      navigate("/admin/rooms");
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
          <h1>Ajouter une chambre</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {/* FORM WITH MAP ON INPUTS FROM ADMINFORMSOURCE */}
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
              <div className="formInput">
                <label>Numéro de la chambre : </label>
                <textarea onChange={(e) => setRooms(e.target.value)} placeholder="3" cols="30" rows="3"></textarea>
              </div>
              <div className="formInput">
                <label>Choisissez un hotel</label>
                {/* MAP ON HOTELS */}
                <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                  {loading ? "loading" : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
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

export default AdminNewRoom