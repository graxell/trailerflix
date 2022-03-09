import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import ShowInfo from "./pages/ShowInfo";
import Homepage from "./pages/Homepage";
import NavBar from "./components/NavBar";
import Categories from "./pages/Categories";
import ListResult from "./pages/ListResult";
// import SearchResults from "./pages/SearchResults";
import logo from "./assets/images/logo.png";
import "./App.css";
import "./MediaQuery.css";
import NewAndPopular from "./pages/NewAndPopular";
import MyWatchList from "./pages/MyWatchList";

//   ---- [ FUNCTION START ] ----   //

function App() {
  const API_KEY = "api_key=887d05f637b9e4864f8cec83c7da0a1f";
  const ENDPOINT_URL = "https://api.themoviedb.org/3/";
  const DEFAULT_PARAM =
    "&language=en-US&sort_by=popularity.desc&include_video=false&page=1";

  //   ---- [ STATES ] ----   //
  const [searchInput, setSearchInput] = useState();
  const [showList, setShowList] = useState();
  const [show, setShow] = useState();
  const [banner, setBanner] = useState();
  const [recs, setRecs] = useState();
  const [genres, setGenres] = useState({ genreList: {}, mediaType: "" });
  const [listDetails, setListDetails] = useState();
  const [screen, setScreen] = useState(0);
  const [myList, setMyList] = useState([]);
  const [addBtn, setAddBtn] = useState(false);

  //  ---- [ HOMEPAGE STATES ] ----  //

  const [homepageLists, setHomepageLists] = useState({});

  useEffect(async () => {
    const trending = await trendingShows();
    const popularMovies = await getPopularSeries();
    const popularSeries = await getPopularMovies();
    const topRatedMovies = await topMovies();
    const topRatedSeries = await topSeries();
    setHomepageLists({
      ...homepageLists,
      trending: trending,
      popularMovies: popularMovies,
      popularSeries: popularSeries,
      topRatedMovies: topRatedMovies,
      topRatedSeries: topRatedSeries,
    });
    console.log(homepageLists);
    getItem();
  }, []);

  useEffect(() => {
    extractBanner(homepageLists.trending);
  }, [homepageLists.trending]);

  const getItem = () => {
    const savedList = JSON.parse(localStorage.getItem("personalShowList"));

    setMyList(savedList);
    console.log(savedList);
  };

  const addBtnToggle = () => {
    setAddBtn(!addBtn);
  };

  //// ----  [  HOMEPAGE - API CALLS  ]  ---- ////

  // --- [  Trending shows ] --- //
  const trendingShows = async () => {
    const TRENDING_URL =
      ENDPOINT_URL + "trending/all/day?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(TRENDING_URL);
      return response.data.results;
    } catch (error) {
      console.log("Error", error);
    }
  };

  // --- [ Popular - MUST WATCH FILMS ] --- //
  const getPopularMovies = async () => {
    const POPULAR_MOVIES_URL =
      ENDPOINT_URL + "movie/popular?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(POPULAR_MOVIES_URL);
      return response.data.results;
    } catch (error) {
      console.log("Error", error);
    }
  };

  // --- [ Popular SERIES ] --- //
  const getPopularSeries = async () => {
    const POPULAR_SERIES_URL =
      ENDPOINT_URL + "tv/popular?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(POPULAR_SERIES_URL);
      return response.data.results;
    } catch (error) {
      console.log("Error", error);
    }
  };

  // --- [ Top Rated Movies - DISCOVER FILMS ] --- //
  const topMovies = async () => {
    const TOP_MOVIES_URL =
      ENDPOINT_URL + "movie/top_rated?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(TOP_MOVIES_URL);
      return response.data.results;
    } catch (error) {
      console.log("Error", error);
    }
  };

  // --- [ Top Rated SERIES ] --- //
  const topSeries = async () => {
    const TOP_SERIES_URL =
      ENDPOINT_URL + "tv/top_rated?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(TOP_SERIES_URL);
      return response.data.results;
    } catch (error) {
      console.log("Error", error);
    }
  };

  // --- [ extractBanner ] --- //
  const extractBanner = async (showList) => {
    if (showList) {
      const bannerShow = showList[Math.floor(Math.random() * showList.length)];
      setBanner(bannerShow);
      console.log(bannerShow);
    }
  };
  //// ----  [  FUNCTIONS TO GET MORE INFO ABOUT SHOW  ]  ---- ////

  //   --- [ SHOWINFO - movie/tv information page] ---   //
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

  //   ---- [ MORE LIKE THIS - movie recommendation based on chose film ] ----   //
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

  //   ---- [ Get List of Genres ] ----   //
  const getGenres = async (mediaType) => {
    const GENRE_URL =
      ENDPOINT_URL + `genre/${mediaType}/list?` + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(GENRE_URL);
      setGenres({ genreList: response.data.genres, mediaType: mediaType });
      setScreen(3);
      console.log(response.data.genres);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //   ---- [ Get shows of the chosen genre ] ----   //
  const getShowsByGenre = async (mediaType, id, genre) => {
    const GENRE_URL =
      ENDPOINT_URL +
      `discover/${mediaType}?` +
      API_KEY +
      `&with_genres=${id}` +
      DEFAULT_PARAM;

    try {
      const response = await axios.get(GENRE_URL);
      setShowList(response.data.results);
      setListDetails({ genreName: genre, mediaType: mediaType });
      setScreen(1);
      setSearchInput();
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //// ----  [ SEARCH ENGINE FUNCTIONS]  ---- ////

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

  //// ----  [ SETTING SCREEN FUNCTIONS]  ---- ////
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
          <img
            onClick={() => {
              getHomepage();
              extractBanner(homepageLists.trending);
            }}
            src={logo}
            alt="logo"
          />
        </h1>

        <NavBar
          getHomepage={getHomepage}
          extractBanner={extractBanner}
          getGenres={getGenres}
          setScreen={setScreen}
          homepageLists={homepageLists}
          getItem={getItem}
        />

        <Search
          search={search}
          searchInput={searchInput}
          handleInput={handleInput}
          setSearchInput={setSearchInput}
        />
      </header>

      <main>
        {screen === 0 && (
          <Homepage
            bannerShow={banner}
            screen={screen}
            homepageLists={homepageLists}
            setScreen={setScreen}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}

        {screen === 1 && showList && (
          <ListResult
            showList={showList}
            listDetails={listDetails}
            searchInput={searchInput}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}

        {screen === 2 && show && (
          <ShowInfo
            recs={recs}
            show={show}
            screen={screen}
            exit={handleExitBtn}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
            setMyList={setMyList}
            myList={myList}
          />
        )}

        {screen === 3 && (
          <Categories
            bannerShow={banner}
            screen={screen}
            genres={genres}
            getShowsByGenre={getShowsByGenre}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}

        {screen === 4 && (
          <NewAndPopular
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}

        {screen === 5 && (
          <MyWatchList
            myList={myList}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}
      </main>
    </>
  );
}

export default App;
