import React from "react";
import ShowThumbnail from "./ShowThumbnail";

const DisplayThumbnailList = (props) => {
  const { lists, show, addButtonHandler, setShow } = props;
  return (
    <>
      {lists &&
        lists.length > 0 &&
        lists.map((item, index) => {
          return (
            <ShowThumbnail
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

export default DisplayThumbnailList;
