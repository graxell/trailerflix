import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Navigation.css";

const NavLeft = (props) => {
  const { setShow, setShowList, setIsSignedIn, profiles, setProfiles } = props;

  const navigate = useNavigate();

  const clearStates = () => {
    setShow({});
    setShowList();
    setProfiles({ ...profiles, manage: false });
  };

  return (
    <>
      <nav>
        <button className="header__nav--trigger">Browse &#x25BC;</button>
        <ul className="header__nav__menu">
          <li onClick={clearStates}>
            <Link to={{ pathname: "/" }}>Home</Link>
          </li>
          <li onClick={clearStates}>
            <Link to="/series">Series</Link>
          </li>
          <li onClick={clearStates}>
            <Link to="/films">Films</Link>
          </li>
          <li onClick={clearStates}>
            <Link to="/new-and-popular">New & Popular</Link>
          </li>
          <li onClick={clearStates}>
            <Link to="/my-list">My List</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavLeft;
