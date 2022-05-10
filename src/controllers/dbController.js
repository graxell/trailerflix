const axios = require("axios");

module.exports = {
  //   -- [BACKEND DATABASE CALLS] --   //

  getUserDetails: async function () {
    try {
      const response = await axios.get(
        `http://localhost:6065/view-account/`,

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
  },

  updateRequest: async function (type, payload, password) {
    try {
      const response = await axios.patch(
        "http://localhost:6065/update",
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
  },

  signUpPost: async function (user_name, email, password) {
    try {
      const response = await axios.post(
        "http://localhost:6065/create-account",
        {
          user_name: user_name,
          email: email,
          password: password,
        }
      );
      if (response.data.status) {
        // setTimeout(() => navigate("/signin"), 1000);
        return true;
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      console.log(error);
    }
  },

  signInReq: async function (email, password) {
    try {
      const response = await axios.post("http://localhost:6065/signin/", {
        email: email,
        password: password,
      });
      console.log(response);
      if (response.data.status === 1) {
        localStorage.setItem("token", response.data.token);
        return true;
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      console.log(error);
    }
  },

  onSignOut: async function () {
    try {
      const response = await axios.delete(`http://localhost:6065/signout/`, {
        headers: { token: localStorage.getItem("token") },
      });

      if (response.data.status === 1) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getProfiles: async function () {
    try {
      const response = await axios.get("http://localhost:6065/all-profiles/", {
        headers: { token: localStorage.getItem("token") },
      });

      if (response.data.status === 1) {
        return response.data.payload;
      } else {
        return response.data.error;
      }
    } catch (error) {
      console.log(error);
    }
  },

  onProfileEdit: async function (profileName, type, payload) {
    try {
      const response = await axios.patch(
        "http://localhost:6065/edit-profile/",
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
  },

  onAddProfile: async (profileName) => {
    try {
      const response = await axios.post(
        "http://localhost:6065/add-profile/",
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
  },

  onRemoveProfile: async function (profile_name) {
    try {
      const response = await axios.delete(
        "http://localhost:6065/remove-profile/",
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
  },

  getWatchList: async function (profile_name) {
    try {
      const response = await axios.get("http://localhost:6065/get-list", {
        headers: {
          token: localStorage.getItem("token"),
          profile_name: `${profile_name}`,
        },
      });

      if (response.data.status === 1) {
        return console.log(response.data);
        //JSON.parse(response.data.shows);
      } else {
        return response.data.error;
      }
    } catch (error) {
      console.log(error);
    }
  },

  onAddShow: async function (show, profile_name) {
    try {
      const response = await axios.post(
        "http://localhost:6065/add-show",
        { show: JSON.stringify(show) },
        {
          headers: {
            token: localStorage.getItem("token"),
            profile_name: `${profile_name}`,
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
  },

  onRemoveShow: async function (id, profile_name) {
    try {
      const response = await axios.delete(
        "http://localhost:6065/remove-show",
        { showId: id },
        {
          headers: {
            token: localStorage.getItem("token"),
            profile_name: `${profile_name}`,
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
  },
};

// ----  [ LOGOUT ]  ---- ////

// const onSignOut = async () => {
//   const response = await axios.delete(
//     `http://localhost:6065/signout/${localStorage.getItem("email")}`,
//     { headers: { token: localStorage.getItem("token") } }
//   );

//   localStorage.clear();
//   setIsSignedIn(false);
//   navigate("/signin");

//   console.log(response);
// };
