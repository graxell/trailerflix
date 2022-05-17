import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/input/InputField";
import PasswordChecklist from "../../../components/alerts/PasswordChecklist";
import SuccessMessage from "../../../components/alerts/SuccessMessage";
import { signUpPost } from "../../../controllers/dbController";
import {
  passwordValidator,
  emailValidator,
  passwordMatchCheck,
  nameLength,
} from "../../../utils/AccountsUtils";

const CreateAccount = (props) => {
  const navigate = useNavigate();

  // states
  const [isSuccess, setIsSuccess] = useState(false);
  const [input, setInput] = useState({});

  //destructuring
  const { user_name, email, password, repeatedPassword } = input;
  const { signUpEmail } = props;

  //when mounted
  useEffect(() => {
    setInput({ ...input, email: signUpEmail });
  }, []);

  const onSignUp = () => {
    signUpPost(user_name, email, password).then((result) => {
      if (result) {
        setIsSuccess(true);
        setTimeout(() => navigate("/signin"), 1000);
      } else {
      }
    });
  };

  console.log(input, input.length);

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
            }}
            type={"text"}
            label={"Name"}
            name={"user_name"}
            input={user_name}
            inputStyle={"input__light"}
          />

          {user_name && user_name.error && (
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
            value={email}
            inputStyle={"input__light"}
          />
          {email && email.error && (
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
            label={password ? "Password" : "Add a password"}
            name={"password"}
            input={password}
            inputStyle={"input__light"}
          />
          <p className="signUp--alert error"></p>

          {password && password.error && (
            <PasswordChecklist password={password.data} />
          )}
        </div>

        {/* -- CONFIRM PASSWORD -- */}
        <div
          className={
            repeatedPassword && !repeatedPassword.error
              ? "signUp__field__sections .valid"
              : "signUp__field__sections"
          }
        >
          <InputField
            setValue={(e) => {
              setInput({
                ...input,
                [e.target.name]: passwordMatchCheck(password, e.target.value),
              });
            }}
            type={"password"}
            label={"Confirm password"}
            name={"repeatedPassword"}
            input={repeatedPassword}
            inputStyle={"input__light"}
          />
          {repeatedPassword && repeatedPassword.error && (
            <p className="signUp--alert error">{repeatedPassword.error}</p>
          )}
        </div>

        {Object.values(input).every((item) => !item.error) &&
          Object.keys(input).length === 4 && (
            <button className="signIn__btn" onClick={onSignUp}>
              Sign Up
            </button>
          )}

        {isSuccess && <SuccessMessage />}
      </div>
    </>
  );
};

export default CreateAccount;
