import React from "react";
import ShowThumbnail from "../components/ShowThumbnail";
import Banner from "../components/Banner";

const Homepage = (props) => {
  const {
    bannerShow,
    trending,
    popularMovies,
    popularSeries,
    topRatedMovies,
    topRatedSeries,
    getMovieDetails,
    getRecs,
  } = props;

  return (
    <>
      <div className="main__homepage">
        {bannerShow && (
          <Banner bannerShow={bannerShow} getMovieDetails={getMovieDetails} />
        )}

        <div className="main__homepage--lists">
          <h2>Trending Now</h2>
          <div className="home__sliders">
            {trending ? (
              <ShowThumbnail
                showList={trending}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>

          <h2>Must-watch Films</h2>
          <div className="home__sliders">
            {popularMovies ? (
              <ShowThumbnail
                showList={popularMovies}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>

          <h2>Popular Series</h2>
          <div className="home__sliders">
            {popularSeries ? (
              <ShowThumbnail
                showList={popularSeries}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>

          <h2>Discover Films</h2>
          <div className="home__sliders">
            {topRatedMovies ? (
              <ShowThumbnail
                showList={topRatedMovies}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>

          <h2>Binge-worthy TV Shows</h2>
          <div className="home__sliders">
            {topRatedSeries ? (
              <ShowThumbnail
                showList={topRatedSeries}
                getMovieDetails={getMovieDetails}
                getRecs={getRecs}
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
