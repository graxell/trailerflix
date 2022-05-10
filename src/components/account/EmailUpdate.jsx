import React from "react";
import InputField from "../signIn/InputField";
import Button from "../shared/Button";
import { emailValidator } from "../../utils/AccountsUtils";
import ErrorMessage from "./createAccount/ErrorMessage";

const EmailUpdate = (props) => {
  const { update, setUpdate, setUserDetails, userDetails, onUpdate } = props;
  const { newEmail, password } = userDetails;
  const toConfirm = [newEmail, password];

  return (
    <>
      <div className="account__update--container">
        <div className="account__update inner__wrapper">
          <h2>Update your Email</h2>
          <p>Please enter your password to confirm your update.</p>
          <div className="account__update--form">
            <InputField
              type={"text"}
              label={"Enter new email"}
              name={"newEmail"}
              setValue={(e) => {
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: emailValidator(e.target.value),
                });
              }}
              input={newEmail}
              inputStyle={"input__thin input__light"}
            />

            {newEmail && newEmail.error && (
              <ErrorMessage error={newEmail.error} />
            )}

            <InputField
              type={"password"}
              label={"Password"}
              name={"password"}
              setValue={(e) => {
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              input={password}
              inputStyle={"input__thin input__light"}
            />
          </div>

          <div className="update__btns--container">
            {Object.values(toConfirm).every((item) => item && !item.error) &&
              Object.keys(toConfirm).length === 2 && (
                <Button
                  styleName={"profiles__btn whiteRed__btn"}
                  onClick={() => onUpdate("email", newEmail, password)}
                  btnName={"Confirm"}
                />
              )}

            <Button
              styleName={"profiles__btn dark__btn"}
              onClick={() => setUpdate({ ...update, email: false })}
              btnName={"Cancel"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailUpdate;
