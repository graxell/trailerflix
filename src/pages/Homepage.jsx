import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";
import Banner from "../components/Banner";

const Homepage = (props) => {
  const {
    addButtonHandler,
    bannerShow,
    homepageLists,
    getMovieDetails,
    screen,
    headingHandler,
  } = props;

  let homepageListsKeys = Object.keys(homepageLists);

  return (
    <>
      <div className="homepage--container">
        {bannerShow && (
          <Banner
            screen={screen}
            bannerShow={bannerShow}
            getMovieDetails={getMovieDetails}
            addButtonHandler={addButtonHandler}
          />
        )}

        {homepageListsKeys.map((key, index) => {
          return (
            <div key={index} className="homepage__lists">
              <h2>{headingHandler(key)}</h2>
              <div className="homepage__sliders">
                {homepageLists[key].map((show, key) => {
                  return (
                    <ShowThumbnail
                      key={key}
                      showList={show}
                      getMovieDetails={getMovieDetails}
                      addButtonHandler={addButtonHandler}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Homepage;
