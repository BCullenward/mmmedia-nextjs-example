import GithubSignInButton from "@/app/components/GithubSignInButton";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";

export default function SignInOptions() {
  return (
    <div className="flex w-full justify-center items-center gap-x-3 mt-6">
      <GithubSignInButton />
      <GoogleSignInButton />
    </div>
  );
}
