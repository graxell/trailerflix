const axios = require("axios");

module.exports = {
  //   -- [BACKEND DATABASE CALLS] --   //

  getUserDetails: async function () {
    try {
      const response = await axios.get(
        `http://localhost:6065/view-account/${localStorage.getItem("email")}`,

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

  onSignup: async function (user_name, email, password) {
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

  onSignIn: async function (email, password) {
    try {
      const response = await axios.post("http://localhost:6065/signin/", {
        email: email,
        password: password,
      });

      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_name", response.data.user_name);
        localStorage.setItem("email", email.data);
        // navigate("/");
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
      const response = await axios.delete(
        `http://localhost:6065/signout/${localStorage.getItem("email")}`,
        { headers: { token: localStorage.getItem("token") } }
      );

      if (response.data.status === 1) {
        localStorage.clear();
        return false;
        // navigate("/signin");
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
