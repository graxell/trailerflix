import React from "react";
import InputField from "../../../components/input/InputField";
import Button from "../../../components/button/Button";
import PasswordChecklist from "../../../components/alerts/PasswordChecklist";
import {
  passwordValidator,
  passwordMatchCheck,
} from "../../../utils/AccountsUtils";

const PasswordUpdate = (props) => {
  const { update, setUpdate, setUserDetails, userDetails, onUpdate } = props;
  const { password, newPassword, confirmPassword } = userDetails;

  return (
    <>
      <div className="account__update--container">
        <div className="account__update inner__wrapper">
          <h2>Update Password</h2>
          <div className="account__update--form">
            <InputField
              type={"password"}
              label={"Current Password"}
              name={"password"}
              setValue={(e) => {
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              input={userDetails.password}
              inputStyle={"input__thin input__light"}
            />

            <InputField
              type={"password"}
              label={"New Password"}
              name={"newPassword"}
              setValue={(e) => {
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: passwordValidator(e.target.value),
                });
              }}
              input={newPassword}
              inputStyle={"input__thin input__light"}
            />

            {newPassword && newPassword.error && (
              <PasswordChecklist password={newPassword.data} />
            )}

            <InputField
              type={"password"}
              label={"Confirm New Password"}
              name={"confirmPassword"}
              setValue={(e) => {
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: passwordMatchCheck(
                    newPassword,
                    e.target.value
                  ),
                });
              }}
              input={confirmPassword}
              inputStyle={"input__thin input__light"}
            />

            {confirmPassword && confirmPassword.error && (
              <p className="signUp--alert error">{confirmPassword.error}</p>
            )}
          </div>

          <Button
            styleName={"profiles__btn whiteRed__btn"}
            onClick={() => onUpdate("password", newPassword, password)}
            btnName={"Confirm"}
          />

          <Button
            styleName={"profiles__btn dark__btn"}
            onClick={() => setUpdate({ ...update, password: false })}
            btnName={"Cancel"}
          />
        </div>
      </div>
    </>
  );
};

export default PasswordUpdate;
