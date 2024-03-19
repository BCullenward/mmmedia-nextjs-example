"use client";
import { searchMedia } from "@/app/api/tmdb";
import { Grid } from "lucide-react";
import { useEffect, useState } from "react";

interface iMediaProps {
  id: number;
  directoryName: string;
  mediaType: string;
}

interface iTMDBResponse {
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

export function MatchData({ id, directoryName, mediaType }: iMediaProps) {
  const [mediaList, setMediaList] = useState<iTMDBResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: iTMDBResponse[] = await searchMedia(directoryName, mediaType);
      setMediaList(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>In Match Data with {directoryName}</h1>
      <div>
        Possible Matches:
        <br />
        <div className="grid">
          {mediaList.map((x) => (
            <div key={x.id} className="row-auto col-span-4">
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
