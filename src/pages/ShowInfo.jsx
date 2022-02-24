import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";
import Runtime from "../components/Runtime";
import Video from "../components/Video";

const ShowInfo = (props) => {
  //destructure props.show
  const {
    id,
    first_air_date,
    release_date,
    title,
    name,
    backdrop_path,
    vote_average,
    runtime,
    videos,
    genres,
    overview,
    number_of_seasons,
    tagline,
  } = props.show;

  // backdrop path
  const backdropURL = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

  //show release year only
  const releaseYear = first_air_date
    ? first_air_date.substring(0, 4)
    : release_date.substring(0, 4);

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

  //handling recommendation list
  const displayRecsHandler = () =>
    props.recs && props.recs.length > 0 ? "block" : "none";

  //checking if data is film or tv to display title
  const showTitle = title ? title : name;

  return (
    <>
      {/* top of the page - poster & titles */}
      <div key={id} className="movie__container">
        <div className="movie__backdrop">
          <button className="btn--circle btn__exit" onClick={props.exit}>
            &#10005;
          </button>

          {backdrop_path ? (
            <img src={backdropURL} alt={showTitle} />
          ) : (
            <div className="backdrop__alt">No available backdrop poster!</div>
          )}

          {/* top section - buttons */}
          <div className="movie__headings">
            {tagline && <p>{tagline}</p>}
            <h2>{showTitle}</h2>
            <div className="movie__btns">
              <button
                className="movie__btn--play"
                onClick={() => {
                  console.log("Play Button was clicked!");
                }}
              >
                Play
              </button>
              <button
                className="movie__btn--add btn--circle"
                onClick={() => {
                  console.log("Add Button was clicked!");
                }}
              >
                &#43;
              </button>
              <button
                className="movie__btn--like btn--circle"
                onClick={() => {
                  console.log("Like Button was clicked!");
                }}
              >
                &#128077;
              </button>
              <button
                className="movie__btn--dislike btn--circle"
                onClick={() => {
                  console.log("Dislike Button was clicked!");
                }}
              >
                &#128078;
              </button>
            </div>
          </div>
        </div>

        {/* second section - small show info */}
        <div className="movie__details">
          <div className="movie__left">
            <ul>
              <li>{releaseYear}</li>
              <li>{duration()}</li>
              <li>{vote_average}</li>
            </ul>
            <p>{overview}</p>
          </div>

          <div className="movie__right">
            <ul className="movie__genre">
              <h3>Genres:</h3>
              {genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          </div>
        </div>

        {/* third section - trailers and other videos*/}
        <div className="movie__videos">
          <h3>Trailers & More</h3>
          <div className="movie__trailers">
            <Video videos={videos.results} />
          </div>
        </div>

        {/* fourth section - more like this - show recommendation */}
        <div
          className="movie__videos"
          style={{ display: displayRecsHandler() }}
        >
          <h3>More Like This</h3>
          <div className="movie_recs">
            <ShowThumbnail
              showList={props.recs}
              getMovieDetails={props.getMovieDetails}
              getRecs={props.getRecs}
            />
          </div>
        </div>

        {/* fifth section - more details
        <div className="movie__details">
          <h3>Cast:</h3>
          {props.shows.credits.casts.map((cast) => {
            <li>{cast.name}</li>;
          })}
        </div> */}
      </div>
    </>
  );
};

export default ShowInfo;
