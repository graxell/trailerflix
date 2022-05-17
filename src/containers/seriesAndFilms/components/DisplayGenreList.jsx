import React from "react";
import { getShowsByGenre } from "../../../controllers/apiController";
import ListItem from "../../../components/list/Listitem";

const DisplayGenreList = (props) => {
  const { genres, setShowList, mediaType } = props;

  return (
    <>
      <ul className="genre__list">
        {genres &&
          genres.map((genre) => {
            const { id, name } = genre;
            return (
              <ListItem
                styleName={"genre--box"}
                key={id}
                itemName={name}
                onClick={() => {
                  getShowsByGenre(mediaType, id, name).then((results) =>
                    setShowList(results)
                  );
                }}
              />
            );
          })}
      </ul>
    </>
  );
};

export default DisplayGenreList;
