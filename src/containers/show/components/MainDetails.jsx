import React from "react";
import Runtime from "./Runtime";
import {
  displayReleaseDate,
  showReleaseDate,
  displayLanguage,
} from "../../../utils/DataUtils";

const MainDetails = (props) => {
  const { show } = props;
  const {
    release_date,
    first_air_date,
    vote_average,
    runtime,
    overview,
    number_of_seasons,
    genres,
    original_language,
  } = show;

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

  const releaseDate = displayReleaseDate(
    showReleaseDate(release_date, first_air_date)
  );

  const scrollToBottom = () => {
    show.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="showInfo__details">
        <div className="showInfo__left">
          <ul>
            <li>
              {showReleaseDate(release_date, first_air_date) === "Unknown"
                ? "Unknown"
                : showReleaseDate(release_date, first_air_date).substring(0, 4)}
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
              <li>{displayLanguage.of(original_language)}</li>
            </ul>
          )}

          {/* <button className="showInfo__more" onClick={scrollToBottom}>
            More info...
          </button> */}
        </div>
      </div>
    </>
  );
};

export default MainDetails;
