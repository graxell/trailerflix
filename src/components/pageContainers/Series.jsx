import React, { useEffect, useState } from "react";
import Banner from "../shared/Banner";
import ListResult from "./ListResult";
import DisplayGenreList from "../layout/DisplayGenreList";
import { getGenreList } from "../../controllers/apiController";
import { randomBanner } from "../../utils/PageUtils";

const Series = (props) => {
  //-- [ states ] --//
  const [seriesBanner, setSeriesBanner] = useState();
  const [seriesGenres, setSeriesGenres] = useState({
    mediaType: "tv",
    genres: [],
  });

  //-- [ destructure ] --//
  const {
    popularSeries,
    show,
    setShow,
    addButtonHandler,
    setShowList,
    showList,
  } = props;

  const { genres, mediaType } = seriesGenres;

  //-- [ when component mounts ] --//
  useEffect(() => {
    getGenreList(mediaType).then((result) =>
      setSeriesGenres({ ...seriesGenres, genres: result })
    );

    randomBanner(popularSeries).then((show) => setSeriesBanner(show));
  }, []);

  return (
    <>
      <div className={"genre--container"}>
        {seriesBanner && (
          <Banner
            show={show}
            setShow={setShow}
            bannerShow={seriesBanner}
            addButtonHandler={addButtonHandler}
          />
        )}

        {genres && !showList && (
          <DisplayGenreList
            genres={genres}
            setShowList={setShowList}
            mediaType={mediaType}
          />
        )}

        {showList && (
          <ListResult
            heading={"Series"}
            mediaType={mediaType}
            setShowList={setShowList}
            showList={showList}
            addButtonHandler={addButtonHandler}
            setShow={setShow}
            show={show}
          />
        )}
      </div>
    </>
  );
};

export default Series;
