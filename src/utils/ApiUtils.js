// //   ---- [ parts of url ] ----   //
const api_key = process.env.REACT_APP_API_KEY;
const endpoint_url = "https://api.themoviedb.org/3/";
const default_params =
  "&language=en-US&sort_by=popularity.desc&include_video=false&page=1";
const details_to_append =
  "append_to_response=videos,credits,watch/providers,images,releases,release_dates";

module.exports = {
  //HOMEPAGE LISTS API URL
  //   trending: `${endpoint_url}trending/all/day?${api_key}${default_params}`,

  //   popularSeries: `${endpoint_url}tv/popular?${api_key}${default_params}`,

  //   popularMovies: `${endpoint_url}movie/popular?${api_key}${default_params}`,

  //   topRatedMovies: `${endpoint_url}movie/top_rated?${api_key}${default_params}`,

  //   topRatedSeries: `${endpoint_url}tv/top_rated?${api_key}${default_params}`,

  TRENDING_URL: `${endpoint_url}trending/all/day?${api_key}${default_params}`,

  POPULAR_SERIES_URL: `${endpoint_url}tv/popular?${api_key}${default_params}`,

  POPULAR_MOVIES_URL: `${endpoint_url}movie/popular?${api_key}${default_params}`,

  TOP_MOVIES_URL: `${endpoint_url}movie/top_rated?${api_key}${default_params}`,

  TOP_SERIES_URL: `${endpoint_url}tv/top_rated?${api_key}${default_params}`,

  //SHOW

  getMovie: async (mediaType, movieId) =>
    `${endpoint_url}${mediaType}/${movieId}?${api_key}${details_to_append}`,

  getRecs: (mediaType, movieId) =>
    `${endpoint_url}${mediaType}/${movieId}/recommendations?${api_key}${default_params}`,
};
