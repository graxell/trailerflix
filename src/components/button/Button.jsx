import React from "react";

const Button = (props) => {
  const { styleName, btnName, onClick } = props;
  return (
    <>
      <button onClick={onClick} className={styleName}>
        {btnName}
      </button>
    </>
  );
};

export default Button;
