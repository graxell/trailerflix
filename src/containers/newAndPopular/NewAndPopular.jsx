import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import ThumbnailSlider from "../../components/thumbnail/ThumbnailSlider";
import { getShowList } from "../../controllers/apiController";
import { randomBanner, newAndPopularHeadings } from "../../utils/PageUtils";

const NewAndPopular = (props) => {
  const [newAndPopularShows, setNewAndPopularShows] = useState({});

  const { setBanner, banner, addButtonHandler, show, setShow } = props;

  //   ---- [ useEffect CALLS ] ----   //
  useEffect(() => {
    fetchNewPopularList("tv/airing_today?", "airingToday");
    fetchNewPopularList("movie/now_playing?", "latest");
    fetchNewPopularList("tv/on_the_air?", "ongoingTv");
    fetchNewPopularList("movie/upcoming?", "upcoming");
  }, []);

  useEffect(() => {
    setBanner(randomBanner(newAndPopularShows.upcoming));
  }, [newAndPopularShows.upcoming]);

  // getting api data function
  const fetchNewPopularList = async (urlParam, key) => {
    const result = await getShowList(urlParam);
    if (result) {
      setNewAndPopularShows((prevState) => {
        return { ...prevState, [key]: result };
      });
    } else {
      return "Cannot retrieve this list right now";
    }
  };

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

        <ThumbnailSlider
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
