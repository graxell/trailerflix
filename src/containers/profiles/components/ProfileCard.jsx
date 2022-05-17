import React from "react";
import edit_icon from "../../../assets/images/edit_icon.png";
import add_profile_icon from "../../../assets/images/add_profile_icon.svg";
import ProfilePic from "./ProfilePic";
import { useNavigate } from "react-router-dom";

const ProfileCard = (props) => {
  const {
    list,
    setProfiles,
    profiles,
    setManageAll,
    manageAll,
    setIsSignedIn,
    onAssignProfile,
  } = props;

  const navigate = useNavigate();

  const onManage = (profile) => {
    setManageAll({
      edit: true,
      currentProfileName: profile.profile_name,
      newProfileName: profile.profile_name,
    });
  };

  console.log(profiles);

  return (
    <>
      <div className="profile__cards--container">
        {list &&
          list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  !profiles.manage
                    ? onAssignProfile(item.profile_name)
                    : onManage(item)
                }
                key={index}
                className="profile__card"
              >
                <ProfilePic
                  index={index}
                  profiles={profiles}
                  profileName={item.profile_name}
                  manageAll={manageAll}
                  sizeSelector={"picture__medium"}
                />

                {profiles.manage && (
                  <div className="profile__manage picture__medium">
                    <img src={edit_icon} alt="edit icon" />
                  </div>
                )}

                <h3 className="profile__name">{item.profile_name}</h3>
              </div>
            );
          })}

        {list && list.length < 5 && (
          <div
            onClick={() => setManageAll({ ...manageAll, add: true })}
            className="profile__card"
          >
            <div className="profile__picture addProfile__icon picture__medium">
              <img src={add_profile_icon} alt="add icon" />
            </div>

            <h3 className="profile__name">Add Profile</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
