import axios from "axios";

//   -- [BACKEND DATABASE CALLS] --   //

export const getUserDetails = async function () {
  try {
    const response = await axios.get(
      `https://api.trailerflix.co/view-account/`,

      { headers: { token: localStorage.getItem("token") } }
    );

    console.log(response);
    if (response.data.status) {
      return response.data.payload;
    } else {
      return { error: "Cannot retrieve details." };
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = async function (type, payload, password) {
  try {
    const response = await axios.patch(
      "https://api.trailerflix.co/update",
      {
        type: type,
        payload: payload,
        password: password,
      },
      { headers: { token: localStorage.getItem("token") } }
    );
    if (response.data.status) {
      return `Your ${type} was successfully update!`;
    } else {
      return response.data.error;
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUpPost = async function (user_name, email, password) {
  try {
    const response = await axios.post(
      "https://api.trailerflix.co/create-account",
      {
        user_name: user_name,
        email: email,
        password: password,
      }
    );
    if (response.data.status) {
      return true;
    } else {
      return { error: response.data.error };
    }
  } catch (error) {
    console.log(error);
  }
};

export const signInReq = async function (email, password) {
  try {
    const response = await axios.post("https://api.trailerflix.co/signin/", {
      email: email,
      password: password,
    });

    if (response.data.status === 1) {
      localStorage.setItem("token", response.data.token);
      return true;
    } else {
      return { error: response.data.error };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onSignOut = async function () {
  try {
    const response = await axios.delete(`https://api.trailerflix.co/signout/`, {
      headers: { token: localStorage.getItem("token") },
    });

    if (response.data.status === 1) {
      localStorage.clear();
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfiles = async function () {
  try {
    const response = await axios.get(
      "https://api.trailerflix.co/all-profiles/",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );

    if (response.data.status === 1) {
      return response.data.payload;
    } else {
      return response.data.status;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onProfileEdit = async function (profileName, type, payload) {
  try {
    const response = await axios.patch(
      "https://api.trailerflix.co/edit-profile/",
      { currentProfileName: profileName, type: type, payload: payload },

      { headers: { token: localStorage.getItem("token") } }
    );

    if (response.data.status === 1) {
      return response.data;
    } else {
      return response.data.error;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onAddProfile = async (profileName) => {
  try {
    const response = await axios.post(
      "https://api.trailerflix.co/add-profile/",
      { profile_name: profileName },
      { headers: { token: localStorage.getItem("token") } }
    );

    if (response.data.status === 1) {
      return response.data;
    } else {
      return response.data.error;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onRemoveProfile = async function (profile_name) {
  try {
    const response = await axios.delete(
      "https://api.trailerflix.co/remove-profile/",
      {
        headers: {
          token: localStorage.getItem("token"),
          profile_name: profile_name,
        },
      }
    );

    if (response.data.status === 1) {
      return response.data.status;
    } else {
      return response.data.error;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWatchList = async function () {
  try {
    const response = await axios.get("https://api.trailerflix.co/get-list", {
      headers: {
        token: localStorage.getItem("token"),
        profile_name: localStorage.getItem("profile_name"),
      },
    });

    if (response.data.status === 1) {
      return response.data.shows;
    } else {
      return response.data.status;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onAddShow = async function (show) {
  try {
    const response = await axios.post(
      "https://api.trailerflix.co/add-show",
      { show: show },
      {
        headers: {
          token: localStorage.getItem("token"),
          profile_name: localStorage.getItem("profile_name"),
        },
      }
    );

    if (response.data.status === 1) {
      return true;
    } else {
      return response.data.error;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onRemoveShow = async function (id) {
  try {
    const response = await axios.delete(
      "https://api.trailerflix.co/remove-show",
      {
        headers: {
          show_id: id,
          token: localStorage.getItem("token"),
          profile_name: localStorage.getItem("profile_name"),
        },
      }
    );

    if (response.data.status === 1) {
      return response.data.status;
    } else {
      return response.data.error;
    }
  } catch (error) {
    console.log(error);
  }
};
