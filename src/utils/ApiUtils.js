// //   ---- [ parts of url ] ----   //
const api_key = process.env.REACT_APP_API_KEY;
const endpoint_url = "https://api.themoviedb.org/3/";
const default_params =
  "&language=en-US&sort_by=popularity.desc&include_video=false&page=1";
const details_to_append =
  "append_to_response=videos,credits,watch/providers,images,releases,release_dates";

//HOMEPAGE LISTS API URL

export const TRENDING_URL = `${endpoint_url}trending/all/day?${api_key}${default_params}`;

export const POPULAR_SERIES_URL = `${endpoint_url}tv/popular?${api_key}${default_params}`;

export const POPULAR_MOVIES_URL = `${endpoint_url}movie/popular?${api_key}${default_params}`;

export const TOP_MOVIES_URL = `${endpoint_url}movie/top_rated?${api_key}${default_params}`;

export const TOP_SERIES_URL = `${endpoint_url}tv/top_rated?${api_key}${default_params}`;

//SHOW

export const getMovie = async (mediaType, movieId) =>
  `${endpoint_url}${mediaType}/${movieId}?${api_key}${details_to_append}`;

export const getRecs = (mediaType, movieId) =>
  `${endpoint_url}${mediaType}/${movieId}/recommendations?${api_key}${default_params}`;
