import prisma from "@/app/utils/db";

interface iTMDBSearchProps {
  id: number;
  directoryName: string;
  mediaType: string;
}

export async function getData(numRows: number) {
  const data: iTMDBSearchProps[] = await prisma.$queryRaw`
          select max("id") as id, "directoryName", "mediaType"
          from "Media"
          where "tmdbID" is null
          group by "directoryName", "mediaType"
          limit (${numRows})
        `;

  return data;
}
