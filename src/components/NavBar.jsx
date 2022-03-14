import React from "react";

const Navbar = (props) => {
  const { getScreenPage, extractBanner, getGenres, homepageLists } = props;

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
              getScreenPage(3);
            }}
          >
            New & Popular
          </li>
          <li
            onClick={() => {
              getScreenPage(4);
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
