import { useState, useEffect } from "react";
import Banner from "../shared/Banner";
import DisplayShowListSlider from "../layout/DisplayShowListSlider";
import { homepageHeadings, randomBanner } from "../../utils/PageUtils";
import { getShowList } from "../../controllers/apiController";

const Homepage = (props) => {
  const [homepageLists, setHomepageLists] = useState({});

  const { addButtonHandler, setShow, setBanner, banner, show } = props;

  //FETCHING API
  useEffect(() => {
    getShowList("trending/all/day?").then((result) =>
      setHomepageLists((prevState) => {
        return { ...prevState, trending: result };
      })
    );

    getShowList("movie/popular?").then((result) =>
      setHomepageLists((prevState) => {
        return { ...prevState, popularMovies: result };
      })
    );

    getShowList("tv/popular?").then((result) =>
      setHomepageLists((prevState) => {
        return { ...prevState, popularSeries: result };
      })
    );

    getShowList("movie/top_rated?").then((result) =>
      setHomepageLists((prevState) => {
        return { ...prevState, topRatedMovies: result };
      })
    );

    getShowList("tv/top_rated?").then((result) =>
      setHomepageLists((prevState) => {
        return { ...prevState, topRatedSeries: result };
      })
    );
  }, []);

  useEffect(() => {
    setBanner(randomBanner(homepageLists.trending));
  }, [homepageLists.trending]);

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
          <DisplayShowListSlider
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
