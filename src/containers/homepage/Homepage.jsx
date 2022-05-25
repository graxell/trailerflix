import { useState, useEffect } from "react";
import Banner from "../../components/banner/Banner";
import ThumbnailSlider from "../../components/thumbnail/ThumbnailSlider";
import { homepageHeadings, randomBanner } from "../../utils/PageUtils";
import { getShowList } from "../../controllers/apiController";

const Homepage = (props) => {
  const [homepageLists, setHomepageLists] = useState({});

  const { addButtonHandler, setShow, setBanner, banner, show } = props;

  //   ---- [ useEffect CALLS ] ----   //
  useEffect(() => {
    fetchHomepageList("trending/all/day?", "trending");
    fetchHomepageList("movie/popular?", "popularMovies");
    fetchHomepageList("tv/popular?", "popularSeries");
    fetchHomepageList("movie/top_rated?", "topRatedMovies");
    fetchHomepageList("tv/top_rated?", "topRatedSeries");
  }, []);

  useEffect(() => {
    setBanner(randomBanner(homepageLists.trending));
  }, [homepageLists.trending]);

  // getting api data function
  const fetchHomepageList = async (urlParam, key) => {
    const result = await getShowList(urlParam);
    if (result) {
      setHomepageLists((prevState) => {
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

        {homepageLists && (
          <ThumbnailSlider
            lists={homepageLists}
            headingHandler={homepageHeadings}
            addButtonHandler={addButtonHandler}
            setShow={setShow}
          />
        )}
      </div>
    </>
  );
};

export default Homepage;
