import React from "react";

const Image = (props) => {
  const imageURL = `https://image.tmdb.org/t/p/original/${props.poster}`;

  const setPoster = () => {
    if (props.poster) {
      return (
        <img src={imageURL} alt={props.title} className="thumbnail__img" />
      );
    } else {
      return (
        <div className="poster__replacement">
          <h2>{props.title}</h2>
        </div>
      );
    }
  };

  return setPoster();
};

export default Image;
