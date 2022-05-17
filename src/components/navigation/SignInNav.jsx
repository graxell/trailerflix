import React from "react";
import { Link } from "react-router-dom";

const SignInNav = () => {
  return (
    <>
      <button className="nav__signIn__btn">
        <Link to="/signin">Sign In</Link>
      </button>
    </>
  );
};

export default SignInNav;
