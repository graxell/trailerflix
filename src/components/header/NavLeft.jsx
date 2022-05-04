import React from "react";
import { Link } from "react-router-dom";

const NavRight = (props) => {
  const { onSignOut, setShow, show, showList, setShowList } = props;

  const clearStates = () => {
    setShow({});
    setShowList();
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
          <ul>
            <li onClick={onSignOut}>Sign out</li>
          </ul>
        </ul>
      </nav>
    </>
  );
};

export default NavRight;
