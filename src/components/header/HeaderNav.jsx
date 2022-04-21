import React from "react";
import Search from "./Search";
import NavBar from "./NavBar";
// import AccountMenu from "./AccountMenu";

const Header = (props) => {
  const {
    getScreenPage,
    extractBanner,
    getGenres,
    homepageLists,
    getItem,
    search,
    searchInput,
    handleInput,
    setSearchInput,
    onSignOut,
  } = props;
  return (
    <>
      <NavBar
        getScreenPage={getScreenPage}
        extractBanner={extractBanner}
        getGenres={getGenres}
        homepageLists={homepageLists}
        getItem={getItem}
        onSignOut={onSignOut}
      />

      <Search
        search={search}
        searchInput={searchInput}
        handleInput={handleInput}
        setSearchInput={setSearchInput}
      />

      {/* <button onClick={onSignOut}>Logout</button> */}
    </>
  );
};

export default Header;
