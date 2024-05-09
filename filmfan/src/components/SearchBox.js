import React from "react";
import "./SearchBox.css";
import { Link } from "react-router-dom";

const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <div className="search-bar">
        <input
          className="form-control search-input"
          value={props.value}
          onChange={(event) => props.setSearchValue(event.target.value)}
          placeholder="Type to search....."
        />
      </div>
      <div className="links">
        <Link to={"/add-movie"} className="btn btn-primary">
          Add a Movie
        </Link>
        <Link to={"/favourites"} className="btn btn-primary">
          Favourites
        </Link>
      </div>
    </div>
  );
};

export default SearchBox;
