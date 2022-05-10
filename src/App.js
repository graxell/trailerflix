import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ShowInfo from "./components/show/ShowInfo"; //need to change name
import Homepage from "./components/pageContainers/Homepage";
import NavBar from "./components/header/NavBar";
import SignInNav from "./components/header/SignInNav";
import Series from "./components/pageContainers/Series";
import Films from "./components/pageContainers/Films";
import NewAndPopular from "./components/pageContainers/NewAndPopular";
import MyWatchList from "./components/account/MyWatchList";
import SignupPage from "./components/account/createAccount/SignUpPage";
import Signin from "./components/signIn/Signin";
import Profiles from "./components/account/Profiles";
import CreateAccount from "./components/account/createAccount/CreateAccount";
import logo from "./assets/images/logo.png";
import "./css/App.css";
import "./css/Accounts.css";
import "./css/MediaQuery.css";
import "./css/Profiles.css";
import MyAccount from "./components/account/MyAccount";
import SearchResult from "./components/pageContainers/SearchResult";
import { getWatchList } from "./controllers/dbController";

//   ---- [ FUNCTION START ] ----   //

function App() {
  //   ---- [ parts of url ] ----   //

  const navigate = useNavigate();

  //   ---- [ STATES ] ----   //
  const [show, setShow] = useState({});
  const [banner, setBanner] = useState();
  const [showList, setShowList] = useState(); //list based on genre/search result
  const [myList, setMyList] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profiles, setProfiles] = useState({});

  //   ---- [ useEffect CALLS ] ----   //

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    getWatchList(profiles.assigned).then((result) => {
      setMyList(result);
    });
  });

  //   ---- [ LOCAL STORAGE ] ----   //

  const saveToLocalStorage = (list) => {
    localStorage.setItem("personalShowList", JSON.stringify(list));
  };

  const getItem = () => {
    const savedList = JSON.parse(localStorage.getItem("personalShowList"));

    setMyList(savedList);
    console.log(savedList);
  };

  const getAuth = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }

    console.log(isSignedIn);
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
    setShow({});
  };

  return (
    <>
      <header>
        <h1 className="header__logo">
          <img
            onClick={() => {
              navigate("/");
              setShow({});
            }}
            src={logo}
            alt="logo"
          />
        </h1>

        <NavBar
          setShow={setShow}
          setShowList={setShowList}
          profiles={profiles}
          setProfiles={setProfiles}
          setIsSignedIn={setIsSignedIn}
          isSignedIn={isSignedIn}
        />

        {!isSignedIn && window.location.pathname !== "/signin" && <SignInNav />}
      </header>

      <main>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />

          <Route exact path="/create-account" element={<CreateAccount />} />

          <Route
            exact
            path="/signin"
            element={
              <Signin isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            }
          />

          <Route
            exact
            path="/profiles"
            element={
              <Profiles
                setProfiles={setProfiles}
                profiles={profiles}
                setIsSignedIn={setIsSignedIn}
              />
            }
          />

          <Route
            exact
            path="/"
            element={
              <Homepage
                banner={banner}
                setBanner={setBanner}
                show={show}
                setShow={setShow}
                addButtonHandler={addButtonHandler}
              />
            }
          />

          <Route
            path="/series"
            element={
              <Series
                show={show}
                setShow={setShow}
                showList={showList}
                setShowList={setShowList}
                addButtonHandler={addButtonHandler}
              />
            }
          />

          <Route
            path="/films"
            element={
              <Films
                show={show}
                setShow={setShow}
                showList={showList}
                setShowList={setShowList}
                addButtonHandler={addButtonHandler}
              />
            }
          />

          <Route
            path="/new-and-popular"
            element={
              <NewAndPopular
                banner={banner}
                setBanner={setBanner}
                show={show}
                setShow={setShow}
                addButtonHandler={addButtonHandler}
              />
            }
          />

          <Route
            path="/my-list"
            element={
              <MyWatchList
                myList={myList}
                setShow={setShow}
                addButtonHandler={addButtonHandler}
              />
            }
          />

          <Route
            path="/my-account"
            element={
              <MyAccount
                addButtonHandler={addButtonHandler}
                profiles={profiles}
              />
            }
          />

          <Route
            path="/search/:searchInput"
            element={
              <SearchResult
                setShowList={setShowList}
                showList={showList}
                addButtonHandler={addButtonHandler}
                setShow={setShow}
                show={show}
              />
            }
          />
        </Routes>

        {show.aboutShow && (
          <ShowInfo
            show={show}
            setShow={setShow}
            exit={handleExitBtn}
            addButtonHandler={addButtonHandler}
          />
        )}
      </main>
    </>
  );
}

export default App;
