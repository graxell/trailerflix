import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import ShowInfo from "./pages/ShowInfo";
import Homepage from "./pages/Homepage";
import HeaderNav from "./components/header/HeaderNav";
import SignInNav from "./components/header/SignInNav";
import Genres from "./pages/Genres";
import ListResult from "./pages/ListResult";
import NewAndPopular from "./pages/NewAndPopular";
import MyWatchList from "./pages/MyWatchList";
import SignupPage from "./account/CreateAcc/SignupPage";
import Signin from "./account/Signin";
import CreateAccount from "./account/CreateAcc/CreateAccount";
import logo from "./assets/images/logo.png";
import "./css/App.css";
import "./css/Accounts.css";
import "./css/MediaQuery.css";
import MyAccount from "./account/MyAccount";

//   ---- [ FUNCTION START ] ----   //

function App() {
  //   ---- [ parts of url ] ----   //
  const API_KEY = process.env.REACT_APP_API_KEY;
  const ENDPOINT_URL = "https://api.themoviedb.org/3/";
  const DEFAULT_PARAM =
    "&language=en-US&sort_by=popularity.desc&include_video=false&page=1";
  const navigate = useNavigate();
  //   ---- [ STATES ] ----   //
  const [homepageLists, setHomepageLists] = useState({}); //homepage state
  const [show, setShow] = useState({});
  const [banner, setBanner] = useState();
  const [searchInput, setSearchInput] = useState();
  const [genres, setGenres] = useState({ genreList: {}, mediaType: "" });
  const [showList, setShowList] = useState(); //list based on genre/search result
  const [screen, setScreen] = useState(0);
  const [newAndPopularShows, setNewAndPopularShows] = useState({});
  const [myList, setMyList] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  //   ---- [ useEffect CALLS ] ----   //
  useEffect(() => {
    getToken();
    homepageApiCall();
    getItem();
  }, []);

  useEffect(() => {
    extractBanner(homepageLists.trending);
  }, [homepageLists.trending]);

  //// ----  [  HOMEPAGE - API CALL  ]  ---- ////
  const homepageApiCall = async () => {
    const url = (urlParam) => {
      return ENDPOINT_URL + urlParam + API_KEY + DEFAULT_PARAM;
    };
    try {
      const trending = await axios.get(url("trending/all/day?"));
      const popularMovies = await axios.get(url("movie/popular?"));
      const popularSeries = await axios.get(url("tv/popular?"));
      const topRatedMovies = await axios.get(url("movie/top_rated?"));
      const topRatedSeries = await axios.get(url("tv/top_rated?"));
      setHomepageLists({
        trending: trending.data.results,
        popularMovies: popularMovies.data.results,
        popularSeries: popularSeries.data.results,
        topRatedMovies: topRatedMovies.data.results,
        topRatedSeries: topRatedSeries.data.results,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  // --- [ heading handler depending on array key ] --- //
  const homepageHeadingHandler = (arrList) => {
    if (arrList === "trending") {
      return "Trending Now";
    } else if (arrList === "popularMovies") {
      return "Must-watch Films";
    } else if (arrList === "popularSeries") {
      return "Popular Series";
    } else if (arrList === "topRatedMovies") {
      return "Discover Great Films";
    } else {
      return "Binge-worthy TV Shows";
    }
  };

  // --- [ extractBanner - to get random film from a list to show in banner ] --- //
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
    try {
      const show = await axios.get(
        `${ENDPOINT_URL}${mediaType}/${movieId}?${API_KEY}&append_to_response=videos,credits,watch/providers,images,releases,release_dates`
      );
      const recs = await axios.get(
        `${ENDPOINT_URL}${mediaType}/${movieId}/recommendations?${API_KEY}${DEFAULT_PARAM}`
      );

      setShow({
        aboutShow: show.data,
        showRecs: recs.data.results,
      });
      console.log(recs.data.results);
      console.log(show.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //   ---- [ MORE LIKE THIS - movie recommendation based on chose film ] ----   //

  //   ---- [ Get List of Genres ] ----   //
  const getGenres = async (mediaType) => {
    const GENRE_URL = `${ENDPOINT_URL}genre/${mediaType}/list?${API_KEY}${DEFAULT_PARAM}`;

    try {
      const response = await axios.get(GENRE_URL);
      setGenres({ genreList: response.data.genres, mediaType: mediaType });
      setScreen(2);
      setShow({});
      console.log(response.data.genres);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //   ---- [ Get shows of the chosen genre ] ----   //
  const getShowsByGenre = async (mediaType, id, genre) => {
    const GENRE_URL = `${ENDPOINT_URL}discover/${mediaType}?${API_KEY}&with_genres=${id}${DEFAULT_PARAM}`;

    try {
      const response = await axios.get(GENRE_URL);
      setShowList({
        shows: response.data.results,
        genreName: genre,
        mediaType: mediaType,
      });
      setScreen(1);
      setSearchInput();
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //   ---- [ Get New and Popular shows ] ----   //
  const getNewAndPopular = async () => {
    const url = (specificParam) => {
      return ENDPOINT_URL + specificParam + API_KEY;
    };

    try {
      const airingToday = await axios.get(url("tv/airing_today?"));
      const latest = await axios.get(url("movie/now_playing?"));
      const ongoingTv = await axios.get(url("tv/on_the_air?"));
      const upcoming = await axios.get(url("movie/upcoming?"));
      setNewAndPopularShows({
        airingToday: airingToday.data.results,
        latest: latest.data.results,
        ongoingTv: ongoingTv.data.results,
        upcoming: upcoming.data.results,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  //// ----  [ SEARCH ENGINE FUNCTIONS]  ---- ////

  const search = async () => {
    const searchURL = `${ENDPOINT_URL}search/multi?${API_KEY}&query=${searchInput}${DEFAULT_PARAM}`;

    try {
      const response = await axios.get(searchURL);
      setShowList({ ...showList, shows: response.data.results });
      setScreen(1);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  //   ---- [ LOCAL STORAGE ] ----   //

  const saveToLocalStorage = (list) => {
    localStorage.setItem("personalShowList", JSON.stringify(list));
  };

  const getItem = () => {
    const savedList = JSON.parse(localStorage.getItem("personalShowList"));

    setMyList(savedList);
    console.log(savedList);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsSignedIn(true);
    } else {
      navigate("/signup");
    }
  };

  //add show to list
  const addToList = (show) => {
    const newPersonalList = myList ? [...myList, show] : [show];
    setMyList(newPersonalList);
    saveToLocalStorage(newPersonalList);
    console.log(myList);
  };

  //remove show from list
  const removeFromList = (show) => {
    const newPersonalList = myList.filter(
      (listItem) => listItem.id !== show.id
    );

    setMyList(newPersonalList);
    saveToLocalStorage(newPersonalList);
  };

  //handling add/remove button
  const addButtonHandler = (show, id) => {
    const listed = myList ? myList.some((item) => item.id === id) : null;
    if (!listed) {
      return (
        <button
          className="show__btn--add btn--circle"
          onClick={() => {
            addToList(show);
          }}
        >
          &#43;
        </button>
      );
    } else {
      return (
        <button
          className="show__btn--remove btn--circle"
          onClick={() => {
            removeFromList(show);
          }}
        >
          &#x2713;
        </button>
      );
    }
  };

  // ----  [ SETTING SCREEN FUNCTIONS]  ---- ////
  const handleExitBtn = () => {
    setScreen(screen);
    setShow({});
  };

  const getScreenPage = (screen) => {
    if (showList) {
      setScreen(screen);
      setShowList();
      setShow({});
    } else {
      setScreen(screen);
      setShow({});
    }
  };

  // ----  [ LOGOUT ]  ---- ////

  const onSignOut = async () => {
    const response = await axios.delete(
      `http://localhost:6065/signout/${localStorage.getItem("email")}`,
      { headers: { token: localStorage.getItem("token") } }
    );

    localStorage.clear();
    setIsSignedIn(false);
    navigate("/signin");

    console.log(response);
  };

  console.log(screen);
  return (
    <>
      <header>
        <h1 className="header__logo">
          <img
            onClick={() => {
              getScreenPage(0);
              extractBanner(homepageLists.trending);
            }}
            src={logo}
            alt="logo"
          />
        </h1>

        {isSignedIn && (
          <HeaderNav
            getScreenPage={getScreenPage}
            extractBanner={extractBanner}
            getGenres={getGenres}
            homepageLists={homepageLists}
            getItem={getItem}
            search={search}
            searchInput={searchInput}
            handleInput={handleInput}
            setSearchInput={setSearchInput}
            onSignOut={onSignOut}
            isSignedIn={isSignedIn}
          />
        )}

        {!isSignedIn && window.location.pathname !== "/signin" && <SignInNav />}
      </header>

      <main>
        <Routes>
          <Route
            path="/signup"
            element={
              <SignupPage
                setScreen={setScreen}
                getMovieDetails={getMovieDetails}
                addButtonHandler={addButtonHandler}
                getScreenPage={getScreenPage}
              />
            }
          />

          <Route
            exact
            path="/create-account"
            element={<CreateAccount getScreenPage={getScreenPage} />}
          />

          <Route
            exact
            path="/signin"
            element={
              <Signin isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            }
          />

          <Route
            exact
            path="/"
            element={
              screen === 0 && (
                <Homepage
                  bannerShow={banner}
                  show={show}
                  addButtonHandler={addButtonHandler}
                  screen={screen}
                  homepageLists={homepageLists}
                  setScreen={setScreen}
                  getMovieDetails={getMovieDetails}
                  headingHandler={homepageHeadingHandler}
                />
              )
            }
          />

          <Route
            path="/list-result"
            element={
              screen === 1 && (
                <ListResult
                  showList={showList}
                  searchInput={searchInput}
                  getMovieDetails={getMovieDetails}
                  addButtonHandler={addButtonHandler}
                  extractBanner={extractBanner}
                  getGenres={getGenres}
                  homepageLists={homepageLists}
                />
              )
            }
          />

          <Route
            path="/genres"
            element={
              screen === 2 && (
                <Genres
                  bannerShow={banner}
                  show={show}
                  screen={screen}
                  genres={genres}
                  getShowsByGenre={getShowsByGenre}
                  getMovieDetails={getMovieDetails}
                  addButtonHandler={addButtonHandler}
                />
              )
            }
          />

          <Route
            path="/new-and-popular"
            element={
              screen === 3 && (
                <NewAndPopular
                  getMovieDetails={getMovieDetails}
                  extractBanner={extractBanner}
                  newAndPopularShows={newAndPopularShows}
                  getNewAndPopular={getNewAndPopular}
                  banner={banner}
                  show={show}
                  screen={screen}
                  setScreen={setScreen}
                  addButtonHandler={addButtonHandler}
                />
              )
            }
          />

          <Route
            path="/my-list"
            element={
              screen === 4 && (
                <MyWatchList
                  myList={myList}
                  getMovieDetails={getMovieDetails}
                  addButtonHandler={addButtonHandler}
                />
              )
            }
          />

          <Route
            path="/my-account"
            element={
              <MyAccount
                myList={myList}
                getMovieDetails={getMovieDetails}
                addButtonHandler={addButtonHandler}
              />
            }
          />
        </Routes>

        {show.aboutShow && (
          <ShowInfo
            show={show}
            screen={screen}
            exit={handleExitBtn}
            getMovieDetails={getMovieDetails}
            addButtonHandler={addButtonHandler}
          />
        )}
      </main>
    </>
  );
}

export default App;
