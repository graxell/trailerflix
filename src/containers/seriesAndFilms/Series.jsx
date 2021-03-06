import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import DisplayGenreList from "./components/DisplayGenreList";
import ListResult from "./components/ListResult";
import {
  getGenreList,
  getShowsByMediaType,
} from "../../controllers/apiController";
import { randomBanner } from "../../utils/PageUtils";

const Series = (props) => {
  //-- [ states ] --//
  const [seriesBanner, setSeriesBanner] = useState();
  const [seriesGenres, setSeriesGenres] = useState({
    mediaType: "tv",
    genres: [],
  });

  //-- [ destructure ] --//
  const { show, setShow, addButtonHandler, setShowList, showList } = props;

  const { genres, mediaType } = seriesGenres;

  //-- [ when component mounts ] --//
  useEffect(() => {
    getGenreList(mediaType).then((result) =>
      setSeriesGenres({ ...seriesGenres, genres: result })
    );

    getShowsByMediaType("tv").then((result) => {
      setSeriesBanner(randomBanner(result));
    });
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
