import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";

const CategoryResult = (props) => {
  const { showList, listDetails, getMovieDetails } = props;

  const { genreName, mediaType } = listDetails;

  return (
    <>
      {/* HEADING */}
      <div className="search__results--container">
        {mediaType === "tv" ? (
          <h2 className="search__results--heading">
            <span className="pre--heading">Series &gt; </span> {genreName}{" "}
            Programmes
          </h2>
        ) : (
          <h2 className="search__results--heading">
            <span className="pre--heading">Films &gt; </span> {genreName}
          </h2>
        )}

        <div className="search__results">
          {showList.length > 0 ? (
            <ShowThumbnail
              showList={showList}
              getMovieDetails={getMovieDetails}
            />
          ) : (
            <div>Sorry, no results found!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryResult;
