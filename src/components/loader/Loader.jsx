import React from "react";

const Loader = (props) => {
  const { tag } = props;
  return (
    <>
      <div className="loader--container">
        <div className="loader"></div>
        <p>{tag}</p>
      </div>
    </>
  );
};

export default Loader;
