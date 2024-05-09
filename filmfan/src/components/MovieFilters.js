import React from "react";
import "./MovieFilter.css";

const MovieFilters = ({ handleFilter, handleSort }) => {
  return (
   
      <div className="movie-filter">
        <h3>Toolbox</h3>
        <label className="mr-2">Filter by Year:</label>
        <select
          className="form-control mr-4"
          onChange={(e) => handleFilter("year", e.target.value)}
        >
          <option value="">All</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>

        <label className="mr-2">Filter by Type:</label>
        <select
          className="form-control mr-4"
          onChange={(e) => handleFilter("type", e.target.value)}
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>

        <label className="mr-2">Sort by:</label>
        <select
          className="form-control"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          {/* Add more sorting options as needed */}
        </select>
      </div>

  );
};

export default MovieFilters;
