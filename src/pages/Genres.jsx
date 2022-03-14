import React from "react";
import Banner from "../components/Banner";

const Categories = (props) => {
  const {
    getMovieDetails,
    bannerShow,
    genres,
    getShowsByGenre,
    screen,
    show,
    addButtonHandler,
  } = props;

  const { genreList, mediaType } = genres;

  return (
    <>
      <div className={"genre--container"}>
        {bannerShow && (
          <Banner
            screen={screen}
            show={show}
            bannerShow={bannerShow}
            getMovieDetails={getMovieDetails}
            addButtonHandler={addButtonHandler}
          />
        )}

        <ul className="genre__list">
          {genreList &&
            genreList.map((genre) => {
              const { id, name } = genre;
              return (
                <li
                  className="genre--box"
                  key={id}
                  onClick={() => {
                    getShowsByGenre(mediaType, id, name);
                  }}
                >
                  {name}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Categories;
