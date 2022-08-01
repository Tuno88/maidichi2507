import "../styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import background from "../public/images/background.jpg";

function MyApp({ Component, pageProps }) {
  return (
    <div className="">
      {/* <div className="m-auto text-red-700 h-48 bg-gradient-to-r from-violet-500 to-fuchsia-500"> */}
      {/* <div className="bg-red-200 w-full"> */}
      {/* <h1 className="m-auto">FUNIX</h1> */}

      {/* <div className="w-3/12"> */}
      {/* <Image className="" src={background}></Image> */}
      {/* </div> */}
      {/* </div> */}
      <Link href="/">
        <a className="m-8 text-4xl text-pink-900 ">FUNIX</a>
      </Link>
      {/* <Link as="/profile/first" href={`/profile/[id]`}>
        <a className="mr-6 text-pink-500">Profile</a>
      </Link> */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
