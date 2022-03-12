import React from "react";

const Navbar = (props) => {
  const { getHomepage, extractBanner, getGenres, setScreen, homepageLists } =
    props;

  const { trending, popularSeries, popularMovies } = homepageLists;

  return (
    <>
      <nav>
        <button className="header__nav--trigger">Browse &#x25BC;</button>
        <ul className="header__nav__menu">
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
