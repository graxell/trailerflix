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

  <div useRef={inputFocus} className={searchDisplay}>
    <button className="searchBar__btn" onFocus={onFocus} onBlur={onBlur}>
      <img className="searchBar__icon" src={searchIcon} alt="search icon" />
    </button>
    <input
      ref={inputFocus}
      className="searchBar__input"
      type="text"
      placeholder="Titles, people, genres"
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={handleInput}
      onKeyUp={enter}
    />
  </div>;
  const [homepageLists, setHomepageLists] = useState({}); //homepage state
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

  //   ---- [ useEffect CALLS ] ----   //
  useEffect(async () => {
    const trending = await homepageApiCall("trending/all/day?");
    const popularMovies = await homepageApiCall("movie/popular?");
    const popularSeries = await homepageApiCall("tv/popular?");
    const topRatedMovies = await homepageApiCall("movie/top_rated?");
    const topRatedSeries = await homepageApiCall("tv/top_rated?");
    setHomepageLists({
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

  //   ---- [ LOCAL STORAGE ] ----   //
  const getItem = () => {
    const savedList = JSON.parse(localStorage.getItem("personalShowList"));

    setMyList(savedList);
    console.log(savedList);
  };

  const saveToLocalStorage = (list) => {
    localStorage.setItem("personalShowList", JSON.stringify(list));
  };

  //handling add button
  const addToList = (show) => {
    const newPersonalList = [...myList, show];
    setMyList(newPersonalList);
    saveToLocalStorage(newPersonalList);
    console.log(myList);
  };

  //handling remove button
  const removeFromList = (show) => {
    const newPersonalList = myList.filter(
      (listItem) => listItem.id !== show.id
    );

    setMyList(newPersonalList);
    saveToLocalStorage(newPersonalList);
  };

  //// ----  [  HOMEPAGE - API CALL  ]  ---- ////
  const homepageApiCall = async (urlParam) => {
    const url = ENDPOINT_URL + urlParam + API_KEY + DEFAULT_PARAM;
    try {
      const response = await axios.get(url);
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
      DEFAULT_PARAM;

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
            addToList={addToList}
            removeFromList={removeFromList}
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
            addToList={addToList}
            removeFromList={removeFromList}
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
            addToList={addToList}
            removeFromList={removeFromList}
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
            addToList={addToList}
            removeFromList={removeFromList}
          />
        )}
      </main>
    </>
  );
}

// export default App;?

import Details from "./Details";
import poster_Alt from "../assets/images/poster_Alt.png";

const ShowThumbnail = (props) => {
  const { showList, getMovieDetails, getRecs } = props;

  //handles api call depending on media type
  const mediaTypeHandler = (title, movieId) => {
    if (title) {
      getMovieDetails("tv", movieId);
      getRecs("tv", movieId);
    } else {
      getMovieDetails("movie", movieId);
      getRecs("movie", movieId);
    }
  };

  const showListChecked = Array.isArray(showList)
    ? showList
    : Object.keys(showList).map((key) => showList[key]);

  const thumbnail = () => {
    return (
      showListChecked &&
      showListChecked.map((show) => {
        //destructure show
        const {
          id,
          title,
          name,
          media_type,
          poster_path,
          genre_id,
          vote_average,
          first_air_date,
          release_date,
        } = show;

        const showTitle = title ? title : name;
        const posterURL = `https://image.tmdb.org/t/p/original/${poster_path}`;
        const posterImg = poster_path ? posterURL : poster_Alt;

        return (
          media_type !== "person" && (
            <div
              key={id}
              className="thumbnail__container"
              onClick={() => mediaTypeHandler(name, id)}
            >
              <img src={posterImg} alt={title} className="thumbnail__img" />

              <Details
                title={showTitle}
                genre={genre_id}
                ratings={vote_average}
                releaseDate={
                  first_air_date
                    ? first_air_date.substring(0, 4)
                    : release_date
                    ? release_date.substring(0, 4)
                    : "Unknown"
                }
              />
            </div>
          )
        );
      })
    );
  };

  return <>{thumbnail()}</>;
};

// export default ShowThumbnail;

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
  // const [trending, setTrending] = useState();
  // const [popularMovies, setPopularMovies] = useState();
  // const [popularSeries, setPopularSeries] = useState();
  // const [topRatedMovies, setTopRatedMovies] = useState();
  // const [topRatedSeries, setTopRatedSeries] = useState();

  useEffect(() => {
    multiApi();
  }, []);

  const [homePageLists, setHomePageLists] = useState();

  const multiApi = async () => {
    const TRENDING_URL =
      ENDPOINT_URL + "trending/all/day?" + API_KEY + DEFAULT_PARAM;

    const POPULAR_MOVIES_URL =
      ENDPOINT_URL + "movie/popular?" + API_KEY + DEFAULT_PARAM;

    const POPULAR_SERIES_URL =
      ENDPOINT_URL + "tv/popular?" + API_KEY + DEFAULT_PARAM;

    const TOP_MOVIES_URL =
      ENDPOINT_URL + "movie/top_rated?" + API_KEY + DEFAULT_PARAM;

    const TOP_SERIES_URL =
      ENDPOINT_URL + "tv/top_rated?" + API_KEY + DEFAULT_PARAM;

    try {
      const trendingRes = await axios.get(TRENDING_URL);
      setHomePageLists({
        ...homePageLists,
        trending: trendingRes.data.results,
      });
      const popularMoviesRes = await axios.get(POPULAR_MOVIES_URL);
      setHomePageLists({
        ...homePageLists,
        popularMovies: popularMoviesRes.data.results,
      });
      const popularSeriesRes = await axios.get(POPULAR_SERIES_URL);
      const topRatedMoviesRes = await axios.get(TOP_MOVIES_URL);
      const topRatedSeriesRes = await axios.get(TOP_SERIES_URL);
      setHomePageLists({
        trending: trendingRes.data.results,
        popularMovies: popularMoviesRes.data.results,
        popularSeries: popularSeriesRes.data.results,
        topRatedMovies: topRatedMoviesRes.data.results,
        topRatedSeries: topRatedSeriesRes.data.results,
      });
      console.log(trendingRes.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  ///// --- [  HOMEPAGE - TRENDING SHOWS  ] --- /////
  // const trendingShows = async () => {
  //   const TRENDING_URL =
  //     ENDPOINT_URL + "trending/all/day?" + API_KEY + DEFAULT_PARAM;

  //   try {
  //     const response = await axios.get(TRENDING_URL);
  //     setTrending(response.data.results);
  //     console.log(response.data.results);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  ///// --- [ HOMEPAGE - POPULAR - MUST WATCH FILMS ] --- /////
  // const getPopularMovies = async () => {
  //   const POPULAR_MOVIES_URL =
  //     ENDPOINT_URL + "movie/popular?" + API_KEY + DEFAULT_PARAM;

  //   try {
  //     const response = await axios.get(POPULAR_MOVIES_URL);
  //     setPopularMovies(response.data.results);
  //     console.log(response.data.results);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  ///// --- [ HOMEPAGE - POPULAR SERIES ] --- /////
  // const getPopularSeries = async () => {
  //   const POPULAR_SERIES_URL =
  //     ENDPOINT_URL + "tv/popular?" + API_KEY + DEFAULT_PARAM;

  //   try {
  //     const response = await axios.get(POPULAR_SERIES_URL);
  //     setPopularSeries(response.data.results);
  //     console.log(response.data.results);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  ///// --- [ HOMEPAGE - TOP RATED MOVIES - DISCOER FILMS ] --- /////
  // const topMovies = async () => {
  //   const TOP_MOVIES_URL =
  //     ENDPOINT_URL + "movie/top_rated?" + API_KEY + DEFAULT_PARAM;

  //   try {
  //     const response = await axios.get(TOP_MOVIES_URL);
  //     setTopRatedMovies(response.data.results);
  //     console.log(response.data.results);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  ///// --- [ HOMEPAGE - TOP RATED SERIES ] --- /////
  // const topSeries = async () => {
  //   const TOP_SERIES_URL =
  //     ENDPOINT_URL + "tv/top_rated?" + API_KEY + DEFAULT_PARAM;

  //   try {
  //     const response = await axios.get(TOP_SERIES_URL);
  //     setTopRatedSeries(response.data.results);
  //     console.log(response.data.results);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

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
            homePageLists={homePageLists}
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

// export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import ShowInfo from "./pages/ShowInfo";
import Homepage from "./pages/Homepage";
import Categories from "./pages/Categories";
import CategoryResult from "./pages/ListResult";
import SearchResults from "./pages/SearchResults";
import logo from "./assets/images/logo.png";
import "./App.css";
import NewAndPopular from "./pages/NewAndPopular";

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
  const [genres, setGenres] = useState();
  const [listDetails, setListDetails] = useState();
  // const [banner, setBanner] = useState();

  // const [screen, setScreen] = useState(0);

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

  useEffect(() => {
    extractBanner(0, trending);
  }, [trending]);

  //// ----  [  HOMEPAGE - API CALLS  ]  ---- ////

  // --- [  Trending shows ] --- //
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

  // --- [ Popular - MUST WATCH FILMS ] --- //
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

  // --- [ Popular SERIES ] --- //
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

  // --- [ Top Rated Movies - DISCOVER FILMS ] --- //
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

  // --- [ Top Rated SERIES ] --- //
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

  // --- [ extractBanner ] --- //
  const extractBanner = async (screen, showList) => {
    if (showList) {
      const show = showList[Math.floor(Math.random() * showList.length)];
      getMovieDetails(screen, show.media_type, show.id);
      console.log(show);
    }
  };
  //// ----  [  FUNCTIONS TO GET MORE INFO ABOUT SHOW  ]  ---- ////

  //   --- [ SHOWINFO - movie/tv information page] ---   //
  const getMovieDetails = async (screen, mediaType, movieId) => {
    const movieURL =
      ENDPOINT_URL +
      `${mediaType}/${movieId}?` +
      API_KEY +
      "&append_to_response=videos,credits,watch/providers,images,releases,release_dates";

    try {
      const response = await axios.get(movieURL);
      setShow({ screen: screen, show: bannerShow });
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
      setScreen(4);
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
              extractBanner(trending);
            }}
            src={logo}
            alt="logo"
          />
        </h1>

        <nav>
          <ul>
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

        <Search
          search={search}
          searchInput={searchInput}
          handleInput={handleInput}
        />
      </header>

      <main>
        {screen === 0 && (
          <Homepage
            bannerShow={banner}
            trending={trending}
            popularMovies={popularMovies}
            popularSeries={popularSeries}
            topRatedMovies={topRatedMovies}
            topRatedSeries={topRatedSeries}
            setScreen={setScreen}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}

        {screen === 1 && showList && (
          <SearchResults
            showList={showList}
            setScreen={setScreen}
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

        {screen === 3 && (
          <Categories
            genres={genres}
            getShowsByGenre={getShowsByGenre}
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}

        {screen === 4 && showList && (
          <CategoryResult
            showList={showList}
            listDetails={listDetails}
            getMovieDetails={getMovieDetails}
          />
        )}

        {screen === 5 && (
          <NewAndPopular
            getMovieDetails={getMovieDetails}
            getRecs={getMovieRecs}
          />
        )}
      </main>
    </>
  );
}

// export default App;

import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";
import Runtime from "../components/Runtime";
import Video from "../components/Video";

const ShowInfo = (props) => {
  const { screen, recs, show, exit, getMovieDetails, getRecs } = props;
  //destructure props.show
  const {
    id,
    first_air_date,
    release_date,
    title,
    name,
    backdrop_path,
    vote_average,
    runtime,
    videos,
    genres,
    overview,
    number_of_seasons,
    tagline,
  } = props.show;

  // backdrop path
  const backdropURL = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

  //show release year only
  const releaseYear = first_air_date
    ? first_air_date.substring(0, 4)
    : release_date.substring(0, 4);

  //handling show duration
  const duration = () => {
    if (runtime) {
      return <Runtime runtime={runtime} />;
    } else if (number_of_seasons === 1) {
      return <div>{number_of_seasons} Season</div>;
    } else {
      return <div>{number_of_seasons} Seasons</div>;
    }
  };

  //handling recommendation list
  const displayRecsHandler = () => (recs && recs.length > 0 ? "block" : "none");

  //checking if data is film or tv to display title
  const showTitle = title ? title : name;

  return (
    <>
      {/* top of the page - poster & titles */}
      <div key={id} className="movie__container">
        <div className="banner--container">
          {backdrop_path ? (
            <img src={backdropURL} alt={showTitle} className="banner__img" />
          ) : (
            <div className="backdrop__alt">No available backdrop poster!</div>
          )}

          {/* top section - buttons */}
          <div className="banner__details--wrapper">
            <div className="banner__details">
              <button className="btn--circle btn__exit" onClick={exit}>
                &#10005;
              </button>
              {tagline && <p>{tagline}</p>}
              <h2 className="banner__heading">{showTitle}</h2>
              <div className="movie__btns">
                <button
                  className="movie__btn--play"
                  onClick={() => {
                    console.log("Play Button was clicked!");
                  }}
                >
                  Play
                </button>
                <button
                  className="movie__btn--add btn--circle"
                  onClick={() => {
                    console.log("Add Button was clicked!");
                  }}
                >
                  &#43;
                </button>
                <button
                  className="movie__btn--like btn--circle"
                  onClick={() => {
                    console.log("Like Button was clicked!");
                  }}
                >
                  &#128077;
                </button>
                <button
                  className="movie__btn--dislike btn--circle"
                  onClick={() => {
                    console.log("Dislike Button was clicked!");
                  }}
                >
                  &#128078;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* second section - small show info */}
        <div className="movie__details">
          <div className="movie__left">
            <ul>
              <li>{releaseYear}</li>
              <li>{duration()}</li>
              <li>{vote_average}</li>
            </ul>
            <p>{overview}</p>
          </div>

          <div className="movie__right">
            <ul className="movie__genre">
              <h3>Genres:</h3>
              {genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          </div>
        </div>

        {/* third section - trailers and other videos*/}
        <div className="movie__videos">
          <h3>Trailers & More</h3>
          <div className="movie__trailers">
            <Video videos={videos.results} />
          </div>
        </div>

        {/* fourth section - more like this - show recommendation */}
        <div
          className="movie__videos"
          style={{ display: displayRecsHandler() }}
        >
          <h3>More Like This</h3>
          <div className="movie_recs">
            <ShowThumbnail
              showList={recs}
              getMovieDetails={getMovieDetails}
              getRecs={getRecs}
            />
          </div>
        </div>

        {/* fifth section - more details
        <div className="movie__details">
          <h3>Cast:</h3>
          {props.shows.credits.casts.map((cast) => {
            <li>{cast.name}</li>;
          })}
        </div> */}
      </div>
    </>
  );
};

export default ShowInfo;
