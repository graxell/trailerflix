import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/images/searchIcon.svg";
import { searchURL } from "../../controllers/apiController";

const Search = (props) => {
  const { setShowList } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [searchInput, setSearchInput] = useState();

  const navigate = useNavigate();

  const onSearch = async () => {
    try {
      const response = await axios.get(searchURL(searchInput));
      setShowList({ shows: response.data.results, topic: searchInput });

      navigate(`/search/:${searchInput}`);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  //handling enter key press
  const enter = (e) => {
    if (e.key === "Enter" && searchInput.length > 0) {
      onSearch();
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
