// import ShowThumbnail from "../components/ShowThumbnail";
import React from "react";
import Banner from "../components/Banner";

const Categories = (props) => {
  const { getMovieDetails, bannerShow, genres, getShowsByGenre, screen } =
    props;

  const { genreList, mediaType } = genres;
  return (
    <>
      <div className={"main__categories--container"}>
        {bannerShow && (
          <Banner
            screen={screen}
            bannerShow={bannerShow}
            getMovieDetails={getMovieDetails}
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
