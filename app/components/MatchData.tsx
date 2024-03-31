"use client";
import { searchForSpecificMedia, getMedia } from "@/app/api/tmdb";
import { useEffect, useState } from "react";
import { updateMovie } from "@/app/db/media";
import { format } from "date-fns";
import {
  iMediaProps,
  iTMDBSearchResponse,
  iTMDBResponse,
  iGenre,
  iCertification,
  iVideo,
  iCollection,
} from "@/app/interfaces/TMDBInterfaces";

export function MatchData({ mediaId, directoryName, mediaType }: iMediaProps) {
  const [mediaList, setMediaList] = useState<iTMDBSearchResponse[]>([]);

  function getGenreList(genres: iGenre[]) {
    var gList: string = "";
    const grs = genres.forEach((r) => {
      gList = gList + r.name + ", ";
    });
    gList = gList.trim();

    if (gList.substring(gList.length - 1) == ",") {
      gList = gList.substring(0, gList.length - 1);
    }
    return gList;
  }

  function getCertification(cert: iCertification) {
    var certification: string = "NA";

    cert.results.forEach((r) => {
      if (r.iso_3166_1 == "US") {
        r.release_dates.forEach((c) => {
          if (c.certification != "" && certification == "NA") {
            certification = c.certification;
          }
        });
      }
    });

    return certification;
  }

  function getTrailerURL(video: iVideo) {
    var trailerURL: string = "";
    video.results.forEach((r) => {
      if (
        r.iso_639_1.toUpperCase() == "EN" &&
        r.site.toUpperCase() == "YOUTUBE" &&
        r.key != ""
      ) {
        trailerURL = "http://www.youtube.com/watch?v=" + r.key;
        return trailerURL;
      }
    });
    return trailerURL;
  }

  useEffect(() => {
    const fetchData = async () => {
      const searchResults = await searchForSpecificMedia(
        directoryName,
        mediaType
      );

      setMediaList(searchResults);
      if (searchResults.length == 1) {
        const mediaResults = await Promise.all<iTMDBResponse>(
          searchResults.map((row) => getMedia(mediaId, row.id, mediaType))
        );

        const mItem: iTMDBResponse = mediaResults[0];
        const genreList = getGenreList(mItem.genres);
        const certification = getCertification(mItem.release_dates);
        const trailerURL = getTrailerURL(mItem.videos);
        const collectionName = mItem.belongs_to_collection.name;

        var releaseDate =
          mItem.release_date != null
            ? format(mItem.release_date, "yyyy-MM-dd")
            : "1900-01-01";

        updateMovie(
          mediaId,
          mItem.id.toString(),
          mItem.imdb_id,
          mItem.title,
          mItem.original_title,
          mItem.overview,
          releaseDate,
          mItem.poster_path,
          mItem.backdrop_path,
          mItem.tagline,
          mItem.runtime,
          mItem.adult,
          genreList,
          collectionName,
          certification,
          trailerURL
        );
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>{directoryName}</h1>
      <div>
        Possible Matches:
        <br />
        <div className="grid">
          {mediaList.map((x, mediaId) => (
            <div key={mediaId} className="row-auto col-span-4">
              TMDBID: {x.id}
              Title: {x.title}
              Release Date: {x.release_date}
            </div>
          ))}
        </div>
        <br />
        <br />
      </div>
    </>
  );
}
