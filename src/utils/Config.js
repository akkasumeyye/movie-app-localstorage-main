const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a731329dc41b39ed18ae0c5912c05c97";

const SEARCH_URL = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&`;
const NOW_PLAYING_URL = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const POPULAR_URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=`;
const TOP_RATED_URL = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=`;

export {
  API_URL,
  API_KEY,
  SEARCH_URL,
  NOW_PLAYING_URL,
  POPULAR_URL,
  TOP_RATED_URL,
};