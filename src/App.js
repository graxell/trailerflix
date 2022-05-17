import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Show from "./containers/show/Show";
import Homepage from "./containers/homepage/Homepage";
import NavBar from "./components/navigation/NavBar";
import SignInNav from "./components/navigation/SignInNav";
import Series from "./containers/seriesAndFilms/Series";
import Films from "./containers/seriesAndFilms/Films";
import NewAndPopular from "./containers/newAndPopular/NewAndPopular";
import MyWatchList from "./containers/watchList/MyWatchList";
import SignupPage from "./containers/account/signUp/SignUpPage";
import Signin from "./containers/account/signIn/Signin";
import Profiles from "./containers/profiles/Profiles";
import CreateAccount from "./containers/account/signUp/CreateAccount";
import logo from "./assets/images/logo.png";
import "./css/App.css";
import "./css/Accounts.css";
import "./css/MediaQuery.css";
import "./css/Profiles.css";
import MyAccount from "./containers/account/viewAccount/MyAccount";
import SearchResult from "./containers/searchResults/SearchResult";
import {
  getWatchList,
  onAddShow,
  onRemoveShow,
  getProfiles,
} from "./controllers/dbController";

//   ---- [ FUNCTION START ] ----   //

function App() {
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
    checkProfiles();
    updateWatchList();
  }, [profiles.assigned]);

  //determine is a user is logged in
  const getAuth = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  };

  //get profile list of user
  const checkProfiles = async () => {
    try {
      const user = localStorage.getItem("profile_name");
      const result = await getProfiles();
      if (result) {
        setProfiles({
          ...profiles,
          all: result,
          assigned: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update list
  const updateWatchList = async () => {
    try {
      const list = await getWatchList();

      if (list === 0) {
        setMyList([]);
      } else {
        const arr = [];
        list.forEach((res) => {
          arr.push(JSON.parse(res.show));
        });
        setMyList(arr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //add show to list
  const addToList = async (show) => {
    const added = await onAddShow(JSON.stringify(show));
    if (added) {
      updateWatchList();
    } else {
      console.log(added);
    }
  };

  // remove show from list
  const removeFromList = async (id) => {
    const removed = await onRemoveShow(id);
    if (removed === 1) {
      updateWatchList();
    } else {
      console.log(removed);
    }
  };

  //handling add/remove button
  const addButtonHandler = (show, id) => {
    const listed = myList && myList.some((item) => item.id === id);
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
            removeFromList(id);
          }}
        >
          &#x2713;
        </button>
      );
    }
  };

  //replace local storage profile name when profile is changed
  const onAssignProfile = async (profile) => {
    const profileChange = localStorage.getItem("profile_name");
    setProfiles({ ...profiles, assigned: profile });

    profileChange !== profile
      ? localStorage.setItem("profile_name", profile)
      : localStorage.setItem("profile_name", profile);

    await updateWatchList();
    !isSignedIn && setIsSignedIn(true);
    navigate("/");
  };

  // ----  [ SETTING SCREEN FUNCTIONS]  ---- ////
  const handleExitBtn = () => {
    setShow({});
  };

  console.log(myList);
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
          onAssignProfile={onAssignProfile}
          updateWatchList={updateWatchList}
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
                onAssignProfile={onAssignProfile}
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
                isSignedIn={isSignedIn}
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
          <Show
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
