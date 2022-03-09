import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";

const ListResult = (props) => {
  const {
    showList,
    listDetails,
    getMovieDetails,
    searchInput,
    addToList,
    removeFromList,
  } = props;

  const { genreName, mediaType } = listDetails;

  return (
    <>
      {/* HEADING */}
      <div className="search__results--container">
        {searchInput ? (
          <h2 className="search__results--heading">
            Search results for: " {searchInput} "
          </h2>
        ) : mediaType === "movie" ? (
          <h2 className="search__results--heading">
            <span className="pre--heading">Films &gt; </span> {genreName}
          </h2>
        ) : (
          <h2 className="search__results--heading">
            <span className="pre--heading">Series &gt; </span> {genreName}{" "}
            Programmes
          </h2>
        )}

        <div className="search__results">
          {showList.length > 0 ? (
            <ShowThumbnail
              showList={showList}
              getMovieDetails={getMovieDetails}
              addToList={addToList}
              removeFromList={removeFromList}
            />
          ) : (
            <div>Sorry, no results found!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListResult;
