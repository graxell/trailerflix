import React from "react";
import banner_Alt from "../../assets/images/banner_Alt.png";
import {
  imageUrlPath,
  getMediaType,
  showTitleHandler,
  showReleaseDate,
  showRatings,
} from "../../utils/DataUtils";
import { getMovieDetails } from "../../controllers/apiController";

const Banner = (props) => {
  const { show, setShow, bannerShow, exit, addButtonHandler } = props;

  const { aboutShow } = show;

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

  //Button to open official website or alt link in new window
  const handleWatchBtn = () => {
    const altUrl = `https://www.themoviedb.org/${getMediaType(
      title
    )}/${id}/watch?locale=GB`;
    homepage ? window.open(homepage) : window.open(altUrl);
  };

  return (
    <>
      <div className="banner--container">
        <img
          className="banner__img"
          src={imageUrlPath(backdrop_path, banner_Alt)}
          alt={showTitleHandler(title, name)}
        />

        <div className="banner__details--wrapper">
          {aboutShow && (
            <button className="btn--circle btn__exit" onClick={exit}>
              &#10005;
            </button>
          )}

          <div className="banner__details">
            {tagline && <p className="banner__overview">"{tagline}"</p>}
            <h2 className="banner__heading">{showTitleHandler(title, name)}</h2>

            <div className="banner__bottom">
              {!aboutShow && <p>{overview}</p>}

              {/* Handling banner information depending if a particular show is being viewed or for banner in homepages */}
              {aboutShow ? (
                <div className="banner__bottom--inline btns">
                  <button className="btn__watch" onClick={handleWatchBtn}>
                    Watch
                  </button>

                  {/* add or remove from list button */}
                  {addButtonHandler(bannerShow, id)}
                </div>
              ) : (
                <div className="banner__bottom--inline info">
                  <p>
                    {showReleaseDate(release_date, first_air_date).substring(
                      0,
                      4
                    )}
                  </p>
                  <p>{showRatings(vote_average)}/10</p>
                  <button
                    className="btn__moreInfo"
                    onClick={() => {
                      getMovieDetails(getMediaType(title), id).then((result) =>
                        setShow((prevState) => {
                          return { ...prevState, aboutShow: result };
                        })
                      );
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
