import React from "react";

const SuccessMessage = () => {
  return (
    <>
      <div className="signUp__success--container">
        <div className="signUp__success__check">&#10004;</div>
        <div className="signUp__success--alert">
          <h3>Awesome!</h3>
          <p>Your account has been created successfully.</p>
          <p>Login to get started!</p>
        </div>
      </div>
    </>
  );
};

export default SuccessMessage;
