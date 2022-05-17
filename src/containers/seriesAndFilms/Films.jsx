import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import DisplayGenreList from "./components/DisplayGenreList";
import ListResult from "./components/ListResult";
import {
  getGenreList,
  getShowsByMediaType,
} from "../../controllers/apiController";
import { randomBanner } from "../../utils/PageUtils";

const Films = (props) => {
  //-- [ states ] --//
  const [movieBanner, setMovieBanner] = useState();
  const [movieGenres, setMovieGenres] = useState({
    mediaType: "movie",
    genres: [],
  });

  //-- [ destructure ] --//
  const { show, setShow, addButtonHandler, setShowList, showList } = props;

  const { genres, mediaType } = movieGenres;

  //-- [ when component mounts ] --//
  useEffect(() => {
    getGenreList(mediaType).then((result) =>
      setMovieGenres({ ...movieGenres, genres: result })
    );

    getShowsByMediaType("movie").then((result) => {
      setMovieBanner(randomBanner(result));
    });
  }, []);

  return (
    <>
      <div className={"genre--container"}>
        {movieBanner && (
          <Banner
            show={show}
            setShow={setShow}
            bannerShow={movieBanner}
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
            heading={"Films"}
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

export default Films;
