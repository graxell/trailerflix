import React, { useEffect, useState } from "react";
import Banner from "../shared/Banner";
import DisplayShowListSlider from "../layout/DisplayShowListSlider";
import { getOtherList } from "../../controllers/apiController";
import { randomBanner, newAndPopularHeadings } from "../../utils/PageUtils";

const NewAndPopular = (props) => {
  const [newAndPopularShows, setNewAndPopularShows] = useState({});

  const { setBanner, banner, addButtonHandler, show, setShow } = props;

  useEffect(() => {
    getOtherList("tv/airing_today?").then((result) =>
      setNewAndPopularShows((prevState) => {
        return { ...prevState, airingToday: result };
      })
    );

    getOtherList("movie/now_playing?").then((result) =>
      setNewAndPopularShows((prevState) => {
        return { ...prevState, latest: result };
      })
    );

    getOtherList("tv/on_the_air?").then((result) =>
      setNewAndPopularShows((prevState) => {
        return { ...prevState, ongoingTv: result };
      })
    );

    getOtherList("movie/upcoming?").then((result) =>
      setNewAndPopularShows((prevState) => {
        return { ...prevState, upcoming: result };
      })
    );
  }, []);

  useEffect(() => {
    randomBanner(newAndPopularShows.upcoming).then((result) => {
      setBanner(result);
    });
  }, [newAndPopularShows.upcoming]);

  return (
    <>
      <div className="homepage--container">
        {banner && (
          <Banner
            show={show}
            setShow={setShow}
            bannerShow={banner}
            addButtonHandler={addButtonHandler}
          />
        )}

        <DisplayShowListSlider
          lists={newAndPopularShows}
          headingHandler={newAndPopularHeadings}
          addButtonHandler={addButtonHandler}
          setShow={setShow}
          show={show}
        />
      </div>
    </>
  );
};

export default NewAndPopular;
