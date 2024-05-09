import React from "react";
import "./SearchBox.css";
import { Link } from "react-router-dom";

const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Type to search....."
      />
      <Link to={"/add-movie"} className="btn btn-primary">
        Add a Movie
      </Link>
      <Link to={"/favourites"} className="btn btn-primary">
        Favourites
      </Link>
    </div>
  );
};

export default SearchBox;