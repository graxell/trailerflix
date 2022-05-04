import React from "react";
import ShowThumbnail from "../shared/ShowThumbnail";

const DisplayShowListSlider = (props) => {
  const { lists, setShow, addButtonHandler, headingHandler, show } = props;

  console.log(lists);

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

      {/*{lists.map((list) => {
        list.map((item) => {
          <div>{item.id}</div>;
        });
      })}


       {lists.map((list, index) => {
        console.log(list);
        const { data, error, isLoading, key } = list;
        <div key={index} className="homepage__lists">
          <h2>{headingHandler(key)}</h2>
          
          {isLoading && <p>Loading...</p>}

          {error && <p>{error}</p>}

          {!error &&
            data.map((item, key) => {
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
        </div>;
      })} */}
    </>
  );
};

export default DisplayShowListSlider;
