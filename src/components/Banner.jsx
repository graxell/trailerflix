import React, { useEffect } from "react";
import banner_Alt from "../assets/images/banner_Alt.png";

const Banner = (props) => {
  //destructure lists
  const {
    bannerShow,
    getMovieDetails,
    screen,
    exit,
    setMyList,
    myList,
    addBtn,
    addBtnToggle,
  } = props;
  const {
    backdrop_path,
    media_type,
    id,
    title,
    name,
    release_date,
    first_air_date,
    vote_average,
    overview,
    tagline,
    homepage,
  } = bannerShow;

  const backdropURL = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  //checks available info
  const bannerImg = backdrop_path ? backdropURL : banner_Alt;
  const showTitle = title ? title : name;
  const showReleaseYear = release_date
    ? release_date.substring(0, 4)
    : first_air_date.substring(0, 4);

  //handling play button
  const handlePlay = () => {
    homepage && window.open(homepage);
  };

  // useEffect(() => {
  //   const savedList = JSON.parse(localStorage.getItem("personalShowList"));

  //   setMyList(savedList);
  // }, [myList]);

  const saveToLocalStorage = (list) => {
    localStorage.setItem("personalShowList", JSON.stringify(list));
  };

  //handling add button
  const addToList = () => {
    const newPersonalList = [...myList, bannerShow];
    setMyList(newPersonalList);
    saveToLocalStorage(newPersonalList);
    console.log(myList);
  };

  //handling remove button
  const removeFromList = () => {
    const newPersonalList = myList.filter(
      (listItem) => listItem.id !== bannerShow.id
    );

    setMyList(newPersonalList);
    saveToLocalStorage(newPersonalList);
  };

  // const plusBtn = () => {
  //   if (!addBtn) {
  //     return (
  //       <button
  //         className="show__btn--add btn--circle"
  //         onClick={() => {
  //           addToList();
  //           addBtnToggle();
  //         }}
  //       >
  //         &#43;
  //       </button>
  //     );
  //   } else if (addBtn) {
  //     <button
  //       className="show__btn--remove btn--circle"
  //       onClick={() => {
  //         removeFromList();
  //         addBtnToggle();
  //       }}
  //     >
  //       -
  //     </button>;
  //   }
  // };

  return (
    <>
      <div className="banner--container">
        <img className="banner__img" src={bannerImg} alt={showTitle} />
        <div className="banner__details--wrapper">
          {screen === 2 && (
            <button className="btn--circle btn__exit" onClick={exit}>
              &#10005;
            </button>
          )}
          <div className="banner__details">
            {tagline && <p>{tagline}</p>}
            <h2 className="banner__heading">{showTitle}</h2>

            <div className="banner__bottom">
              {screen !== 2 && <p>{overview}</p>}

              {screen !== 2 ? (
                <div className="banner__bottom--inline info">
                  <p>{showReleaseYear}</p>
                  <p>{vote_average}/10</p>
                  <button
                    className="banner__infoBtn"
                    onClick={() => {
                      getMovieDetails(media_type, id);
                    }}
                  >
                    More Info
                  </button>
                </div>
              ) : (
                <div className="banner__bottom--inline btns">
                  <button className="show__btn--play" onClick={handlePlay}>
                    Play
                  </button>
                  {myList.includes(bannerShow) ? (
                    <button
                      className="show__btn--remove btn--circle"
                      onClick={() => {
                        removeFromList();
                      }}
                    >
                      -
                    </button>
                  ) : (
                    <button
                      className="show__btn--add btn--circle"
                      onClick={() => {
                        addToList();
                      }}
                    >
                      &#43;
                    </button>
                  )}

                  <button
                    className="show__btn--like btn--circle"
                    onClick={() => {
                      console.log("Like Button was clicked!");
                    }}
                  >
                    &#128077;
                  </button>
                  <button
                    className="show__btn--dislike btn--circle"
                    onClick={() => {
                      console.log("Dislike Button was clicked!");
                    }}
                  >
                    &#128078;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
