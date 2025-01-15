import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import { StarRating } from '../components/StarRating';
import { Reviews } from '../components/Reviews';
import { AddReview } from '../components/AddReview';

const RestaurantdetailPage = () => {
  const {id} = useParams();
  const {selectedRestaurants, setSelectedRestaurants} = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`${id}`);
        const restaurantsData = response.data?.data;
        setSelectedRestaurants(restaurantsData); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },[id, setSelectedRestaurants]);

  return (
    <div>{selectedRestaurants && (
      <>
      <h1 className='text-center display-1'>{selectedRestaurants.restaurant.name}</h1>
      <div className="text-center">
        <StarRating rating={selectedRestaurants.restaurant.average_rating} />
        <span className="text-warning ml-1">
          {selectedRestaurants.restaurant.count ? `(${selectedRestaurants.restaurant.count})` : "(0)"}
        </span>
      </div>
      <div className="mt-3">
        <Reviews reviews={selectedRestaurants.reviews}/>

      </div>
      <AddReview />
      </>
    )} </div>
  )
}

export default RestaurantdetailPage;