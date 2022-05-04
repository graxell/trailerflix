import React from "react";
import { getShowsByGenre } from "../../controllers/apiController";

const DisplayGenreList = (props) => {
  const { genres, setShowList, mediaType } = props;

  return (
    <>
      <ul className="genre__list">
        {genres &&
          genres.map((genre) => {
            const { id, name } = genre;
            return (
              <li
                className="genre--box"
                key={id}
                onClick={() => {
                  getShowsByGenre(mediaType, id, name).then((results) =>
                    setShowList(results)
                  );
                }}
              >
                {name}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default DisplayGenreList;
