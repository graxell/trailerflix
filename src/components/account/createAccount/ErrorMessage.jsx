import React from "react";
import { useEffect, useState } from "react";

const ErrorMessage = (props) => {
  const { error } = props;

  const [errorShake, setErrorShake] = useState();

  useEffect(() => {
    setErrorShake("error shake");
  }, [error]);

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
