import React from "react";
import banner_Alt from "../assets/images/banner_Alt.png";

const Banner = (props) => {
  const { bannerShow, getMovieDetails, screen, exit, addButtonHandler } = props;

  const {
    backdrop_path,
    id,
    title,
    name,
    release_date,
    first_air_date,
    vote_average,
    overview,
    tagline,
    homepage,
  } = bannerShow;

  const backdropURL = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  //checks info for tv and movie
  const mediaType = title ? "movie" : "tv";
  const bannerImg = backdrop_path ? backdropURL : banner_Alt;
  const showTitle = title ? title : name;
  const showReleaseYear = release_date
    ? release_date.substring(0, 4)
    : first_air_date.substring(0, 4);

  //Button to open official website or alt link in new window
  const handleWatchBtn = () => {
    const altUrl = `https://www.themoviedb.org/${mediaType}/${id}/watch?locale=GB`;
    homepage ? window.open(homepage) : window.open(altUrl);
  };

  return (
    <>
      <div className="banner--container">
        <img className="banner__img" src={bannerImg} alt={showTitle} />

        <div className="banner__details--wrapper">
          {screen === 2 && (
            <button className="btn--circle btn__exit" onClick={exit}>
              &#10005;
            </button>
          )}

          <div className="banner__details">
            {tagline && <p className="banner__overview">"{tagline}"</p>}
            <h2 className="banner__heading">{showTitle}</h2>

            <div className="banner__bottom">
              {screen !== 2 && <p>{overview}</p>}

              {/* Handling banner information depending on which screen it is on */}
              {screen === 2 ? (
                <div className="banner__bottom--inline btns">
                  <button className="btn__watch" onClick={handleWatchBtn}>
                    Watch
                  </button>

                  {/* add or remove from list button */}
                  {addButtonHandler(bannerShow, id)}
                </div>
              ) : (
                <div className="banner__bottom--inline info">
                  <p>{showReleaseYear}</p>
                  <p>{vote_average}/10</p>
                  <button
                    className="btn__moreInfo"
                    onClick={() => {
                      getMovieDetails(mediaType, id);
                    }}
                  >
                    More Info
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
