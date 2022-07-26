import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Link href="/">
        <a className="mr-4 text-pink-500">Home</a>
      </Link>
      <Link as="/profile/first" href={`/profile/[id]`}>
        <a className="mr-6 text-pink-500">Profile</a>
      </Link>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
