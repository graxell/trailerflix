import React from "react";

const ErrorMessage = (props) => {
  const { error, errorShake, setErrorShake } = props;

  return (
    <>
      <p
        className={errorShake}
        onAnimationEnd={() => {
          setErrorShake("error");
        }}
      >
        {error}
      </p>
    </>
  );
};

export default ErrorMessage;
