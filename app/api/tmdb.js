import axios from "axios";

const key = process.env.TMDB_API;

const baseUrl = "https://api.themoviedb.org/3";
const movieSearchUrl = baseUrl + "/search/movie";
const showSearchUrl = baseUrl + "/search/tv";

export function searchMedia(filename, mediaType) {
  var searchPhrase = removeYear(filename).trim();
  searchPhrase = searchPhrase.split(" ").join("+");
  var url = mediaType == "shows" ? `${showSearchUrl}` : `${movieSearchUrl}`;

  url = url + "?api_key=" + key + "&query=" + searchPhrase;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     // Authorization:
  //     //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWQyNTNkZTFjNDM5ODMxNmEyMTg3NGEyMWU3YWIxMiIsInN1YiI6IjYxZTQ0OWNjN2QyYmMxMDA5ZmNkMTMyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NhbJPFYcLOAZrMagJEVk65QSl-IYBHQKguUH_Rt0b_w",
  //   },
  // };

  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((json) => console.log(json))
  //   .catch((err) => console.error("error: " + err));

  const returnedData = axios.get(url).then((res) => res.data.results);
  //const ts = JSON.parse(returnedData);
  //axios.get(url).then((response) => response.data.results)

  //const results = JSON.parse(returned);

  //console.log(res);

  return url;
}

export function removeYear(filename) {
  var res = filename;

  if (filename.length > 6) {
    var yr = filename.substring(filename.length - 6);

    if (yr.substring(yr.length - 1) == ")" && yr.substring(0, 1) == "(") {
      res = filename.split(yr).join("");
    }
  }

  return res;
}

const ml = [];
export default searchMedia;
