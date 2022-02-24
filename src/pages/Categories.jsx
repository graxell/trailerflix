// import ShowThumbnail from "../components/ShowThumbnail";
import React from "react";
import Banner from "../components/Banner";

const Categories = (props) => {
  const { getMovieDetails, bannerShow, genres, getShowsByGenre } = props;

  return (
    <>
      <div className={"main__categories--container"}>
        {bannerShow && (
          <Banner bannerShow={bannerShow} getMovieDetails={getMovieDetails} />
        )}

        <ul className="genre__list">
          {genres.genreList &&
            genres.genreList.map((genre) => {
              return (
                <li
                  className="genre--box"
                  key={genre.id}
                  onClick={() => {
                    getShowsByGenre(genres.mediaType, genre.id, genre.name);
                  }}
                >
                  {genre.name}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Categories;
