import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";

const MyWatchList = (props) => {
  const { myList, getMovieDetails, addToList, removeFromList, getRecs } = props;

  return (
    <>
      <div className="search__results--container">
        <h2 className="search__results--heading">My List</h2>
        <div className="search__results">
          {myList.length > 0 ? (
            <ShowThumbnail
              showList={myList}
              getMovieDetails={getMovieDetails}
              addToList={addToList}
              removeFromList={removeFromList}
              getRecs={getRecs}
            />
          ) : (
            <div>Sorry, no results found!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyWatchList;
