import React from "react";
import InputField from "../../../components/input/InputField";
import Button from "../../../components/button/Button";
import { deleteAccount } from "../../../controllers/dbController";

const DeleteAccount = (props) => {
  const { update, setUpdate, setUserDetails, userDetails, onDelete } = props;
  const { email, password } = userDetails;

  return (
    <>
      <div className="account__update--container">
        <div className="account__update inner__wrapper">
          <h2>Delete Account</h2>
          <p>
            *Warning: This will permanently remove your details and lists from
            Trailerflix .
          </p>
          <div className="account__update--form">
            <InputField
              type={"text"}
              label={"Email"}
              name={"email"}
              setValue={(e) => {
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              input={email}
              inputStyle={"input__thin input__light"}
            />

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
          <Button
            styleName={"profiles__btn whiteRed__btn"}
            onClick={() => onDelete(email, password)}
            btnName={"Confirm"}
          />

          <Button
            styleName={"profiles__btn dark__btn"}
            onClick={() => setUpdate({ ...update, deleteUser: false })}
            btnName={"Cancel"}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
