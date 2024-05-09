import React, { useState, useEffect } from "react";
import {  BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavorite"; 
import RemoveFavourites from "./components/RemoveFavourites";
import MovieFilters from "./components/MovieFilters";
import AddMovieForm from "./components/AddMovieForm";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=bd27f565`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
    saveToFavouritesServer(movie); // Save to server
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
    removeFromFavouritesServer(movie.imdbID); // Remove from server
  };

  const saveToFavouritesServer = async (movie) => {
    try {
      await fetch("http://localhost:3001/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });
    } catch (error) {
      console.error("Error saving to favourites server:", error);
    }
  };

  const removeFromFavouritesServer = async (imdbID) => {
    try {
      await fetch(`http://localhost:3001/favourites/${imdbID}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error removing from favourites server:", error);
    }
  };

  const filterMovies = (type, value) => {
    if (type === "year") {
      setFilterYear(value);
    } else if (type === "type") {
      setFilterType(value);
    }
  };

  const sortMovies = (type) => {
    setSortBy(type);
  };

  const filteredMovies = movies.filter((movie) => {
    if (filterYear && !movie.Year.includes(filterYear)) return false;
    if (filterType && movie.Type !== filterType) return false;
    return true;
  });

  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sortBy === "title") {
      return a.Title.localeCompare(b.Title);
    } else if (sortBy === "year") {
      return parseInt(b.Year) - parseInt(a.Year);
    }
    return 0;
  });

  const moviesList = sortedMovies.filter((movie) => movie.Type === "movie");
  const seriesList = sortedMovies.filter((movie) => movie.Type === "series");

  // Function to add a movie to the list
  const addMovie = (movie) => {
    setMovies([...movies, movie]);
  };

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className="main-container">
             <div className="top-container">
              <div className="tools">
              <MovieFilters handleFilter={filterMovies} handleSort={sortMovies} />
              </div>
              <div className="search-box">
               <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
              </div>
             </div>
              <div className="movies">
              <MovieListHeading heading="Movies" />
              <MovieList
                movies={moviesList}
                handleFavouritesClick={addFavouriteMovie}
                favouriteComponent={AddFavourite}
              />
              </div>
              <div className="series">
                <MovieListHeading heading="Series" />
                <div className="row">
                <MovieList
                  movies={seriesList}
                  handleFavouritesClick={addFavouriteMovie}
                  favouriteComponent={AddFavourite}
                />
              </div>
              </div>
            </div>
          } />
          <Route path="/add-movie" element={<AddMovieForm onAddMovie={addMovie} />} />
          <Route path="/favourites" element={
            <div className="container-fluid movie-app">
              <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading="Favourites" />
              </div>
              <div className="row">
                <MovieList
                  movies={favourites}
                  handleFavouritesClick={removeFavouriteMovie}
                  favouriteComponent={RemoveFavourites}
                />
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    );
  }

export default App;
