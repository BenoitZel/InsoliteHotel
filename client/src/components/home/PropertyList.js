import React from 'react';
import useFetch from '../useFetch';

const PropertyList = () => {

  //USEFETCH COMPONENT - BY TYPE
  const { data, loading } = useFetch("/hotels/countByType");

  const images = [
    "https://res.cloudinary.com/greengo-production/image/upload/f_auto,c_limit,w_1440,q_auto/pictures/hosting_establishment/ordered_images/000000_tinystay-183.jpg",
    "https://res.cloudinary.com/greengo-production/image/upload/f_auto,c_limit,w_1440,q_auto/pictures/hosting_establishment/ordered_images/extra-image-0_4r30f0z.jpg",
    "https://res.cloudinary.com/greengo-production/image/upload/f_auto,c_limit,w_1440,q_auto/pictures/accommmodation/ordered_images/20230624_132127.jpg",
    "https://res.cloudinary.com/greengo-production/image/upload/f_auto,c_limit,w_1440,q_auto/pictures/hosting_establishment/ordered_images/120.jpg"
  ]

  return (
    <div className="pList">
      {loading ? ("loading") : (
        <>
          {/* IMAGES MAP */}
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                {/* COUNT BY TYPE */}
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;