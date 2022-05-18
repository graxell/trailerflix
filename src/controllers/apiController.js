import axios from "axios";

// //   ---- [ parts of url ] ----   //
const API_KEY = process.env.REACT_APP_API_KEY;
const ENDPOINT_URL = "https://api.themoviedb.org/3/";
const DEFAULT_PARAM =
  "&language=en-US&sort_by=popularity.desc&include_video=false&page=1";

export const getShowList = async (urlParam) => {
  const URL = ENDPOINT_URL + urlParam + API_KEY + DEFAULT_PARAM;

  try {
    const list = await axios.get(URL);

    if (list.data.results) {
      return list.data.results;
    } else {
      return "Sorry, we cannot retrieve this list right now!";
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const getMovieDetails = async (mediaType, movieId) => {
  const SHOW_URL = `${ENDPOINT_URL}${mediaType}/${movieId}?${API_KEY}&append_to_response=videos,credits,watch/providers,images,releases,release_dates,media_type`;

  try {
    const response = await axios.get(SHOW_URL);

    if (response.data) {
      return response.data;
    } else {
      return `Sorry, we cannot retrieve ${mediaType} right now`;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const getMovieRecs = async (mediaType, movieId) => {
  const RECS_URL = `${ENDPOINT_URL}${mediaType}/${movieId}/recommendations?${API_KEY}${DEFAULT_PARAM}`;

  try {
    const response = await axios.get(RECS_URL);

    if (response.data.results) {
      return response.data.results;
    } else {
      return `Sorry, we cannot retrieve ${mediaType} right now`;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getGenreList = async (mediaType) => {
  const GENRE_URL = `${ENDPOINT_URL}genre/${mediaType}/list?${API_KEY}${DEFAULT_PARAM}`;

  try {
    const response = await axios.get(GENRE_URL);

    if (response.data.genres) {
      return response.data.genres;
    } else {
      return "Sorry, we cannot retrieve the genres right now!";
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const getShowsByGenre = async (mediaType, id, genre) => {
  const URL = `${ENDPOINT_URL}discover/${mediaType}?${API_KEY}&with_genres=${id}${DEFAULT_PARAM}`;

  try {
    const response = await axios.get(URL);
    if (response.data.results) {
      return {
        shows: response.data.results,
        topic: genre,
        mediaType: mediaType,
      };
    } else {
      return "Sorry, we cannot retrieve the genres right now!";
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const getShowsByMediaType = async (mediaType) => {
  const URL = `${ENDPOINT_URL}discover/${mediaType}?${API_KEY}${DEFAULT_PARAM}`;

  try {
    const response = await axios.get(URL);

    if (response.data.results) {
      return response.data.results;
    } else {
      return "Sorry, we cannot retrieve the list right now!";
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const searchURL = (input) =>
  `${ENDPOINT_URL}search/multi?${API_KEY}&query=${input}${DEFAULT_PARAM}`;
