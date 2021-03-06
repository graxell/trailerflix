import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailValidator } from "../../../utils/AccountsUtils";
import ErrorMessage from "../../../components/alerts/ErrorMessage";
import InputField from "../../../components/input/InputField";
import { signInReq } from "../../../controllers/dbController";

const Signin = (props) => {
  const [errorShake, setErrorShake] = useState("error");
  const [errorMessage, setErrorMessage] = useState();
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signInDetails;

  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e.target.name === "email") {
      setSignInDetails({
        ...signInDetails,
        [e.target.name]: emailValidator(e.target.value),
      });
    } else {
      setSignInDetails({
        ...signInDetails,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSignIn = (email, password) => {
    signInReq(email, password).then((result) => {
      if (result === true) {
        navigate("/profiles");
      } else {
        setErrorMessage(result.error);
      }
    });
  };

  return (
    <>
      <div className="signIn__container image__background">
        <div className="signIn__input--wrapper">
          <h2 className="signIn__header">Sign In</h2>
          <ErrorMessage
            error={email.error || errorMessage}
            errorShake={errorShake}
            setErrorShake={setErrorShake}
          />

          {Object.keys(signInDetails).map((key, index) => {
            return (
              <InputField
                key={index}
                setValue={handleInput}
                type={key === "password" ? "password" : "text"}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                input={signInDetails[key]}
                inputStyle={"input__light"}
              />
            );
          })}
          <button
            className="signIn__btn"
            onClick={() => onSignIn(email, password)}
          >
            Sign In
          </button>

          <div className="signIn__signUp--link">
            <p>
              New to Trailerflix?{" "}
              <span className="link" onClick={() => navigate("/signup")}>
                Sign up now!
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
