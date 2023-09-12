import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../components/useFetch';
import { SearchContext } from '../components/context/SearchContext';
import { AuthContext } from '../components/context/AuthContext';
import NavBar from '../components/header/NavBar';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Reserve from '../components/hotels/Reserve';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Hotel = () => {

    //USELOCATION REACT HOOK - TAKE THE URL AND SPLIT INTO AN ARRAY - TAKE ONLY INDEX 2
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    //SLIDER STATES
    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)

    //MODAL STATE
    const [openModal, setOpenModal] = useState(false)

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //USEFETCH COMPONENT - HOTEL BY ID
    const { data, loading } = useFetch(`/hotels/find/${id}`);

    //USECONTEXT REACT HOOK - SEARCHCONTEXT - DATES AND OPTIONS
    const { dates, options } = useContext(SearchContext);
    //USECONTEXT REACT HOOK - AUTHCONTEXT - USER DATA
    const { user } = useContext(AuthContext);

    //SUBSTRACTION FROM END DAY TO START DAY 
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    //PULL DATES SELECTED BU USER INTO PREVIOUS FUNCTION
    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    //OPEN AND INITIALIZE SLIDER
    const handleOpen = (i) => {
        try {
            setSlideNumber(i);
            setOpen(true);
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'ouverture du slide", errors);
            setErrors("Une erreur s'est produite lors de l'ouverture du slide, veuillez réessayer'");
        }
    };

    //SLIDER FUNCTION TO SLIDE
    const handleMove = (direction) => {
        try {
            let newSlideNumber;
            if (direction === "l") {
                newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
            } else {
                newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
            }
            setSlideNumber(newSlideNumber);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la navigation sur le slide", errors);
            setErrors("Une erreur s'est produite lors de la navigation sur le slide, veuillez réessayer'");
        }
    };

    //ACCESS TO RESERV MODAL IF USER IS AUTHENTIFIED ELSE REDIRECTION TO LOGIN
    const handleClick = (e) => {
        try {
            if (user) {
                setOpenModal(true);
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'ouverture de la réservation", errors);
            setErrors("Une erreur s'est produite lors de l'ouverture de la réservation, veuillez réessayer'");
        }
    };

    return (
        <div>
            <NavBar />
            <Header type="list" />

            {/* SLIDER */}
            {loading ? ("loading please wait") : (
                <>
                    <div className="hotelContainer">
                        {open &&
                            <>
                                <div className="slider">
                                    <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
                                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
                                    <div className="sliderWrapper">
                                        <img src={data.photos[slideNumber]} alt="Room photos" className="sliderImg" />
                                    </div>
                                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
                                </div>
                            </>
                        }

                        {/* HOTEL DETAILS */}
                        <div className="hotelWrapper">
                            <h1 className="hotelTitle">{data.name}</h1>
                            <div className="hotelAdress">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span> {data.address} - {data.city}</span>
                            </div>
                            <span className="hotelDistance"> À {data.distance} métres des commerces</span> <br />
                            <span className="hotelPriceHighlight">Premier prix : {data.cheapestPrice}€</span>
                            <div className="hotelImages">

                                {/* MAP FOR PHOTOS */}
                                {data.photos?.map((photo, i) => (
                                    <div className="hotelImgWrapper" key={i}>
                                        <img onClick={() => handleOpen(i)} src={photo} alt="LogementInsolite" className="hotelImg" />
                                    </div>
                                ))}
                            </div>
                            <div className="hotelDetails">
                                <div className="hotelDetailsTexts">
                                    <h1 className="hotelTitle">{data.title}</h1>
                                    <p className="hotelDesc">{data.desc}</p>
                                </div>
                                <div className="hotelDetailsPrice">
                                    <span>Premier prix pour {days} nuit(s) </span>

                                    {/* TOTAL PRICE DETAILS FOR NUMBER OF DAYS */}
                                    <h2><b>{days * data.cheapestPrice * options.room}€</b></h2>
                                    <button onClick={handleClick}>Résérver</button>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </>
            )}
            {/* MODAL */}
            {openModal &&
                <Reserve setOpen={setOpenModal} hotelId={id} />
            }
        </div>
    );
};

export default Hotel;