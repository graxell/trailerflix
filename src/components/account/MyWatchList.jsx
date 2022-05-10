import React from "react";
import ShowThumbnail from "../shared/ShowThumbnail";
import { getMovieDetails } from "../../controllers/apiController";

const MyWatchList = (props) => {
  const { myList, addButtonHandler, isSignedIn } = props;

  return (
    <>
      <div className="list__results--container">
        <h2 className="list__results--heading">My List</h2>

        {isSignedIn && (
          <div className="list__results">
            {myList && myList.length > 0 ? (
              myList.map((show) => {
                return (
                  <ShowThumbnail
                    key={show.id}
                    showList={show}
                    addButtonHandler={addButtonHandler}
                  />
                );
              })
            ) : (
              <div>
                Explore Trailerflix to find shows you want to add to your list!
              </div>
            )}
          </div>
        )}

        {!isSignedIn && (
          <div>
            Sign in or create an account to start saving your must watch series
            and movies!
          </div>
        )}
      </div>
    </>
  );
};

export default MyWatchList;
