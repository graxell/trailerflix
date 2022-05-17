import React from "react";
import { accountColours } from "../../../utils/AccountsUtils";

const ProfilePic = (props) => {
  const { index, profiles, manageAll, profileName, sizeSelector } = props;

  const border =
    profiles.manage && !manageAll.edit ? "darkBorder" : "lightBorder";
  return (
    <>
      <div
        className={`profile__picture ${border} ${accountColours[index]} ${sizeSelector}`}
      >
        {manageAll.add ? (
          <img src={profileName} alt={`${profileName} profile icon`} />
        ) : (
          profileName && profileName.substring(0, 1)
        )}
      </div>
    </>
  );
};

export default ProfilePic;
