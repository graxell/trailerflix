// import axios from "axios";
import React, { useEffect } from "react";
import Homepage from "./Homepage";

const NewAndPopular = (props) => {
  const {
    getMovieDetails,
    extractBanner,
    newAndPopularShows,
    getNewAndPopular,
    banner,
    screen,
    setScreen,
    addButtonHandler,
  } = props;

  useEffect(() => {
    getNewAndPopular();
  }, [getNewAndPopular]);

  useEffect(() => {
    extractBanner(newAndPopularShows.upcoming);
  }, []);

  const headingHandler = (arrList) => {
    if (arrList === "airingToday") {
      return "Don't miss on TV today!";
    } else if (arrList === "latest") {
      return "Latest Films";
    } else if (arrList === "ongoingTv") {
      return "Programmes currently on air";
    } else {
      return "Coming soon in theatres";
    }
  };

  return (
    <>
      <Homepage
        bannerShow={banner}
        screen={screen}
        homepageLists={newAndPopularShows}
        setScreen={setScreen}
        getMovieDetails={getMovieDetails}
        headingHandler={headingHandler}
        addButtonHandler={addButtonHandler}
      />
    </>
  );
};

export default NewAndPopular;
