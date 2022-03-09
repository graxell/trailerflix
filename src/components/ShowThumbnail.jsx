import Details from "./Details";
import poster_Alt from "../assets/images/poster_Alt.png";

const ShowThumbnail = (props) => {
  const { showList, getMovieDetails, getRecs } = props;

  //handles api call depending on media type
  const mediaTypeHandler = (title, movieId) => {
    if (title) {
      getMovieDetails("tv", movieId);
      getRecs("tv", movieId);
    } else {
      getMovieDetails("movie", movieId);
      getRecs("movie", movieId);
    }
  };

  // const showListChecked = Array.isArray(showList)
  //   ? showList
  //   : Object.keys(showList).map((key) => showList[key]);

  const thumbnail = () => {
    return (
      showList &&
      showList.map((show) => {
        //destructure show
        const {
          id,
          title,
          name,
          media_type,
          poster_path,
          genre_id,
          vote_average,
          first_air_date,
          release_date,
        } = show;

        const showTitle = title ? title : name;
        const posterURL = `https://image.tmdb.org/t/p/original/${poster_path}`;
        const posterImg = poster_path ? posterURL : poster_Alt;

        return (
          media_type !== "person" && (
            <div
              key={id}
              className="thumbnail__container"
              onClick={() => mediaTypeHandler(name, id)}
            >
              <img src={posterImg} alt={title} className="thumbnail__img" />

              <Details
                title={showTitle}
                genre={genre_id}
                ratings={vote_average}
                releaseDate={
                  first_air_date
                    ? first_air_date.substring(0, 4)
                    : release_date
                    ? release_date.substring(0, 4)
                    : "Unknown"
                }
              />
            </div>
          )
        );
      })
    );
  };

  return <>{thumbnail()}</>;
};

export default ShowThumbnail;
