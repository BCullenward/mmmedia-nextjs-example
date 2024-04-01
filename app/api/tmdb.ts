import axios from "axios";
import {
  iTMDBSearchResponse,
  iTMDBResponse,
} from "@/app/interfaces/TMDBInterfaces";

const key = process.env.NEXT_PUBLIC_TMDB_API;

const baseUrl = "https://api.themoviedb.org/3";
const movieUrl = "/movie";
const showUrl = "/tv";

export async function searchForSpecificMedia(
  searchPhrase: string,
  mediaType: string,
  year: string,
  region: string
) {
  var apiURL =
    `${baseUrl}` +
    "/search" +
    (mediaType == "shows" ? `${showUrl}` : `${movieUrl}`) +
    "?api_key=" +
    key +
    "&query=" +
    searchPhrase +
    (year.length == 4 ? "&primary_release_year=" + year : "") +
    (region?.length != 0 ? "&region=" + region : "");

  const response = await axios.get(apiURL);
  const movies: iTMDBSearchResponse[] = response.data.results;

  // console.log("apiUrl", apiURL);
  // console.log("movies", movies);

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
    "&append_to_response=release_dates,videos";

  const response = await axios.get(apiURL);
  const movie: iTMDBResponse = await response.data;

  return movie;
}

// export function getYearFromFileName(filename: string) {
//   var yr = "";

//   if (filename.length > 6) {
//     yr = filename.substring(filename.length - 6);
//     if (yr.substring(yr.length - 1) == ")" && yr.substring(0, 1) == "(") {
//       yr = yr.split("(").join("");
//       yr = yr.split(")").join("");
//     }
//   }
//   return yr;
// }

export default searchForSpecificMedia;
