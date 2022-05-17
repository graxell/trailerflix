import React from "react";
import ProfileCard from "./ProfileCard";
import Button from "../../../components/button/Button";

const DisplayProfiles = (props) => {
  const {
    onAssignProfile,
    setIsSignedIn,
    setProfiles,
    profiles,
    manageAll,
    setManageAll,
  } = props;
  return (
    <>
      <h2 className="profiles__heading">
        {profiles && profiles.manage ? "Manage Profiles:" : "Who's Watching?"}
      </h2>

      <ProfileCard
        list={profiles.all}
        setProfiles={setProfiles}
        profiles={profiles}
        setManageAll={setManageAll}
        manageAll={manageAll}
        setIsSignedIn={setIsSignedIn}
        onAssignProfile={onAssignProfile}
      />

      {!profiles.manage ? (
        <Button
          onClick={() => setProfiles({ ...profiles, manage: true })}
          styleName={"profiles__btn dark__btn"}
          btnName={"Manage Profiles"}
        />
      ) : (
        <Button
          onClick={() => setProfiles({ ...profiles, manage: false })}
          styleName={"profiles__btn whiteRed__btn"}
          btnName={"Done"}
        />
      )}
    </>
  );
};

export default DisplayProfiles;
