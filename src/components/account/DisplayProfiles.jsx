import React from "react";
import ProfileCard from "./ProfileCard";

const DisplayProfiles = (props) => {
  const { allProfiles, setProfile, profile, manageAll, setManageAll } = props;
  return (
    <>
      <h2 className="profiles__heading">
        {profile.manage ? "Manage Profiles:" : "Who's Watching?"}
      </h2>

      <ProfileCard
        list={allProfiles}
        setProfile={setProfile}
        profile={profile}
        setManageAll={setManageAll}
        manageAll={manageAll}
      />

      {!profile.manage ? (
        <div
          onClick={() => {
            setProfile({ ...profile, manage: true });
          }}
          className="profiles__btn dark__btn"
        >
          Manage Profiles
        </div>
      ) : (
        <div
          onClick={() => {
            setProfile({ ...profile, manage: false });
          }}
          className="profiles__btn whiteRed__btn"
        >
          Done
        </div>
      )}
    </>
  );
};

export default DisplayProfiles;
