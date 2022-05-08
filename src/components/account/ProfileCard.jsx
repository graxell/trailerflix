import React from "react";
import { accountColours } from "../../utils/AccountsUtils";
import edit_icon from "../../assets/images/edit_icon.png";
import add_profile_icon from "../../assets/images/add_profile_icon.svg";
import ProfilePic from "./ProfilePic";

const ProfileCard = (props) => {
  const { list, setProfile, profile, setManageAll, manageAll } = props;

  return (
    <>
      <div className="profile__cards--container">
        {list &&
          list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setProfile({ ...profile, assigned: item.profile_name })
                }
                key={index}
                className="profile__card"
              >
                <ProfilePic
                  index={index}
                  profile={profile}
                  profileName={item.profile_name}
                  manageAll={manageAll}
                  sizeSelector={"picture__medium"}
                />

                {profile.manage && (
                  <div
                    onClick={() =>
                      setManageAll({
                        edit: true,
                        currentProfileName: item.profile_name,
                        newProfileName: item.profile_name,
                      })
                    }
                    className="profile__manage picture__medium"
                  >
                    <img src={edit_icon} />
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
              <img src={add_profile_icon} />
            </div>

            <h3 className="profile__name">Add Profile</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
