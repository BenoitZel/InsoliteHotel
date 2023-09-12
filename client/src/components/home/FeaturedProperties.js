import React from 'react'
import useFetch from '../useFetch';

export const FeaturedProperties = () => {

  //USEFETCH COMPONENT - FEATURED
  const { data, loading } = useFetch("/hotels?featured=true");

  return (
    <div className='fp'>

      {/* HOTEL DETAILS */}
      {loading ? ("loading please wait") : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]}
                alt=""
                className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Premier prix : {item.cheapestPrice}€</span>
              {/* HOTEL RATING */}
              {item.rating &&
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Bien</span>
                </div>}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
