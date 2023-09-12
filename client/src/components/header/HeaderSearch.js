import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faBed, faCalendarDays, faPerson, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { SearchContext } from "../context/SearchContext";

//CALENDAR CSS
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const HeaderSearch = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    //DESTINATION SELECTION STATE
    const [destination, setDestination] = useState("");

    //DATES SELECTION STATES
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);

    //PERSONS SELECTION STATES
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });

    //PERSONS SELECTION FUNCTION ++ OR -- (prev for previous dates)
    const handleOption = (name, operation) => {
        try {
            setOptions(prev => {
                return { ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1 }
            })
        } catch (error) {
            console.error("Une erreur s'est produite lors de la selection", errors);
            setErrors("Une erreur s'est produite lors de la selection, veuillez réessayer");
        }
    }

    // USECONTEXT REACT HOOK 
    const { dispatch } = useContext(SearchContext);

    //SEARCH BUTTON - REDIRECTION - SET SEARCHCONTEXT
    const handleSearch = () => {
        try {
            dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
            navigate("/hotels", { state: { destination, dates, options } });
        } catch (error) {
            console.error("Une erreur s'est produite lors de la recherche", errors);
            setErrors({ message: "Une erreur s'est produite lors de la recherche, veuillez réessayer" });
        }
    }

    return (
        <div className="headerSearch">
            {/* SEARCHBAR DESTINATION */}
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                    type="text"
                    placeholder="Destination"
                    className="headerSearchInput"
                    onChange={e => setDestination(e.target.value)}
                />
            </div>
            {/* SEARCHBAR CALENDAR */}
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={() => setOpenDate(!openDate)}
                    className='headerSearchText'>
                    {`Du ${format(dates[0].startDate, "dd/MM/yyyy")} 
                    au ${format(dates[0].endDate, "dd/MM/yyyy")} `}
                </span>
                {openDate &&
                    // CALENDAR COMPONENT
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="date"
                        minDate={new Date()}
                    />
                }
            </div>
            {/* SEARCHBAR PERSONS */}
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className='headerSearchText'>
                    {`Adulte : ${options.adult}, 
                      Enfant : ${options.children}, 
                      Chambre : ${options.room}`}
                </span>
                {openOptions &&
                    <div className="options">
                        {/* Adults */}
                        <div className="optionItem">
                            <span className="optionText">Adultes</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.adult <= 1}
                                    className="optionCounterButton"
                                    onClick={() => handleOption("adult", "d")}>
                                    -
                                </button>
                                <span className="optioneCounterNumber">
                                    {options.adult}
                                </span>
                                <button
                                    className="optionCounterButton"
                                    onClick={() => handleOption("adult", "i")}
                                >+
                                </button>
                            </div>
                        </div>
                        {/* Childrens */}
                        <div className="optionItem">
                            <span className="optionText">Enfants</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.children <= 0}
                                    className="optionCounterButton"
                                    onClick={() => handleOption("children", "d")}>
                                    -
                                </button>
                                {/* TAKE VALUE FROM OPTION STATE UPDATE BY FUNCTION HANDLEOPTION */}
                                <span className="optioneCounterNumber">
                                    {options.children}
                                </span>
                                <button
                                    className="optionCounterButton"
                                    onClick={() => handleOption("children", "i")}>
                                    +
                                </button>
                            </div>
                        </div>
                        {/* Rooms */}
                        <div className="optionItem">
                            <span className="optionText">Nombre de chambres</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.room <= 1}
                                    className="optionCounterButton"
                                    onClick={() => handleOption("room", "d")}>-</button>
                                <span className="optioneCounterNumber">
                                    {options.room}
                                </span>
                                <button className="optionCounterButton"
                                    onClick={() => handleOption("room", "i")}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {/* SEARCH BUTTON */}
            <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
                {errors.message && <p className="error">{errors.message}</p>}
            </div>
        </div>
    );
};

export default HeaderSearch;