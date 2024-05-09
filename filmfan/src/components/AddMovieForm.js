import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddMovieForm.css";

const AddMovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [poster, setPoster] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (!title || !year || !type) {
      alert("Please fill in all fields");
      return;
    }
    // Call the onAddMovie function from parent component
    onAddMovie({ title, year, type, poster });
    // Clear the form after submission
    setTitle("");
    setYear("");
    setType("");
    setPoster("");

    alert("The Movie has been added successfully");
  };

  return (
    <div>
      <div className="submit-form">
        <form onSubmit={handleSubmit}>
          <h1>Add a Movie</h1>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Year:</label>
            <input
              type="text"
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
          <div className="form-group">
            <label>Poster Image URL:</label>
            <input
              type="text"
              className="form-control"
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-add">
            Add Movie
          </button>
        </form>
      </div>
      <div>
        <Link to={"/"} className="btn-back btn">
          Go back
        </Link>
      </div>
    </div>
  );
};

export default AddMovieForm;
