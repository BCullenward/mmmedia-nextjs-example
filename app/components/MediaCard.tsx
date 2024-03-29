"use client";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle } from "lucide-react";
import PlayVideoModal from "./PlayVideoModal";
import { useState } from "react";
import { addToWatchlist, removeFromWatchlist } from "../action";
import { usePathname } from "next/navigation";

interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  watchList: boolean;
  watchListId: string;
  youtubeUrl: string;
  year: number;
  age: number;
  time: number;
}

export function MediaCard({
  movieId,
  overview,
  title,
  watchListId,
  watchList,
  youtubeUrl,
  year,
  age,
  time,
}: iAppProps) {
  const [open, setOpen] = useState(false);

  const pathName = usePathname();
  return (
    <>
      <button onClick={() => setOpen(true)} className="-mt-20">
        <PlayCircle className="h-20 w-20" />
      </button>
      <div className="right-5 top-5 absolute z-10">
        {watchList ? (
          <form action={removeFromWatchlist}>
            <input type="hidden" name="watchlistId" value={watchListId} />
            <input type="hidden" name="pathname" value={pathName} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        ) : (
          <form action={addToWatchlist}>
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="pathname" value={pathName} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="nsans-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="text-sm">{year}</p>
          {/* <p className="border py-0 px-1 border-gray-200 rounded text-sm"> */}
          <p className="certification text-sm">{age}+</p>
          <p className="text-sm">{time} h</p>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-nsans-light">
          {overview}
        </p>
      </div>
      <PlayVideoModal
        youtubeUrl={youtubeUrl}
        key={movieId}
        title={title}
        overview={overview}
        state={open}
        changeState={setOpen}
        age={age}
        release={year}
        duration={time}
      />
    </>
  );
}
