import React from "react";
import AccountDetails from "../components/AccountDetails";
import Button from "../../../components/button/Button";
import { useEffect, useState } from "react";
import {
  deleteAccount,
  getUserDetails,
  updateRequest,
} from "../../../controllers/dbController";
import { getDate } from "../../../utils/DataUtils";
import PasswordUpdate from "../components/PasswordUpdate";
import EmailUpdate from "../components/EmailUpdate";
import DeleteAccount from "../components/DeleteAccount";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [update, setUpdate] = useState({});

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // get User Details
  const fetchUserDetails = async () => {
    const result = await getUserDetails();
    if (result) {
      setUserDetails(result);
    } else {
      setUserDetails("Cannot retrive your details right now.");
    }
  };

  //to update account details
  const onUpdate = async (type, payload, password) => {
    const result = await updateRequest(type, payload, password);
    if (result) {
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
  };

  //to delete account
  const onDelete = async (email, password) => {
    const result = await deleteAccount(email, password);
    if (result && !result.error) {
      localStorage.clear();
      navigate("/");
    } else {
      setUpdate({ ...update, error: result });
    }
  };

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

        <Button
          onClick={() => {
            setUpdate({ ...update, deleteUser: true });
          }}
          styleName={"profiles__btn dark__btn"}
          btnName={"Delete Account"}
        />

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

        {update && update.deleteUser && (
          <DeleteAccount
            userDetails={userDetails}
            update={update}
            setUpdate={setUpdate}
            setUserDetails={setUserDetails}
            onDelete={onDelete}
          />
        )}
      </div>
    </>
  );
};

export default MyAccount;
