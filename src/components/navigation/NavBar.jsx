import React from "react";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";

const NavBar = (props) => {
  const {
    setShow,
    setShowList,
    profiles,
    setProfiles,
    setIsSignedIn,
    isSignedIn,
    onAssignProfile,
    updateWatchList,
    token,
  } = props;
  return (
    <>
      <NavLeft
        setShow={setShow}
        setShowList={setShowList}
        profiles={profiles}
        setProfiles={setProfiles}
        setIsSignedIn={setIsSignedIn}
      />

      <NavRight
        setProfiles={setProfiles}
        profiles={profiles}
        list={profiles.all}
        setShowList={setShowList}
        setIsSignedIn={setIsSignedIn}
        isSignedIn={isSignedIn}
        onAssignProfile={onAssignProfile}
        updateWatchList={updateWatchList}
        token={token}
      />
    </>
  );
};

export default NavBar;
