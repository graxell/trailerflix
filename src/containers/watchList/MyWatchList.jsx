import React from "react";
import Thumbnail from "../../components/thumbnail/Thumbnail";

const MyWatchList = (props) => {
  const { myList, addButtonHandler, isSignedIn } = props;

  return (
    <>
      <div className="list__results--container">
        <h2 className="list__results--heading">My List</h2>
        <div className="list__results">
          {isSignedIn && (
            <>
              {myList.length > 0 ? (
                myList.map((show, index) => {
                  return (
                    <Thumbnail
                      key={index}
                      showList={show}
                      addButtonHandler={addButtonHandler}
                    />
                  );
                })
              ) : (
                <div>
                  Explore Trailerflix to find shows you want to add to your
                  list!
                </div>
              )}
            </>
          )}

          {!isSignedIn && (
            <div>
              Sign in or create an account to start saving your must watch
              series and movies!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyWatchList;
