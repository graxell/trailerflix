import poster_Alt from "../../assets/images/poster_Alt.png";
import {
  imageUrlPath,
  getMediaType,
  showTitleHandler,
  showReleaseDate,
  showRatings,
} from "../../utils/DataUtils";
import { getMovieDetails } from "../../controllers/apiController";

const ShowThumbnail = (props) => {
  const { show, setShow, showList, addButtonHandler } = props;

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

  const media = getMediaType(title);

  const getShow = () => {
    getMovieDetails(media, id).then((result) =>
      setShow((prevState) => {
        return { ...prevState, aboutShow: result };
      })
    );
  };

  return (
    <>
      {media_type !== "person" && (
        <div key={id} className="thumbnail__container">
          <img
            onClick={getShow}
            src={imageUrlPath(poster_path, poster_Alt)}
            alt={showTitleHandler(title, name)}
            className="thumbnail__img"
          />

          <div className="thumbnail__details--wrapper">
            <h2 className="thumbnail__title" onClick={getShow}>
              {showTitleHandler(title, name)}
            </h2>

            <div className="thumbnail__bottom">
              <p>
                {showReleaseDate(release_date, first_air_date).substring(0, 4)}
              </p>
              <p>{showRatings(vote_average)}</p>
              {addButtonHandler(showList, id)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowThumbnail;
