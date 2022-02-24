import Image from "./Image";
import Details from "./Details";

const ShowThumbnail = (props) => {
  const { showList, getMovieDetails, getRecs } = props;

  //
  const runShowDetails = (mediaType, movieId) => {
    getMovieDetails(mediaType, movieId);
    getRecs(mediaType, movieId);
  };

  //handles what to run depending on media type
  const mediaTypeHandler = (title, movieId) => {
    if (title) {
      runShowDetails("tv", movieId);
    } else {
      runShowDetails("movie", movieId);
    }
  };

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

        return (
          media_type !== "person" && (
            <div
              key={id}
              className="thumbnail__container"
              onClick={() => mediaTypeHandler(name, id)}
            >
              <Image id={id} poster={poster_path} title={showTitle} />

              <Details
                title={showTitle}
                genre={genre_id}
                ratings={vote_average}
                releaseDate={
                  first_air_date
                    ? first_air_date.substring(0, 4)
                    : release_date.substring(0, 4)
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
