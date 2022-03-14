import React from "react";

const Navbar = (props) => {
  const {
    getHomepage,
    extractBanner,
    getGenres,
    setScreen,
    homepageLists,
    setShowList,
  } = props;

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
              setShowList();
            }}
          >
            Series
          </li>
          <li
            onClick={() => {
              getGenres("movie");
              extractBanner(popularMovies);
              setShowList();
            }}
          >
            Films
          </li>
          <li
            onClick={() => {
              setScreen(4);
              setShowList();
            }}
          >
            New & Popular
          </li>
          <li
            onClick={() => {
              setScreen(5);
              setShowList();
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
