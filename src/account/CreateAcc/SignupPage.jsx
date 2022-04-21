import React, { useState } from "react";
import axios from "axios";
import CreateAccount from "./CreateAccount";
import { emailValidator } from "../AccountsUtils";
import ErrorMessage from "./ErrorMessage";

const SignupPage = (props) => {
  const [signUpEmail, setSignUpEmail] = useState();
  const [screen, setScreen] = useState(0);
  const [errorShake, setErrorShake] = useState("error");

  const { getScreenPage } = props;

  const onInput = (e) => {
    setSignUpEmail(emailValidator(e.target.value));
  };

  const onSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:6065/emailCheck/", {
        email: signUpEmail.data,
      });

      if (response.data.status === 0) {
        setSignUpEmail({
          valid: false,
          error: response.data.error,
        });
        console.log(response.data.error);
      } else {
        setScreen(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(signUpEmail);

  return (
    <>
      {screen === 0 && (
        <div className="signUp__container">
          <h2 className="signUp__heading">
            Find your new favourite films and TV shows!
          </h2>

          <div className="signUp__form">
            <h3>
              Ready for your next watch? Enter your email to create an account.
            </h3>

            {/* Input form */}
            <div className="signUp__input">
              <input
                onInput={onInput}
                type="text"
                name="email"
                placeholder="Email address"
              />

              <button
                className="signUp__input--btn"
                onClick={() =>
                  signUpEmail && signUpEmail.valid === false
                    ? setErrorShake("error shake")
                    : onSignUp()
                }
              >
                Get Started &rsaquo;
              </button>
            </div>

            {/* Error message */}
            {signUpEmail && signUpEmail.error && (
              <ErrorMessage
                errorShake={errorShake}
                setErrorShake={setErrorShake}
                error={signUpEmail.error}
              />
            )}
          </div>
        </div>
      )}

      {signUpEmail && screen === 1 && (
        <CreateAccount
          getScreenPage={getScreenPage}
          signUpEmail={signUpEmail.data}
        />
      )}
    </>
  );
};

export default SignupPage;
