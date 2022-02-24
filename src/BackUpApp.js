<img className="searchBar__icon" src={searchIcon} alt="search icon" />;

import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import ShowInfo from "./pages/ShowInfo";
import Homepage from "./pages/Homepage";
import SearchResults from "./pages/SearchResults";
import logo from "./assets/images/logo.png";
import "./App.css";

function App() {
  const API_KEY = "api_key=887d05f637b9e4864f8cec83c7da0a1f";
  const ENDPOINT_URL = "https://api.themoviedb.org/3/";
  const DEFAULT_PARAM =
    "&language=en-US&sort_by=popularity.desc&include_video=false&page=1";

  //   ---- [ STATES ] ----   //
  const [searchInput, setSearchInput] = useState();
  const [showList, setShowList] = useState();
  const [show, setShow] = useState();
  const [recs, setRecs] = useState();

  const [screen, setScreen] = useState(0);

  //  ---- [ HOMEPAGE STATES ] ----  //
  const [trending, setTrending] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularSeries, setPopularSeries] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();
  const [topRatedSeries, setTopRatedSeries] = useState();

  useEffect(() => {
    trendingShows();
    getPopularSeries();
    getPopularMovies();
    topMovies();
    topSeries();
  }, []);

  const [homePageLists, setHomePageLists] = useState();

  const multiApi = async () => {
    try {
      const api1 = await axios.get(TRENDING_URL);
      const api2 = await axios.get(TRENDING_URL);
      const api3 = await axios.get(TRENDING_URL);
      const api4 = await axios.get(TRENDING_URL);
      const api5 = await axios.get(TRENDING_URL);
      setHomePageLists({ trending: api1, popular: api2 });
    } catch (error) {
      console.log(error);
    }
  };

  ///// --- [  HOMEPAGE - TRENDING SHOWS  ] --- /////
  const trendingShows = async () => {
    const TRENDING_URL =
      ENDPOINT_URL + "trending/all/day?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(TRENDING_URL);
      setTrending(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  ///// --- [ HOMEPAGE - POPULAR - MUST WATCH FILMS ] --- /////
  const getPopularMovies = async () => {
    const POPULAR_MOVIES_URL =
      ENDPOINT_URL + "movie/popular?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(POPULAR_MOVIES_URL);
      setPopularMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  ///// --- [ HOMEPAGE - POPULAR SERIES ] --- /////
  const getPopularSeries = async () => {
    const POPULAR_SERIES_URL =
      ENDPOINT_URL + "tv/popular?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(POPULAR_SERIES_URL);
      setPopularSeries(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  ///// --- [ HOMEPAGE - TOP RATED MOVIES - DISCOER FILMS ] --- /////
  const topMovies = async () => {
    const TOP_MOVIES_URL =
      ENDPOINT_URL + "movie/top_rated?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(TOP_MOVIES_URL);
      setTopRatedMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  ///// --- [ HOMEPAGE - TOP RATED SERIES ] --- /////
  const topSeries = async () => {
    const TOP_SERIES_URL =
      ENDPOINT_URL + "tv/top_rated?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(TOP_SERIES_URL);
      setTopRatedSeries(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //   ---- [ SHOWINFO - MOVIE/TV INFORMATION PAGE ] ----   //
  const getMovieDetails = async (mediaType, movieId) => {
    const movieURL =
      ENDPOINT_URL +
      `${mediaType}/${movieId}?` +
      API_KEY +
      "&append_to_response=videos,credits,watch/providers,images,releases,release_dates";

    try {
      const response = await axios.get(movieURL);
      setShow(response.data);
      setScreen(2);
      console.log(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //   ---- [ MORE LIKE THIS - MOVIE RECS BASED ON CHOSEN FILM ] ----   //
  const getMovieRecs = async (mediaType, movieId) => {
    const movieRecURL =
      ENDPOINT_URL +
      `${mediaType}/${movieId}/recommendations?` +
      API_KEY +
      "&append_to_response=videos,credits,watch/providers";

    try {
      const response = await axios.get(movieRecURL);
      setRecs(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //   ---- [ SEARCH ENGINE ] ----   //
  const search = async () => {
    const searchURL =
      ENDPOINT_URL +
      "search/multi?" +
      API_KEY +
      `&query=${searchInput}` +
      DEFAULT_PARAM;

    try {
      const response = await axios.get(searchURL);
      setShowList(response.data.results);
      setScreen(1);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  //   ---- [ SETTING SCREENS ] ----   //
  const handleExitBtn = () => {
    if (showList) {
      setScreen(1);
    } else {
      setScreen(0);
    }
  };

  const getHomepage = () => {
    if (showList) {
      setScreen(0);
      setShowList();
    } else {
      setScreen(0);
    }
  };

  return (
    <>
      <header>
        <h1 className="header__logo">
          <img onClick={getHomepage} src={logo} alt="logo" />
        </h1>

        <nav>
          <ul>
            <li onClick={getHomepage}>Home</li>
            <li
              onClick={() => {
                console.log("Series button clicked");
              }}
            >
              Series
            </li>
            <li
              onClick={() => {
                console.log("Films button clicked");
              }}
            >
              Films
            </li>
            <li
              onClick={() => {
                console.log("New & Popular button clicked");
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

        <Search
          search={search}
          searchInput={searchInput}
          handleInput={handleInput}
        />
      </header>

      <main>
        {screen === 0 && (
          <Homepage
            trending={trending}
            popularMovies={popularMovies}
            popularSeries={popularSeries}
            topRatedMovies={topRatedMovies}
            topRatedSeries={topRatedSeries}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}

        {screen === 1 && showList && (
          <SearchResults
            showList={showList}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
            searchInput={searchInput}
          />
        )}

        {screen === 2 && show && (
          <ShowInfo
            recs={recs}
            show={show}
            exit={handleExitBtn}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}

        {screen === 3 && show && (
          <ShowInfo
            recs={recs}
            show={show}
            exit={handleExitBtn}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}
      </main>
    </>
  );
}

export default App;
