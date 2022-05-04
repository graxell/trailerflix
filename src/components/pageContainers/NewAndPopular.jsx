import React, { useEffect, useState } from "react";
import Banner from "../shared/Banner";
import DisplayShowListSlider from "../layout/DisplayShowListSlider";
import { getShowList } from "../../controllers/apiController";
import { randomBanner, newAndPopularHeadings } from "../../utils/PageUtils";

const NewAndPopular = (props) => {
  const [newAndPopularShows, setNewAndPopularShows] = useState({});

  const { setBanner, banner, addButtonHandler, show, setShow } = props;

  useEffect(() => {
    getShowList("tv/airing_today?").then((result) =>
      setNewAndPopularShows((prevState) => {
        return { ...prevState, airingToday: result };
      })
    );

    getShowList("movie/now_playing?").then((result) =>
      setNewAndPopularShows((prevState) => {
        return { ...prevState, latest: result };
      })
    );

    getShowList("tv/on_the_air?").then((result) =>
      setNewAndPopularShows((prevState) => {
        return { ...prevState, ongoingTv: result };
      })
    );

    getShowList("movie/upcoming?").then((result) =>
      setNewAndPopularShows((prevState) => {
        return { ...prevState, upcoming: result };
      })
    );
  }, []);

  useEffect(() => {
    setBanner(randomBanner(newAndPopularShows.upcoming));
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
