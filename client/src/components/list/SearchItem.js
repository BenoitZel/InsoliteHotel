import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ item }) => {

    return (
        <div className="searchItem">
            {/* HOTEL PICTURE */}
            <img
                src={item.photos[0]}
                alt="LogementInsolite"
                className="siImg"
            />
            {/* HOTEL DETAILS */}
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">À {item.distance} métres des commerces</span>
                <span className="siSubtitle">{item.desc}</span>
                <span className="siFeatures">Pratiques et initiatives favorisant la biodiversité</span>
                <span className="siCancelOp">Remboursement gratuit jusqu'à 30 jours avant l’arrivée.</span>
                <span className="siCancelOpSusbtitle">25% remboursable ensuite.</span>
            </div>
            <div className="siDetails">
                {item.rating &&
                    <div className="siRating">
                        <span>Excellent</span>
                        <button>{item.rating}</button>
                    </div>}
                {/* HOTEL PRICE AND REDIRECTION */}
                <div className="siDetailTexts">
                    <span className="siPrice">{item.cheapestPrice}€</span>
                    <Link to={(`/hotels/${item._id}`)}>
                        <button className="siCheckButton">Disponibilités</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;