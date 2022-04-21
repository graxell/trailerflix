import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState({});

  //   const { email, password, user_name } = userDetails;

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6065/view-account/${localStorage.getItem("email")}`,

        { headers: { token: localStorage.getItem("token") } }
      );

      console.log(response);
      if (response.data.status) {
        setUserDetails(response.data.payload);
        console.log(response.data.payload);
      } else {
        setUserDetails({ error: "Cannot retrieve details." });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userDetails);
  return (
    <>
      <div>
        {Object.keys(userDetails).map((key) => {
          return (
            <div>
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <p>{userDetails[key]}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyAccount;
