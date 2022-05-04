import React from "react";
import ShowThumbnail from "../shared/ShowThumbnail";

const DisplayShowListSlider = (props) => {
  const { lists, setShow, addButtonHandler, headingHandler, show } = props;
  return (
    <>
      {Object.keys(lists).map((key, index) => {
        return (
          <div key={index} className="homepage__lists">
            <h2>{headingHandler(key)}</h2>
            <div className="homepage__sliders">
              {lists[key].map((item, key) => {
                return (
                  <ShowThumbnail
                    key={key}
                    showList={item}
                    addButtonHandler={addButtonHandler}
                    setShow={setShow}
                    show={show}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DisplayShowListSlider;
