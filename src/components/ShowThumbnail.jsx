import poster_Alt from "../assets/images/poster_Alt.png";

const ShowThumbnail = (props) => {
  const { showList, getMovieDetails, addButtonHandler } = props;

  const {
    id,
    title,
    name,
    media_type,
    poster_path,
    vote_average,
    first_air_date,
    release_date,
  } = showList;

  const showTitle = title ? title : name;
  const posterURL = `https://image.tmdb.org/t/p/original/${poster_path}`;
  const posterImg = poster_path ? posterURL : poster_Alt;
  const releaseYear = first_air_date
    ? first_air_date.substring(0, 4)
    : release_date
    ? release_date.substring(0, 4)
    : "Unknown";

  const ratings =
    vote_average > 3 ? Math.round(vote_average * 10) / 10 : vote_average;

  //handles api call depending on media type
  const mediaTypeHandler = (title, movieId) => {
    if (title) {
      getMovieDetails("tv", movieId);
    } else {
      getMovieDetails("movie", movieId);
    }
  };

  return (
    <>
      {media_type !== "person" && (
        <div key={id} className="thumbnail__container">
          <img
            onClick={() => mediaTypeHandler(name, id)}
            src={posterImg}
            alt={showTitle}
            className="thumbnail__img"
          />

          <div className="thumbnail__details--wrapper">
            <h2 className="thumbnail__title">{showTitle}</h2>

            <div className="thumbnail__bottom">
              <p>{releaseYear}</p>
              <p>{ratings}</p>
              {addButtonHandler(showList, id)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowThumbnail;
