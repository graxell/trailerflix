import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";
import Banner from "../components/Banner";
import Details from "../components/Details";
import poster_Alt from "../assets/images/poster_Alt.png";

const Homepage = (props) => {
  const {
    addToList,
    removeFromList,
    bannerShow,
    homepageLists,
    getMovieDetails,
    getRecs,
    screen,
  } = props;

  const mediaTypeHandler = (title, movieId) => {
    if (title) {
      getMovieDetails("tv", movieId);
      getRecs("tv", movieId);
    } else {
      getMovieDetails("movie", movieId);
      getRecs("movie", movieId);
    }
  };

  const homepageListsArr = Object.keys(homepageLists).map(
    (key) => homepageLists[key]
  );

  let newObj = Object.keys(homepageLists);

  const test = () => {
    return newObj.map((key) => {
      return homepageLists[key].map((item) => {
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
        } = item;

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
      });
    });
  };

  // .map(([key, [...value]]) => [key, ...value])
  // const homepageHeadingHandler = (arrList) => {
  //   if (arrList.key === "trending") {
  //     return <h2>Trending Now</h2>;
  //   } else if (arrList.key === "popularMovies") {
  //     return <h2>Must-watch Films</h2>;
  //   } else if (arrList.key === "popularSeries") {
  //     return <h2>Popular Series</h2>;
  //   } else if (arrList.key === "topRatedMovies") {
  //     return <h2>Discover Great Films</h2>;
  //   } else {
  //     return <h2>Binge-worthy TV Shows</h2>;
  //   }
  // };

  return (
    <>
      <div className="main__homepage">
        {bannerShow && (
          <Banner
            screen={screen}
            bannerShow={bannerShow}
            getMovieDetails={getMovieDetails}
          />
        )}

        <button
          onClick={() => {
            console.log(newObj);
          }}
        >
          press
        </button>

        <div className="home__sliders">{test()}</div>

        <div className="main__homepage--lists">
          <h2>Trending Now</h2>
          <div className="home__sliders">
            {homepageLists.trending ? (
              <ShowThumbnail
                showList={homepageLists.trending}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
                addToList={addToList}
                removeFromList={removeFromList}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>

          <h2>Must-watch Films</h2>
          <div className="home__sliders">
            {homepageLists.popularMovies ? (
              <ShowThumbnail
                showList={homepageLists.popularMovies}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
                addToList={addToList}
                removeFromList={removeFromList}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>

          <h2>Popular Series</h2>
          <div className="home__sliders">
            {homepageLists.popularSeries ? (
              <ShowThumbnail
                showList={homepageLists.popularSeries}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
                addToList={addToList}
                removeFromList={removeFromList}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>

          <h2>Discover Films</h2>
          <div className="home__sliders">
            {homepageLists.topRatedMovies ? (
              <ShowThumbnail
                showList={homepageLists.topRatedMovies}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
                addToList={addToList}
                removeFromList={removeFromList}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>

          <h2>Binge-worthy TV Shows</h2>
          <div className="home__sliders">
            {homepageLists.topRatedSeries ? (
              <ShowThumbnail
                showList={homepageLists.topRatedSeries}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
                addToList={addToList}
                removeFromList={removeFromList}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
