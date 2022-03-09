import React from "react";

const Navbar = (props) => {
  const {
    getHomepage,
    extractBanner,
    getGenres,
    setScreen,
    homepageLists,
    getItem,
  } = props;

  return (
    <>
      <nav>
        <button className="header__nav--trigger">Browse &#x25BC;</button>
        <ul className="header__nav__menu">
          <li
            onClick={() => {
              getHomepage();
              extractBanner(homepageLists.trending);
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              getGenres("tv");
              extractBanner(homepageLists.popularSeries);
            }}
          >
            Series
          </li>
          <li
            onClick={() => {
              getGenres("movie");
              extractBanner(homepageLists.popularMovies);
            }}
          >
            Films
          </li>
          <li
            onClick={() => {
              setScreen(4);
            }}
          >
            New & Popular
          </li>
          <li
            onClick={() => {
              setScreen(5);
            }}
          >
            My List
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
