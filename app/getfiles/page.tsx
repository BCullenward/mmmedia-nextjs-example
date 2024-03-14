import { Button } from "@/components/ui/button";
import prisma from "../utils/db";
import fileList from "../utils/getfiles";

export default function SeedDatabase() {
  const dirList = process.env.DIRECTORY_LISTING?.split(",");

  async function postData() {
    "use server";
    const promises = dirList?.map((d) => fileList(d));
    if (promises) {
      const results = await Promise.all(promises);
      const result = results.map((s) => `[${s}]`).join("");
      console.log(result.toString);
      loadData(result);
    }
  }

  async function loadData(results: any) {
    "use server";
    await prisma.movieLocation.createMany({ data: results });
  }

  return (
    <div className="m-5">
      <form action={postData}>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
