import React from 'react';
import useFetch from '../useFetch';

const Featured = () => {

  //USEFETCH COMPONENT - BY CITY
  const { data, loading } = useFetch("/hotels/countByCity?cities=Cathare,Montpellier,Var");

  return (
    <div className="featured">

      {/* CITY DETAILS */}
      {loading ? ("Loading please wait") : (
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/266730662.jpg?k=1c2a5ceaf7cc3fe69e92a40bc4546778d41b5bbbed610ac42ebe1e56f9c9a244&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h3>Pays Cathare</h3>

              {/* COUNT */}
              <h4>{data[0]} Hotels</h4>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h3>Var</h3>
              <h4>{data[2]} Hotels</h4>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/265928759.jpg?k=d7ee8e64b089d78b10d8a986d7aabe6fc6bad5feac5bcf40e0bd8ca3e1de6132&o=&hp=1"
              alt="PhotoLondres"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h3>Montpellier</h3>
              <h4>{data[1]} Hotels</h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;