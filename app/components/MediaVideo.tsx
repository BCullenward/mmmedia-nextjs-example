//import { Button } from "@/components/ui/button";
//import prisma from "../utils/db";
import MediaButtons from "./MediaButtons";
//import { iMedia } from "@/app/interfaces/databaseInterfaces";
import { getRandomRecord } from "@/app/db/media";

export default async function MediaVideo() {
  const data = await getRandomRecord();
  const rndRecord = data[0];

  return (
    <>
      <div className="h-[55vh] lg:h-[60vh] w-full flex justify-start items-center">
        <video
          poster={rndRecord?.backdrop_path}
          autoPlay
          muted
          loop
          src={rndRecord?.trailerURL}
          className="w-full absolute top-0 left-0 h-[60vh] object-cover -z-10 brightness-[60%]"
        ></video>
        <div className="absolute w-[90%] lg:w-[40%] mx-auto">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-nsans-bold">
            {rndRecord?.title}
          </h1>
          <p className="text-white text-lg mt-5 line-clamp-5">
            ({rndRecord.releasedate})
            <br />
            {rndRecord?.overview}
          </p>
          <div className="flex gap-x-3 mt-4">
            <MediaButtons
              id={rndRecord?.id as number}
              title={rndRecord?.title as string}
              original_title={rndRecord?.original_title as string}
              overview={rndRecord?.overview as string}
              releasedate={rndRecord?.releasedate as string}
              poster_path={rndRecord?.poster_path as string}
              backdrop_path={rndRecord?.backdrop_path as string}
              tagline={rndRecord?.tagline as string}
              runtime={rndRecord?.runtime as number}
              adult={rndRecord?.adult as boolean}
              genre={rndRecord?.genre as string}
              collection_name={rndRecord?.collection_name as string}
              certification={rndRecord?.certification}
              trailerURL={rndRecord?.trailerURL as string}
            />
          </div>
        </div>
      </div>
    </>
  );
}
