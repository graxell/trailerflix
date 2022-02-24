import React from "react";

const Navbar = (props) => {
  const {
    getHomepage,
    extractBanner,
    getGenres,
    setScreen,
    trending,
    popularMovies,
    popularSeries,
  } = props;

  return (
    <>
      <nav>
        <button className="header__nav--trigger">Browse &#x25BC;</button>
        <ul className="header__nav--list">
          <li
            onClick={() => {
              getHomepage();
              extractBanner(trending);
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              getGenres("tv");
              extractBanner(popularSeries);
            }}
          >
            Series
          </li>
          <li
            onClick={() => {
              getGenres("movie");
              extractBanner(popularMovies);
            }}
          >
            Films
          </li>
          <li
            onClick={() => {
              setScreen(5);
            }}
          >
            New & Popular
          </li>
          <li
            onClick={() => {
              console.log("My List button clicked");
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
