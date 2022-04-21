import React from "react";
import { Link } from "react-router-dom";

const AccountMenu = (props) => {
  const { onSignOut } = props;

  return (
    <>
      <li className="header__accountMenu--trigger">Account &#x25BC; </li>
      <ul className="header__accountMenu--dropdown">
        <li>
          <Link to="/my-account">My Account</Link>
        </li>
        <li onClick={onSignOut}>Sign out of TrailerFlix</li>
      </ul>
    </>
  );
};

export default AccountMenu;
