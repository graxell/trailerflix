import React from "react";
import Thumbnail from "./Thumbnail";

const ThumbnailGrid = (props) => {
  const { lists, show, addButtonHandler, setShow } = props;
  return (
    <>
      {lists &&
        lists.length > 0 &&
        lists.map((item, index) => {
          return (
            <Thumbnail
              key={index}
              showList={item}
              show={show}
              setShow={setShow}
              addButtonHandler={addButtonHandler}
            />
          );
        })}
    </>
  );
};

export default ThumbnailGrid;
