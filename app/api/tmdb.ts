import axios from "axios";

const key = process.env.NEXT_PUBLIC_TMDB_API;

const baseUrl = "https://api.themoviedb.org/3";
const movieSearchUrl = baseUrl + "/search/movie";
const showSearchUrl = baseUrl + "/search/tv";

export async function searchMedia(filename: string, mediaType: string) {
  var searchPhrase = removeYear(filename).trim();
  searchPhrase = searchPhrase.split(" ").join("+");
  var apiURL = mediaType == "shows" ? `${showSearchUrl}` : `${movieSearchUrl}`;
  apiURL = apiURL + "?api_key=" + key + "&query=" + searchPhrase;
  const response = await axios.get(apiURL);
  const movies = response.data.results;
  //console.log(movies);

  return movies;
}

export function removeYear(filename: string) {
  var res = filename;

  if (filename.length > 6) {
    var yr = filename.substring(filename.length - 6);

    if (yr.substring(yr.length - 1) == ")" && yr.substring(0, 1) == "(") {
      res = filename.split(yr).join("");
    }
  }

  return res;
}

export default searchMedia;
