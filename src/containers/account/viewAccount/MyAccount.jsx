import React from "react";
import AccountDetails from "../components/AccountDetails";
import Button from "../../../components/button/Button";
import { useEffect, useState } from "react";
import {
  getUserDetails,
  updateRequest,
} from "../../../controllers/dbController";
import { getDate } from "../../../utils/DataUtils";
import PasswordUpdate from "../components/PasswordUpdate";
import EmailUpdate from "../components/EmailUpdate";

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState({});
  const [update, setUpdate] = useState({});

  useEffect(() => {
    getUserDetails().then((result) => {
      setUserDetails(result);
    });
  }, []);

  const onUpdate = (type, payload, password) => {
    updateRequest(type, payload, password).then((result) => {
      if (result) {
        console.log(result);
        setUpdate({
          ...update,
          password: false,
          email: false,
          success: result,
        });
        getUserDetails().then((result) => {
          setUserDetails(result);
        });
      } else {
        setUpdate({ ...update, error: result });
      }
    });
  };

  console.log(update, userDetails);
  return (
    <>
      <div className="account--container">
        <h2 className="account__heading line__divider">
          My Account{" "}
          <span>{`Member since ${getDate(userDetails.entry_date)}`}</span>
        </h2>

        <AccountDetails
          userDetails={userDetails}
          update={update}
          setUpdate={setUpdate}
        />

        {update && !update.account ? (
          <Button
            onClick={() => {
              setUpdate({ ...update, account: true });
            }}
            styleName={"profiles__btn dark__btn"}
            btnName={"Update Account"}
          />
        ) : (
          <Button
            onClick={() => {
              setUpdate({ ...update, account: false });
            }}
            styleName={"profiles__btn whiteRed__btn"}
            btnName={"Done"}
          />
        )}

        {update && update.password && (
          <PasswordUpdate
            userDetails={userDetails}
            update={update}
            setUpdate={setUpdate}
            setUserDetails={setUserDetails}
            onUpdate={onUpdate}
          />
        )}

        {update && update.email && (
          <EmailUpdate
            userDetails={userDetails}
            update={update}
            setUpdate={setUpdate}
            setUserDetails={setUserDetails}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </>
  );
};

export default MyAccount;
