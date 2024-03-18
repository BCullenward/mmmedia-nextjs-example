import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { searchMedia } from "@/app/services/tmdbMediaServices";

interface iTMDBSearchProps {
  id: number;
  directoryName: string;
  mediaType: string;
}

async function getData() {
  const data: iTMDBSearchProps[] = await prisma.$queryRaw`
        select max("id") as id, "directoryName", "mediaType"
        from "Media"
        where "tmdbID" is null
        group by "directoryName", "mediaType"
        limit 20
      `;
  return data;
}

export default async function Match() {
  const myData = await getData();

  return (
    <>
      <div className="m-5">
        {myData.map((media) => (
          <div key={media.id}>
            <h1>{media.directoryName}</h1>
            {/* <p>{searchMedia(media.directoryName, media.mediaType)}</p> */}
          </div>
        ))}
      </div>
    </>
  );
}
