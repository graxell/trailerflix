import React, { useEffect, useRef } from "react";
import Video from "./components/Video";
import Banner from "../../components/banner/Banner";
import MainDetails from "./components/MainDetails";
import ExtendedDetails from "./components/ExtendedDetails";
import { showTitleHandler, getMediaType } from "../../utils/DataUtils";
import { getMovieRecs } from "../../controllers/apiController";
import ThumbnailGrid from "../../components/thumbnail/ThumbnailGrid";

const Show = (props) => {
  //destructure lists
  const { screen, show, setShow, exit, addButtonHandler } = props;

  const { aboutShow, showRecs } = show;

  const { id, title, name, videos } = aboutShow;

  useEffect(() => {
    getMovieRecs(getMediaType(title), id).then((result) =>
      setShow({ ...show, showRecs: result })
    );
  }, []);

  //handling recommendation list
  const displayRecsHandler = () =>
    showRecs && showRecs.length > 0 ? "block" : "none";

  //scroll to bottom
  const moreDetails = useRef(null);

  const scrollToBottom = () => {
    aboutShow.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* top of the page - poster & titles */}
      <div key={id} className="showInfo__container">
        <div className="showInfo__background">
          <Banner
            screen={screen}
            bannerShow={aboutShow}
            show={show}
            exit={exit}
            addButtonHandler={addButtonHandler}
          />

          {/* second section - small show info */}
          <MainDetails show={aboutShow} />

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
              <ThumbnailGrid
                lists={showRecs}
                addButtonHandler={addButtonHandler}
                show={show}
                setShow={setShow}
              />
            </div>
          </div>

          {/* <ExtendedDetails show={show.aboutShow} /> */}
          {/* fifth section - more details*/}
          <div ref={moreDetails} className="showInfo__details bottom">
            <h3 className="showInfo__subHeading">
              About {showTitleHandler(title, name)}{" "}
            </h3>

            {/* more details about show */}
            <ExtendedDetails show={aboutShow} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
