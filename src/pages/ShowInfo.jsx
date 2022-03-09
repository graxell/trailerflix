import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";
import Runtime from "../components/Runtime";
import Video from "../components/Video";
import DetailList from "../components/DetailList";
import Banner from "../components/Banner";

const ShowInfo = (props) => {
  //destructure lists
  const {
    screen,
    recs,
    show,
    exit,
    getMovieDetails,
    getRecs,
    setMyList,
    myList,
  } = props;

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
  } = show;

  //show release year only
  const releaseYear = first_air_date
    ? first_air_date.substring(0, 4)
    : release_date
    ? release_date.substring(0, 4)
    : "Unknown";

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
  const displayRecsHandler = () => (recs && recs.length > 0 ? "block" : "none");

  return (
    <>
      {/* top of the page - poster & titles */}
      <div key={id} className="showInfo__container">
        <Banner
          screen={screen}
          bannerShow={show}
          exit={exit}
          setMyList={setMyList}
          myList={myList}
        />

        {/* second section - small show info */}
        <div className="showInfo__details">
          <div className="showInfo__left">
            <ul>
              <li>{releaseYear}</li>
              <li>{duration()}</li>
              <li>{vote_average}</li>
            </ul>
            <p>{overview}</p>
          </div>

          <div className="showInfo__right">
            <ul className="showInfo__details--list list__inline">
              <h3>Genres:</h3>
              {genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          </div>
        </div>

        {/* third section - trailers and other videos*/}
        <div className="showInfo__videos">
          <h3 className="showInfo__subHeading">Trailers & More</h3>
          <div className="showInfo__trailers">
            <Video videos={videos.results} />
          </div>
        </div>

        {/* fourth section - more like this - show recommendation */}
        <div
          className="showInfo__videos"
          style={{ display: displayRecsHandler() }}
        >
          <h3 className="showInfo__subHeading">More Like This</h3>
          <div className="showInfo__recs">
            <ShowThumbnail
              showList={recs}
              getMovieDetails={getMovieDetails}
              getRecs={getRecs}
            />
          </div>
        </div>

        {/* fifth section - more details*/}
        <div className="showInfo__details bottom">
          <h3 className="showInfo__subHeading">About {showTitle} </h3>

          {/* casts */}
          <DetailList list={credits.cast} heading={"Cast:"} />

          {/* crews */}
          {/* <DetailList list={credits.crew} heading={"Crew:"} /> */}

          {/* Production */}
          <DetailList
            list={production_companies}
            heading={"Production Company:"}
          />

          {/* Network */}
          {networks && <DetailList list={networks} heading={"Network:"} />}

          {created_by && (
            <DetailList list={created_by} heading={"Created By:"} />
          )}
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
