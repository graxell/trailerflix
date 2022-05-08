import { profileNameCheck } from "../../utils/AccountsUtils";
import InputField from "../signIn/InputField";
import ProfilePic from "./ProfilePic";
import Button from "../shared/Button";
import smile__icon from "../../assets/images/smile__icon.png";
import {
  onAddProfile,
  onRemoveProfile,
  onProfileEdit,
  getProfiles,
} from "../../controllers/dbController";

const ManageProfile = (props) => {
  const { setAllProfiles, allProfiles, manageAll, setManageAll, profile } =
    props;

  const { newProfileName, currentProfileName, edit, add, error, toConfirm } =
    manageAll;

  const profileIndex = allProfiles.findIndex((object) => {
    return object.profile_name === currentProfileName;
  });

  const onEdit = async () => {
    if (!error) {
      const edited = await onProfileEdit(
        currentProfileName,
        "profile_name",
        newProfileName
      );

      if (edited.status && edited.status === 1) {
        await getProfiles().then((result) => setAllProfiles(result));
        await setManageAll({ ...manageAll, edit: false });
      } else {
        edited.error && setManageAll({ ...manageAll, error: edited.error });
      }
    }
  };

  const onAdd = async () => {
    if (!error) {
      const added = await onAddProfile(newProfileName);

      if (added.status && added.status === 1) {
        await getProfiles().then((result) => setAllProfiles(result));
        await setManageAll({ ...manageAll, add: false });
      } else {
        added.error && setManageAll({ ...manageAll, error: added.error });
      }
    }
  };

  const onRemove = async () => {
    if (!error) {
      const removed = await onRemoveProfile(currentProfileName);

      if (removed && removed === 1) {
        await getProfiles().then((result) => setAllProfiles(result));
        await setManageAll({
          ...manageAll,
          edit: false,
          toConfirm: !toConfirm,
        });
      } else {
        removed.error && setManageAll({ ...manageAll, error: removed.error });
      }
    }
  };

  const onInput = (e) => {
    const nameCheck = profileNameCheck(
      allProfiles,
      currentProfileName,
      e.target.value
    );

    if (nameCheck && !nameCheck.error) {
      setManageAll({
        ...manageAll,
        [e.target.name]: e.target.value,
        error: false,
      });
    } else {
      setManageAll({
        ...manageAll,
        [e.target.name]: e.target.value,
        error: nameCheck.error,
      });
    }
  };

  console.log(allProfiles, profileIndex);

  return (
    <>
      <div className="profile__manage--container">
        {edit ? (
          <>
            <h2 className="profiles__heading manage__heading">Edit Profile</h2>

            <div className="profile__manage__form">
              <ProfilePic
                index={profileIndex}
                profile={profile}
                profileName={currentProfileName}
                manageAll={manageAll}
                sizeSelector={"picture__medium"}
              />

              <InputField
                type={"text"}
                label={"Profile Name"}
                name={"newProfileName"}
                setValue={onInput}
                value={newProfileName}
                input={{ data: true }}
                inputStyle={"input__dark"}
              />
            </div>

            <div className="profile__edit--buttons">
              <Button
                onClick={!toConfirm ? onEdit : ""}
                style={"profiles__btn whiteRed__btn"}
                btnName={"Continue"}
              />

              <Button
                onClick={() => {
                  setManageAll({ edit: !edit });
                }}
                style={"profiles__btn dark__btn"}
                btnName={"Cancel"}
              />

              <Button
                onClick={() =>
                  setManageAll({ ...manageAll, toConfirm: !toConfirm })
                }
                style={"profiles__btn dark__btn"}
                btnName={"Delete Profile"}
              />
            </div>
            {error && (
              <p className="profile__manage__error error shake">{error}</p>
            )}

            {toConfirm && (
              <div className="confirm--container">
                <p className="error">
                  Deleting the profile will permanently delete your saved shows.
                </p>
                <p className="error">
                  Please enter your profile name to confirm:
                </p>
                <div className="confirm__form">
                  <input
                    className="input__thin input__dark"
                    onInput={(e) => {
                      e.target.value === currentProfileName &&
                        setManageAll({ ...manageAll, delete: true });
                    }}
                  ></input>

                  {manageAll.delete && (
                    <Button
                      onClick={onRemove}
                      style={"profiles__btn whiteRed__btn"}
                      btnName={"Confim Delete"}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <h2 className="profiles__heading manage__heading">Add Profile</h2>
            <p className="profiles__subheading">
              Add a profile for another person exploring Trailerflix.
            </p>

            <div className="profile__manage__form">
              <ProfilePic
                index={5}
                profile={profile}
                profileName={smile__icon}
                manageAll={manageAll}
                sizeSelector={"picture__medium"}
              />

              <InputField
                type={"text"}
                label={"Profile Name"}
                name={"newProfileName"}
                setValue={onInput}
                input={{ data: newProfileName }}
                inputStyle={"input__dark"}
              />
            </div>

            <div className="profile__edit--buttons">
              <Button
                onClick={onAdd}
                style={"profiles__btn whiteRed__btn"}
                btnName={"Continue"}
              />

              <Button
                onClick={() => {
                  setManageAll({ add: !add });
                }}
                style={"profiles__btn dark__btn"}
                btnName={"Cancel"}
              />
            </div>
            {error && (
              <p className="profile__manage__error error shake">{error}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageProfile;
