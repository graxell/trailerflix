import React from "react";
import Button from "../../../components/button/Button";

const AccountDetails = (props) => {
  const { userDetails, update, setUpdate } = props;
  const { email } = userDetails;
  return (
    <>
      <div className="account__details--container">
        <div className="account__detail">
          <h3 className="account__detail--label">Email</h3>
          <p className="account__detail--info">{email}</p>
          {update && update.account && (
            <Button
              styleName={"account__change--btn"}
              onClick={() => setUpdate({ ...update, email: true })}
              btnName={"Change"}
            />
          )}
        </div>

        <div className="account__detail">
          <h3 className="account__detail--label ">Password</h3>
          <p className="account__detail--info">*******</p>

          {update && update.account && (
            <>
              <Button
                styleName={"account__change--btn"}
                onClick={() => setUpdate({ ...update, password: true })}
                btnName={"Change"}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
