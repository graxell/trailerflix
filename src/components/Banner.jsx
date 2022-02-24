import React from "react";

const Banner = (props) => {
  const { bannerShow, getMovieDetails } = props;
  const {
    backdrop_path,
    media_type,
    id,
    title,
    name,
    release_date,
    first_air_date,
    vote_average,
    overview,
  } = bannerShow;

  const backdropURL = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  //checking if data is film or tv to display title
  const showTitle = title ? title : name;
  const showReleaseYear = release_date
    ? release_date.substring(0, 4)
    : first_air_date.substring(0, 4);

  return (
    <>
      <div className={"main__banner--container"}>
        <img src={backdropURL} alt={showTitle} />
        <div className={"main__banner--details"}>
          <h2 className={"main__banner--heading"}>{showTitle}</h2>
          <div className={"main__banner--bottom"}>
            <p>{overview}</p>
            <div className="bottom--inline">
              <p>{showReleaseYear}</p>
              <p>{vote_average}/10</p>
              <button
                className={"main__banner--infoBtn"}
                onClick={() => {
                  getMovieDetails(media_type, id);
                }}
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
