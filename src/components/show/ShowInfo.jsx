import React, { useEffect, useRef } from "react";
import ShowThumbnail from "../shared/ShowThumbnail";
import Runtime from "../shared/Runtime";
import Video from "./Video";
import DetailList from "./DetailList";
import Banner from "../shared/Banner";
import MainDetails from "./MainDetails";
import Trailers from "./Trailers";
import ExtendedDetails from "./ExtendedDetails";
import {
  showTitleHandler,
  showReleaseDate,
  getMediaType,
} from "../../utils/DataUtils";
import { getMovieRecs } from "../../controllers/apiController";
import DisplayThumbnailList from "../shared/DisplayThumbnailList";

const ShowInfo = (props) => {
  //destructure lists
  const { screen, show, setShow, exit, addButtonHandler } = props;

  const { id, title, name, videos } = show.aboutShow;

  const media = getMediaType(title);

  useEffect(() => {
    getMovieRecs(media, id).then((result) =>
      setShow({ ...show, showRecs: result })
    );
  }, []);

  //handling recommendation list
  const displayRecsHandler = () =>
    show.showRecs && show.showRecs.length > 0 ? "block" : "none";

  //scroll to bottom
  const aboutShow = useRef(null);

  const scrollToBottom = () => {
    aboutShow.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(show);

  return (
    <>
      {/* top of the page - poster & titles */}
      <div key={id} className="showInfo__container">
        <div className="showInfo__background">
          <Banner
            screen={screen}
            bannerShow={show.aboutShow}
            show={show}
            exit={exit}
            addButtonHandler={addButtonHandler}
          />

          {/* second section - small show info */}
          <MainDetails show={show.aboutShow} />

          <div className="moreBtn--container">
            <button className="showInfo__more" onClick={scrollToBottom}>
              More info...
            </button>
          </div>

          {/* third section - trailers and other videos*/}
          <div className="showInfo__videos">
            <h3 className="showInfo__subHeading">Trailers & More</h3>
            <div className="showInfo__trailers">
              {videos.results.length > 0 ? (
                <Video videos={videos.results} />
              ) : (
                `Videos for " ${showTitleHandler(
                  title,
                  name
                )} " are coming soon!`
              )}
            </div>
          </div>

          {/* fourth section - more like this - show recommendation */}
          <div
            className="showInfo__videos"
            style={{ display: displayRecsHandler() }}
          >
            <h3 className="showInfo__subHeading">More Like This</h3>
            <div className="showInfo__recs">
              <DisplayThumbnailList
                lists={show.showRecs}
                addButtonHandler={addButtonHandler}
                show={show}
                setShow={setShow}
              />
            </div>
          </div>

          {/* <ExtendedDetails show={show.aboutShow} /> */}
          {/* fifth section - more details*/}
          <div ref={aboutShow} className="showInfo__details bottom">
            <h3 className="showInfo__subHeading">
              About {showTitleHandler(title, name)}{" "}
            </h3>

            <ExtendedDetails show={show.aboutShow} />

            {/* casts */}
            {/* {credits.cast.length > 0 && (
              <DetailList list={credits.cast} heading={"Cast:"} />
            )} */}

            {/* Production */}
            {/* {production_companies && production_companies.length > 0 && (
              <DetailList
                list={production_companies}
                heading={"Production Company:"}
              />
            )} */}

            {/* Network */}
            {/* {networks && networks.length > 0 && (
              <DetailList list={networks} heading={"Network:"} />
            )} */}

            {/* Created By */}
            {/* {created_by && created_by.length > 0 && (
              <DetailList list={created_by} heading={"Created By:"} />
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
