import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";

const SearchResults = (props) => {
  return (
    <>
      <div className="search__results--container">
        <h2 className="search__results--heading">
          Search results for: " {props.searchInput} "
        </h2>
        <div className="search__results">
          {props.showList.length > 0 ? (
            <ShowThumbnail
              showList={props.showList}
              getMovieDetails={props.getMovieDetails}
            />
          ) : (
            <div>Sorry, no results found!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
