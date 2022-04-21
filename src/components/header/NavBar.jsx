import React from "react";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { getScreenPage, extractBanner, getGenres, homepageLists, onSignOut } =
    props;

  const { trending, popularSeries, popularMovies } = homepageLists;

  return (
    <>
      <nav>
        <button className="header__nav--trigger">Browse &#x25BC;</button>
        <ul className="header__nav__menu">
          <li
            onClick={() => {
              getScreenPage(0);
              extractBanner(trending);
            }}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            onClick={() => {
              getGenres("tv");
              extractBanner(popularSeries);
            }}
          >
            <Link to="/genres">Series</Link>
          </li>
          <li
            onClick={() => {
              getGenres("movie");
              extractBanner(popularMovies);
            }}
          >
            <Link to="/genres">Films</Link>
          </li>
          <li
            onClick={() => {
              getScreenPage(3);
            }}
          >
            <Link to="/new-and-popular">New & Popular</Link>
          </li>
          <li
            onClick={() => {
              getScreenPage(4);
            }}
          >
            <Link to="/my-list">My List</Link>
          </li>
          <ul>
            <li
              onClick={() => {
                getScreenPage(5);
              }}
            >
              <Link to="/my-account">My Account</Link>
            </li>
            <li onClick={onSignOut}>Sign out of TrailerFlix</li>
          </ul>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
