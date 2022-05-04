import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputField from "../../signIn/InputField";
import PasswordChecklist from "./PasswordChecklist";
import SuccessMessage from "./SuccessMessage";
import {
  passwordValidator,
  emailValidator,
  passwordMatchCheck,
  nameLength,
} from "../../../utils/AccountsUtils";

import { onSignUp } from "../../../controllers/dbController";

const CreateAccount = (props) => {
  const navigate = useNavigate();

  // states
  const [isSuccess, setIsSuccess] = useState(false);
  const [input, setInput] = useState({
    user_name: {},
    email: {},
    password: {},
    repeatedPassword: {},
  });

  //destructuring
  const { user_name, email, password, repeatedPassword } = input;
  const { getScreenPage, signUpEmail } = props;

  //when mounted
  useEffect(() => {
    setInput({ ...input, email: { valid: true, data: signUpEmail } });
  }, [signUpEmail]);

  //in API CONTROLLER onClick function
  const onSignup = async (user_name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:6065/create-account",
        {
          user_name: user_name.data,
          email: email.data,
          password: password.data,
        }
      );
      // getScreenPage(0),
      console.log(input);
      if (response.data.status) {
        setIsSuccess(true);
        setTimeout(() => navigate("/signin"), 1000);
      } else {
        setInput({ ...input, error: response.data.error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(input);

  return (
    <>
      <div className="signUp__container">
        <h2 className="signUp__heading">Create your account</h2>
        {/* -- USER NAME -- */}
        <div className="signUp__field__sections username">
          <InputField
            setValue={(e) => {
              setInput({
                ...input,
                [e.target.name]: nameLength(e.target.value),
              });
              console.log(input);
            }}
            type={"text"}
            label={"Name"}
            name={"user_name"}
            input={user_name}
          />

          {user_name.valid === false && (
            <p className="signUp--alert error">{user_name.error}</p>
          )}
        </div>

        {/* -- EMAIL -- */}
        <div className="signUp__field__sections email">
          <InputField
            setValue={(e) => {
              setInput({
                ...input,
                [e.target.name]: emailValidator(e.target.value),
              });
            }}
            type={"text"}
            label={"Email"}
            name={"email"}
            input={email}
            value={email.data}
          />
          {email.valid === false && (
            <p className="signUp--alert error">{email.error}</p>
          )}
        </div>

        {/* -- PASSWORD -- */}
        <div className="signUp__field__sections password">
          <InputField
            setValue={(e) => {
              setInput({
                ...input,
                [e.target.name]: passwordValidator(e.target.value),
              });
            }}
            type={"password"}
            label={password.data ? "Password" : "Add a password"}
            name={"password"}
            input={password}
          />
          <p className="signUp--alert error"></p>

          {password.valid === false && (
            <PasswordChecklist password={password} />
          )}
        </div>

        {/* -- CONFIRM PASSWORD -- */}
        <div
          className={
            repeatedPassword.valid === true
              ? "signUp__field__sections .valid"
              : "signUp__field__sections"
          }
        >
          <InputField
            setValue={(e) => {
              setInput({
                ...input,
                [e.target.name]: passwordMatchCheck(
                  password.data,
                  e.target.value
                ),
              });
            }}
            type={"password"}
            label={"Confirm password"}
            name={"repeatedPassword"}
            input={repeatedPassword}
          />
          {repeatedPassword.valid === false && (
            <p className="signUp--alert error">{repeatedPassword.error}</p>
          )}
        </div>

        {Object.values(input).every((item) => item.valid === true) && (
          <button className="signIn__btn" onClick={onSignup}>
            Sign Up
          </button>
        )}

        {isSuccess && <SuccessMessage />}
      </div>
    </>
  );
};

export default CreateAccount;
