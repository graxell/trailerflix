import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emailValidator } from "../../utils/AccountsUtils";
import ErrorMessage from "../account/createAccount/ErrorMessage";
import InputField from "./InputField";

const Signin = (props) => {
  const [errorShake, setErrorShake] = useState("error");
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });

  const { setIsSignedIn } = props;
  const { email, password } = signInDetails;

  console.log(signInDetails);

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

  //  ---- IN API CONTROLLER
  const onSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:6065/signin/", {
        email: email.data,
        password: password,
      });

      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        // localStorage.setItem("user_name", response.data.user_name);
        // localStorage.setItem("email", email.data);
        setIsSignedIn(true);
        navigate("/");
        // console.log(response.data);
      } else {
        setSignInDetails({
          ...signInDetails,
          email: { error: response.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const key = Object.values(signInDetails);
  console.log(key);

  return (
    <>
      <div className="signIn__container image__background">
        <div className="signIn__input--wrapper">
          <h2 className="signIn__header">Sign In</h2>
          <ErrorMessage
            error={email.error}
            errorShake={errorShake}
            setErrorShake={setErrorShake}
          />

          {Object.keys(signInDetails).map((key) => {
            return (
              <InputField
                setValue={handleInput}
                type={key === "password" ? "password" : "text"}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                input={signInDetails[key]}
              />
            );
          })}
          <button className="signIn__btn" onClick={onSignIn}>
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

        {/* <DisplayProfile /> */}
      </div>
    </>
  );
};

export default Signin;
