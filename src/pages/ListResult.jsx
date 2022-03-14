import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";

const ListResult = (props) => {
  const {
    showList,
    getMovieDetails,
    searchInput,
    addButtonHandler,
    extractBanner,
    homepageLists,
    getGenres,
  } = props;

  const { popularSeries, popularMovies } = homepageLists;

  const { shows, genreName, mediaType } = showList;

  return (
    <>
      {/* HEADING */}
      <div className="list__results--container">
        {searchInput ? (
          <h2 className="list__results--heading">
            Search results for: " {searchInput} "
          </h2>
        ) : mediaType === "movie" ? (
          <h2 className="list__results--heading">
            <span
              className="pre--heading"
              onClick={() => {
                getGenres("movie");
                extractBanner(popularMovies);
              }}
            >
              Films &gt;{" "}
            </span>{" "}
            {genreName}
          </h2>
        ) : (
          <h2 className="list__results--heading">
            <span
              className="pre--heading"
              onClick={() => {
                getGenres("tv");
                extractBanner(popularSeries);
              }}
            >
              Series &gt;{" "}
            </span>{" "}
            {genreName} Programmes
          </h2>
        )}

        <div className="list__results">
          {shows && shows.length > 0 ? (
            shows.map((show) => {
              return (
                <ShowThumbnail
                  key={show.id}
                  showList={show}
                  getMovieDetails={getMovieDetails}
                  addButtonHandler={addButtonHandler}
                />
              );
            })
          ) : (
            <div>Sorry, no results found!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListResult;
