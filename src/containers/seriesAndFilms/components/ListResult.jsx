import React from "react";
import ThumbnailGrid from "../../../components/thumbnail/ThumbnailGrid";

const ListResult = (props) => {
  const { heading, show, setShow, setShowList, showList, addButtonHandler } =
    props;

  const { shows, topic, mediaType } = showList;

  return (
    <>
      {/* HEADING */}
      <div className="list__results--container">
        {!mediaType && shows ? (
          <h2 className="list__results--heading">
            Search results for: " {topic} "
          </h2>
        ) : (
          <h2 className="list__results--heading">
            <span className="pre--heading" onClick={() => setShowList()}>
              {heading} &gt;{" "}
            </span>{" "}
            {mediaType === "tv" ? `${topic} Programmes` : topic}
          </h2>
        )}

        <div className="list__results">
          {shows ? (
            <ThumbnailGrid
              lists={shows}
              addButtonHandler={addButtonHandler}
              show={show}
              setShow={setShow}
            />
          ) : (
            <div>Sorry, no results found!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListResult;
