import React from 'react'

export const StarRating = ({rating}) => {
    const stars = [];
    for(let i = 1; i<=5; i++){
        if(i <= rating){
            stars.push(<i key={i} className="fa-solid fa-star text-warning" ></i>);
        } else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-warning"></i>);
        } else {
            stars.push(<i key={i} className="fa-regular fa-star taxt-warning"></i>);
        }
    }
  return (
    <>{stars}</>
  )
}
