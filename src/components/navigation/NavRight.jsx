import React, { useEffect, useState } from "react";
import edit_icon from "../../assets/images/edit_icon.png";
import account_icon from "../../assets/images/account_icon.png";
import ProfilePic from "../../containers/profiles/components/ProfilePic";
import Search from "./Search";
import SignInNav from "./SignInNav";
import { useNavigate } from "react-router-dom";
import { getProfileIndex } from "../../utils/AccountsUtils";
import { onSignOut } from "../../controllers/dbController";
import "../../css/Navigation.css";

const NavRight = (props) => {
  const navigate = useNavigate();

  const {
    list,
    profiles,
    setProfiles,
    setShowList,
    setIsSignedIn,
    isSignedIn,
    onAssignProfile,
    token,
  } = props;
  const { assigned } = profiles;

  const otherProfiles =
    list &&
    list.filter((item) => {
      return item.profile_name !== assigned;
    });

  const signOut = () => {
    onSignOut().then((result) => {
      if (!result) {
        setIsSignedIn(false);
        navigate("/signin");
      }
    });
  };

  return (
    <>
      <div className="navRight--container">
        <Search setShowList={setShowList} profiles={profiles} />

        {!isSignedIn && window.location.pathname !== "/profiles" && (
          <SignInNav />
        )}

        {isSignedIn && (
          <>
            <div className="navRight__dropDown--trigger">
              <ProfilePic
                index={
                  list && list.length > 0
                    ? getProfileIndex(list, assigned)
                    : "6"
                }
                profiles={profiles}
                profileName={assigned}
                manageAll={false}
                sizeSelector={"profile__picture picture__navSmall"}
              />
            </div>

            <div className="navRight__dropDown">
              {otherProfiles &&
                otherProfiles.map((item, index) => {
                  return (
                    <div
                      className="nav__profiles"
                      key={index}
                      onClick={() => onAssignProfile(item.profile_name)}
                    >
                      <ProfilePic
                        index={getProfileIndex(list, item.profile_name)}
                        profiles={profiles}
                        profileName={item.profile_name}
                        manageAll={false}
                        sizeSelector={"profile__picture picture__navSmall"}
                      />

                      <p>{item.profile_name}</p>
                    </div>
                  );
                })}

              <div
                className="nav__profiles"
                onClick={() => {
                  setProfiles({ ...profiles, manage: true });
                  navigate("/profiles");
                }}
              >
                <img
                  src={edit_icon}
                  className="profile__picture picture__navSmall"
                  alt="edit icon"
                />

                <p>Manage Profiles</p>
              </div>

              <div
                onClick={() => navigate("/my-account")}
                className="nav__profiles line__divider"
              >
                <img
                  src={account_icon}
                  className="profile__picture picture__navSmall"
                  alt="account icon"
                />

                <p>Account</p>
              </div>

              <div className="nav__profiles flex__center">
                <p onClick={signOut}>Sign Out of Trailerflix</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NavRight;
