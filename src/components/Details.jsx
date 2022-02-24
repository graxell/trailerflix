import React from "react";

const Details = (props) => {
  return (
    <div className="thumbnail__details--wrapper">
      <h2 className="thumbnail__title">{props.title}</h2>

      <div className="thumbnail__bottom">
        <p>{props.releaseDate}</p>
        <p>{props.ratings}</p>
      </div>
    </div>
  );
};

export default Details;
