import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowThumbnail from "../components/ShowThumbnail";

const NewAndPopular = (props) => {
  const API_KEY = "api_key=887d05f637b9e4864f8cec83c7da0a1f";
  const ENDPOINT_URL = "https://api.themoviedb.org/3/";
  const DEFAULT_PARAM =
    "&language=en-US&sort_by=popularity.desc&include_video=false&page=1";

  //  ---- [ STATES ] ----  //
  const [latestMovies, setLatestMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();
  const [airingToday, setAiringToday] = useState();
  const [onGoingTV, setOnGoingTV] = useState();

  useEffect(() => {
    getLatestMovies();
    getUpcoming();
    getAiringToday();
    getOnGoingTV();
  }, []);

  const getLatestMovies = async () => {
    const LATESTMOVIES_URL = ENDPOINT_URL + "movie/now_playing?" + API_KEY;

    try {
      const response = await axios.get(LATESTMOVIES_URL);
      setLatestMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getUpcoming = async () => {
    const UPCOMING_URL =
      ENDPOINT_URL + "movie/upcoming?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(UPCOMING_URL);
      setUpcomingMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getAiringToday = async () => {
    const AIRINGTODAY_URL =
      ENDPOINT_URL + "tv/airing_today?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(AIRINGTODAY_URL);
      setAiringToday(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getOnGoingTV = async () => {
    const ONGOINGTV_URL =
      ENDPOINT_URL + "tv/on_the_air?" + API_KEY + DEFAULT_PARAM;

    try {
      const response = await axios.get(ONGOINGTV_URL);
      setOnGoingTV(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="main__homepage">
        <h2>Don't miss on TV today</h2>
        <div className="home__sliders">
          {airingToday ? (
            <ShowThumbnail
              showList={airingToday}
              getMovieDetails={props.getMovieDetails}
              getRecs={props.getRecs}
            />
          ) : (
            <div>Loading</div>
          )}
        </div>

        <h2>Programmes currently on air</h2>
        <div className="home__sliders">
          {onGoingTV ? (
            <ShowThumbnail
              showList={onGoingTV}
              getMovieDetails={props.getMovieDetails}
              getRecs={props.getRecs}
            />
          ) : (
            <div>Loading</div>
          )}
        </div>

        <h2>Upcoming Films</h2>
        <div className="home__sliders">
          {upcomingMovies ? (
            <ShowThumbnail
              showList={upcomingMovies}
              getMovieDetails={props.getMovieDetails}
              getRecs={props.getRecs}
            />
          ) : (
            <div>Loading</div>
          )}
        </div>

        <h2>Latest Movies</h2>
        <div className="home__sliders">
          {latestMovies ? (
            <ShowThumbnail
              showList={latestMovies}
              getMovieDetails={props.getMovieDetails}
              getRecs={props.getRecs}
            />
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewAndPopular;
