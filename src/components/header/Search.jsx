import React, { useState } from "react";
import searchIcon from "../../assets/images/searchIcon.svg";

const Search = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const { handleInput, search, searchInput } = props;

  //handling enter key press
  const enter = (e) => {
    if (e.key === "Enter" && searchInput.length > 0) {
      search();
      e.target.value = "";
    }
  };

  const onFocus = () => setIsFocused(true);

  const onBlur = (e) => {
    setIsFocused(false);
    e.target.value = "";
  };

  //handling search bar container classname
  const searchDisplay = isFocused
    ? "header__searchBar--container focus__style"
    : "header__searchBar--container";

  return (
    <>
      <div className={searchDisplay}>
        <button className="searchBar__btn" onFocus={onFocus} onBlur={onBlur}>
          <img className="searchBar__icon" src={searchIcon} alt="search icon" />
        </button>
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          className="searchBar__input"
          type="text"
          placeholder="Titles, people, genres"
          onChange={handleInput}
          onKeyUp={enter}
        />
      </div>
    </>
  );
};

export default Search;
