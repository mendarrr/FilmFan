import React from "react";

import { Link } from 'react-router-dom';

const MovieList = ({ movies, handleFavouritesClick, favouriteComponent }) => {
  const FavouriteComponent = favouriteComponent;
  <Link to={"/"} className="btn">
  Go back
</Link>

  return (
    <>
      {movies.map((movie, index) => (
        <div
          className="image-container d-flex justify-content-start m-3"
          key={index}
        >
          <img src={movie.Poster} alt="movie" />
          <div
            onClick={() => handleFavouritesClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouriteComponent movie={movie} />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
