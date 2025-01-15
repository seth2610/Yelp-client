import React, { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { StarRating } from "./StarRating";

export const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        console.log("API Response:", response.data);

        const restaurantsData = response.data?.data?.restaurant;
        if (restaurantsData) {
          setRestaurants(restaurantsData);
          console.log("Updated Restaurants State:", restaurantsData);
        } else {
          console.error("Restaurants data not found in API response");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
        const response = await RestaurantFinder.delete(`/${id}`);
        setRestaurants(restaurants.filter(restaurant => {
            return restaurant.id !== id
        }));
        console.log(response);
    } catch (error) {
        console.log(error);
    }
  }

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`)
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) =>{

    if(!restaurant.count){
      return <span className="text-warning">0 reviews</span>
    }
    return <>
    <StarRating rating={restaurant.id} />
    <span className="text-warning ml-1">({restaurant.count})</span>
    </>
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map((restaurant) => (
            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
              <td>{"$".repeat(restaurant.price_range)}</td>
              <td>{renderRating(restaurant)}</td>
              <td>
                <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
              </td>
              <td>
                <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
