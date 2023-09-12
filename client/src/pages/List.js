import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../components/useFetch';
import NavBar from '../components/header/NavBar';
import Header from '../components/header/Header';
import SearchItem from '../components/list/SearchItem';
import Footer from '../components/footer/Footer';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const List = () => {

    const location = useLocation();

    //SEARCH STATES
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [options, setOptions] = useState(location.state.options);
    const [openDate, setOpenDate] = useState(false);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const navigate = useNavigate();

    //USEFETCH COMPONENT - HOTELS WITH QUERIES
    const { data } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

    //NAVIGATE
    const handleClick = () => {
        navigate("/");
    }

    return (
        <div>
            <NavBar />
            <Header type="list" />
            <div className="listContainer">
                {/* SIDE SEARCH */}
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Votre recherche actuelle</h1>
                        {/* DESTINATION */}
                        <div className="lsItem">
                            <label htmlFor="">Destination</label>
                            <input placeholder={destination} type="text" />
                        </div>
                        {/* DATES */}
                        <div className="lsItem">
                            <label htmlFor="">Dates</label>
                            <span onClick={() => setOpenDate(!openDate)}>
                                {`${format(dates[0].startDate, "dd/MM/yyyy")} 
                                au ${format(dates[0].endDate, "dd/MM/yyyy")} `}
                            </span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) => setDates([item.selection])}
                                    minDate={new Date()}
                                    ranges={dates}
                                />
                            )}
                        </div>

                        <div className="lsItem">
                            <div className="lsOptionItem">
                                <span className="lsOptionText">Adultes</span>
                                <input
                                    type="number"
                                    min={1}
                                    className="lsOptionInput"
                                    placeholder={options.adult}
                                ></input>
                            </div>
                        </div>
                        <div className="lsItem">
                            <div className="lsOptionItem">
                                <span className="lsOptionText">Enfants</span>
                                <input
                                    type="number"
                                    min={0}
                                    className="lsOptionInput"
                                    placeholder={options.children}
                                ></input>
                            </div>
                        </div>
                        <div className="lsItem">
                            <div className="lsOptionItem">
                                <span className="lsOptionText">Chambres</span>
                                <input
                                    type="number"
                                    min={1}
                                    className="lsOptionInput"
                                    placeholder={options.room}
                                ></input>
                            </div>
                        </div>
                        {/* OPTIONS PRICE MIN AND MAX - PERSONS - ROOMS */}
                        <div className="lsItem">
                            <label htmlFor="">Affinez votre recherche</label>
                            <div className="lsOptionItem">
                                <span className="lsOptionText">Prix minimum <small>par nuit</small></span>
                                <input
                                    type="number"
                                    min="1"
                                    onChange={(e) => setMin(e.target.value)}
                                    className="lsOptionInput"
                                ></input>
                            </div>
                        </div>
                        <div className="lsItem">
                            <div className="lsOptionItem">
                                <span className="lsOptionText">Prix maximum <small>par nuit</small></span>
                                <input
                                    type="number"
                                    min="1"
                                    onChange={(e) => setMax(e.target.value)}
                                    className="lsOptionInput"></input>
                            </div>
                        </div>
                        <button onClick={handleClick} >Effectuer une nouvelle recherche</button>
                    </div>
                    {/* HOTELS DETAILS */}
                    <div className="listResult">
                        {(data[0] == null) ? (
                            <div className='emptyListResult'>
                                Pas d'hotel disponible pour cette ville, veuillez effectuer une nouvelle recherche
                            </div>
                        ) : (
                            <>
                                {data.map((item) => (
                                    <SearchItem item={item} key={item._id} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default List;

