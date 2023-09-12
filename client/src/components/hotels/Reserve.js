import React, { useContext, useState } from 'react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from '../useFetch';
import { SearchContext } from '../context/SearchContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const modalStyle = {
  position: 'absolute',
  zIndex: 22,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Reserve = ({ setOpen, hotelId }) => {

  const [selectedRooms, setSelectedRooms] = useState([])
  const [errors, setErrors] = useState({});

  //MODAL OPEN-CLOSE
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const navigate = useNavigate();

  //USEFETCH COMPONENT - ROOMS BY HOTELID
  const { data } = useFetch(`/hotels/room/${hotelId}`);

  //USECONTEXT REACT HOOK - SEARCHCONTEXT DATES
  const { dates } = useContext(SearchContext);

  //PULL DAY BY DAY INTO DATES ARRAY FROM START TO END
  const getDatesInRange = (startDate, endDate) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const date = new Date(start.getTime());
      const dates = [];
      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }
      return dates;
    } catch (error) {
      console.error("Une erreur s'est produite lors de la selection des dates", errors);
      setErrors("Une erreur s'est produite lors de la selection des dates, veuillez réessayer'");
    }
  };

  //PULL DATES SELECTED BU USER INTO PREVIOUS FUNCTION
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  //CHECK DATES AVAILABLE
  const isAvailable = (roomNumber) => {
    try {
      const isFound = roomNumber.unavailableDates.some((date) =>
        allDates.includes(new Date(date).getTime())
      );
      return !isFound
    } catch (error) {
      console.error("Une erreur s'est produite lors de la selection des dates", errors);
      setErrors("Une erreur s'est produite lors de la selection des dates, veuillez réessayer'");
    }
  };

  //SELECTED ROOM - IF CHECKBOX IS CHECK PUT THE VALUE INTO SELECTEDROOMS ARRAY 
  //                ELSE FILTER AND PULL VALUE FROM SELECTEDROOMS ARRAY
  const handleSelect = (e) => {
    try {
      const checked = e.target.checked;
      const value = e.target.value;
      setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    } catch (error) {
      console.error("Une erreur s'est produite lors de la selection des dates", errors);
      setErrors("Une erreur s'est produite lors de la selection des dates, veuillez réessayer'");
    }
  };

  //UPDATE - SEND ALLDATES INTO AVAILABITY 
  const handleClick = async () => {
    try {
      await Promise.all(selectedRooms.map((roomId) => {
        const res = axios.put(`/rooms/availability/${roomId}`, { dates: allDates });
        return res.data;
      }));
      // OPEN MODAL AND REDIRECTION SETTIMEOUT
      setOpenModal(true);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (err) {
      console.error("Une erreur s'est produite lors de la validation", errors);
      setErrors("Une erreur s'est produite lors de la validation, veuillez réessayer'");
    }
  }

  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)} />
        <span>Selectionnez une chambre</span>
        {/* MAP ON ROOMS */}
        {data.map((item, index) => (
          <div className="rItem" key={index}>
            <div className="rInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">Maximum de personnes autorisées : <b>{item.maxPeople}</b></div>
              <div className="rPrice">Prix de la chambre par nuit : {item.price} €</div>
            </div>
            <div className="rSelectRooms">
              {/* MAP ON ROOMSNUMBERS */}
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    className=''
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">Reserver maintenant</button>
      </div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Votre résérvation a bien été prise en compte !
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Le propriétaire du logement vous recontactera trés prochainement.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Reserve;
