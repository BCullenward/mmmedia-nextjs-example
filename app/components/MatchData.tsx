"use client";
import { searchForSpecificMedia, getMedia } from "@/app/api/tmdb";
import { useEffect, useState } from "react";
import { updateMovie } from "@/app/db/media";

interface iMediaProps {
  mediaId: number;
  directoryName: string;
  mediaType: string;
}

interface iTMDBSearchResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface iTMDBResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: iGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: string[];
  production_countries: string[];
  release_date: string;
  release_dates: iCertification[];
  revenue: number;
  runtime: number;
  spoken_languages: string[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface iGenre {
  id: number;
  name: string;
}

interface iCertification {
  iso_3166_1: string;
  release_dates: {
    certification: string;
    descriptors: string[];
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
  }[];
}

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

  function getCertification(cert: iCertification[]) {
    var certification: string = "NA";

    console.log(cert);
    // cert.map((row) => {
    //   if (row.iso_3166_1 == "US") {
    //     console.log("US");
    //   }
    // });
    // const c = cert.forEach((r) => {
    //   console.log(r.iso_3166_1.toString());
    // });

    return certification;
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

        const trailerURL = "";

        updateMovie(
          mediaId,
          mItem.id.toString(),
          mItem.imdb_id,
          mItem.title,
          mItem.original_title,
          mItem.overview,
          mItem.release_date,
          mItem.poster_path,
          mItem.backdrop_path,
          mItem.tagline,
          mItem.runtime,
          mItem.adult,
          genreList,
          mItem.belongs_to_collection,
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
