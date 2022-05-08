import React from "react";

const Button = (props) => {
  const { style, btnName, onClick } = props;
  return (
    <>
      <button onClick={onClick} className={style}>
        {btnName}
      </button>
    </>
  );
};

export default Button;
