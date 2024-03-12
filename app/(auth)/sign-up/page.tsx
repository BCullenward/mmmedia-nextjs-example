import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SignInOptions from "@/app/components/SignInOptions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return (
    <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <form>
        <h1 className="text-3xl font-semibold text-white">Sign Up</h1>
        <div className="space-y-4 mt-5">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
          />
          <Button
            variant="destructive"
            type="submit"
            className="w-full bg-[#e50914]"
          >
            Sign Up{" "}
          </Button>
        </div>
      </form>
      <div className="text-gray-500 text-sm mt-2">
        Already Have an account?{" "}
        <Link className="text-white hover:underline" href="/login">
          Log in now!
        </Link>
      </div>
      <SignInOptions />
    </div>
  );
}
