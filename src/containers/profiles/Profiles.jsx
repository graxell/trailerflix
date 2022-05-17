import React from "react";
import { useEffect, useState } from "react";
import { getProfiles } from "../../controllers/dbController";
import DisplayProfiles from "./components/DisplayProfiles";
import ManageProfile from "./ManageProfile";

const Profiles = (props) => {
  const { setProfiles, profiles, setIsSignedIn, onAssignProfile } = props;

  const [manageAll, setManageAll] = useState({});

  useEffect(() => {
    getProfiles().then((result) => setProfiles({ ...profiles, all: result }));
  }, []);

  console.log(profiles);

  return (
    <>
      <div className="profiles__container">
        {!manageAll.edit && !manageAll.add && (
          <DisplayProfiles
            setProfiles={setProfiles}
            profiles={profiles}
            setManageAll={setManageAll}
            manageAll={manageAll}
            setIsSignedIn={setIsSignedIn}
            onAssignProfile={onAssignProfile}
          />
        )}

        {manageAll && (manageAll.edit || manageAll.add) && (
          <ManageProfile
            setProfiles={setProfiles}
            profiles={profiles}
            manageAll={manageAll}
            setManageAll={setManageAll}
          />
        )}
      </div>
    </>
  );
};

export default Profiles;
