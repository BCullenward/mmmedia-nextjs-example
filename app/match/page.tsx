import { getData } from "@/app/db/media";
import { MatchData } from "../components/MatchData";

interface iTMDBSearchProps {
  id: number;
  directoryName: string;
  mediaType: string;
}

const numRows = 25;
var myArray: iTMDBSearchProps[];

export default async function Match() {
  const myData = await getData(numRows).then((res) => {
    myArray = res;
  });

  return (
    <>
      <div className="m-5">
        {myArray.map((media, idx) => (
          <MatchData
            mediaId={media.id}
            directoryName={media.directoryName}
            mediaType={media.mediaType}
          />
        ))}
      </div>
    </>
  );
}
