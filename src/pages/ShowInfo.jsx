import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";
import Runtime from "../components/Runtime";
import Video from "../components/Video";
import DetailList from "../components/DetailList";
import Banner from "../components/Banner";
import { useRef } from "react";

const ShowInfo = (props) => {
  //destructure lists
  const { screen, show, exit, getMovieDetails, addButtonHandler } = props;

  const {
    id,
    title,
    name,
    first_air_date,
    release_date,
    vote_average,
    runtime,
    videos,
    genres,
    overview,
    number_of_seasons,
    credits,
    networks,
    created_by,
    production_companies,
    original_language,
  } = show.aboutShow;

  //show release date
  const release = first_air_date
    ? first_air_date
    : release_date
    ? release_date
    : "Unknown";

  //code converters
  const releaseDate = new Date(release).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const language = new Intl.DisplayNames(["en"], {
    type: "language",
  });

  //handling show duration
  const duration = () => {
    if (runtime) {
      return <Runtime runtime={runtime} />;
    } else if (number_of_seasons === 1) {
      return <div>{number_of_seasons} Season</div>;
    } else {
      return <div>{number_of_seasons} Seasons</div>;
    }
  };

  //handling show title
  const showTitle = title ? title : name;

  //handling recommendation list
  const displayRecsHandler = () =>
    show.showRecs && show.showRecs.length > 0 ? "block" : "none";

  //scroll to bottom
  const aboutShow = useRef(null);

  const scrollToBottom = () => {
    aboutShow.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* top of the page - poster & titles */}
      <div key={id} className="showInfo__container">
        <div>
          <Banner
            screen={screen}
            bannerShow={show.aboutShow}
            show={show}
            exit={exit}
            addButtonHandler={addButtonHandler}
          />

          {/* second section - small show info */}
          <div className="showInfo__details">
            <div className="showInfo__left">
              <ul>
                <li>
                  {release === "Unknown" ? "Unknown" : release.substring(0, 4)}
                </li>
                <li>{duration()}</li>
                <li>{vote_average}</li>
              </ul>
              <p>{overview}</p>
            </div>

            <div className="showInfo__right">
              <ul className="showInfo__details--list list__inline">
                <h4>Genres:</h4>
                {genres.map((genre) => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
              <ul className="showInfo__details--list list__inline">
                <h4>Release Date:</h4>
                <li>{releaseDate}</li>
              </ul>
              {original_language && (
                <ul className="showInfo__details--list list__inline">
                  <h4>Original Language:</h4>
                  <li>{language.of(original_language)}</li>
                </ul>
              )}

              <button className="showInfo__more" onClick={scrollToBottom}>
                More info...
              </button>
            </div>
          </div>

          {/* third section - trailers and other videos*/}
          <div className="showInfo__videos">
            <h3 className="showInfo__subHeading">Trailers & More</h3>
            <div className="showInfo__trailers">
              {videos.results.length > 0 ? (
                <Video videos={videos.results} />
              ) : (
                `Videos for " ${showTitle} " are coming soon!`
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
              {show.showRecs &&
                show.showRecs.map((show, index) => {
                  return (
                    <ShowThumbnail
                      key={index}
                      showList={show}
                      getMovieDetails={getMovieDetails}
                      addButtonHandler={addButtonHandler}
                    />
                  );
                })}
            </div>
          </div>

          {/* fifth section - more details*/}
          <div ref={aboutShow} className="showInfo__details bottom">
            <h3 className="showInfo__subHeading">About {showTitle} </h3>

            {/* casts */}
            {credits.cast.length > 0 && (
              <DetailList list={credits.cast} heading={"Cast:"} />
            )}

            {/* Production */}
            {production_companies && production_companies.length > 0 && (
              <DetailList
                list={production_companies}
                heading={"Production Company:"}
              />
            )}

            {/* Network */}
            {networks && networks.length > 0 && (
              <DetailList list={networks} heading={"Network:"} />
            )}

            {/* Created By */}
            {created_by && created_by.length > 0 && (
              <DetailList list={created_by} heading={"Created By:"} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
