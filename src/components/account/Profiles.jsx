import React from "react";
import { useEffect, useState } from "react";
import { getProfiles } from "../../controllers/dbController";
import DisplayProfiles from "./DisplayProfiles";
import ManageProfile from "./ManageProfile";

const Profiles = (props) => {
  const { setProfile, profile } = props;

  const [allProfiles, setAllProfiles] = useState();
  const [manageAll, setManageAll] = useState({});

  useEffect(() => {
    getProfiles().then((result) => setAllProfiles(result));
  }, []);

  console.log(manageAll);

  return (
    <>
      <div className="profiles__container">
        {!manageAll.edit && !manageAll.add && (
          <DisplayProfiles
            allProfiles={allProfiles}
            setProfile={setProfile}
            profile={profile}
            setManageAll={setManageAll}
            manageAll={manageAll}
          />
        )}

        {manageAll && (manageAll.edit || manageAll.add) && (
          <ManageProfile
            allProfiles={allProfiles}
            setAllProfiles={setAllProfiles}
            profile={profile}
            manageAll={manageAll}
            setManageAll={setManageAll}
          />
        )}
      </div>
    </>
  );
};

export default Profiles;
