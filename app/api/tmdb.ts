import axios from "axios";

const key = process.env.NEXT_PUBLIC_TMDB_API;

const baseUrl = "https://api.themoviedb.org/3";
const movieUrl = "/movie";
const showUrl = "/tv";

export async function searchMedia(filename: string, mediaType: string) {
  var yr = getYearFromFileName(filename).trim();
  var searchPhrase = filename.replace(yr, "").replace("(", "").replace(")", "");
  //var searchPhrase = removeYear(filename).trim();
  searchPhrase = searchPhrase.split(" ").join("+");
  var apiURL =
    `${baseUrl}` +
    "/search" +
    (mediaType == "shows" ? `${showUrl}` : `${movieUrl}`) +
    "?api_key=" +
    key +
    "&query=" +
    searchPhrase +
    (yr.length == 4 ? "&primary_release_year=" + yr : "");

  const response = await axios.get(apiURL);
  const movies = response.data.results;

  return movies;
}

export async function getMedia(
  mediaId: number,
  tmdbId: number,
  mediaType: string
) {
  var apiURL =
    `${baseUrl}` +
    (mediaType == "shows" ? `${showUrl}` : `${movieUrl}`) +
    "/" +
    `${tmdbId}` +
    "?api_key=" +
    key +
    "&append_to_response=release_dates";

  const response = await axios.get(apiURL);
  const movie = await response.data;
  //console.log(movie) // this returns expected JSON

  return movie;
}

// export function removeYear(filename: string, yr: string) {
//   var res = filename;
//   res = res.replace(yr, "").replace("(", "").replace(")","");

//   return res;
// }

export function getYearFromFileName(filename: string) {
  var yr = "";

  if (filename.length > 6) {
    yr = filename.substring(filename.length - 6);
    if (yr.substring(yr.length - 1) == ")" && yr.substring(0, 1) == "(") {
      yr = yr.split("(").join("");
      yr = yr.split(")").join("");
    }
  }
  return yr;
}

export default searchMedia;
