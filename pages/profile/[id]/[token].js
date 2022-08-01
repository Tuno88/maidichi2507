import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
export async function getServerSideProps({ params }) {
  return { props: { token: params.token } };
}

export default function Token(token) {
  const [ipfs, setIpfs] = useState({});
  const [pdf, setPdf] = useState("");
  const [nftToken, setNftToken] = useState();
  useEffect(() => {
    try {
      loadInfo(token);
    } catch (e) {
      console.log(e);
    }
  }, []);

  async function loadInfo(token) {
    const response = await fetch(
      `https://gateway.pinata.cloud/ipfs/${token.token}`
    );
    const data = await response.json();
    const url = new URL(data.certificate_link);
    // const url = new URL(
    //   "https://firebasestorage.googleapis.com/v0/b/test-upload-55566.appspot.com/o/certificates%2F2022%2F7%2FFX200839SC-FX05416-Nguy%E1%BB%85n%20Ho%C3%A0ng%20Linh.pdf?alt=media&token=3828b440-8477-44c7-a97c-59259e586403&fbclid=IwAR2k-cdgtZGc38im-0ejHQnd52PnWX3LruhSfj8545zBK20Hg64Kys3nbIY"
    // );
    const host = url.host;
    const pathname = url.pathname;
    const pdfPath = "https://" + host + "" + pathname + "?alt=media";
    const tokenLinkURL = new URL(data.token_link);
    const nftToken = tokenLinkURL.search.slice(3);
    setPdf(pdfPath);
    setIpfs(data);
    setNftToken(nftToken);
  }
  return (
    <div className="mt-20 h-screen  grid grid-cols-6 gap-4">
      <div className=" col-start-1 col-span-4   shadow-blue-500/50 shadow-2xl">
        <iframe className="w-full aspect-square" src={pdf}></iframe>
      </div>
      <div className=" col-span-2 h-2/5  shadow-blue-500/50 shadow-2xl">
        <h1 className="text-xl text-indigo-900 font-bold">
          Certificate Detail
        </h1>
        <div className="mt-10 ml-10">
          {/* <p>{token.token}</p> */}

          <p>Student Name: {ipfs.name}</p>
          <p>Certificate Name: {ipfs.certificate_name}</p>
          <p className="text-blue-800">
            <Link href={`${ipfs.certificate_link}`} passHref>
              <a target="_blank">Click here to view Image </a>
            </Link>
          </p>
          <p className="text-blue-800">
            <Link
              href={`https://gateway.pinata.cloud/ipfs/${token.token}`}
              passHref
            >
              <a target="_blank">Click here to check on IPFS </a>
            </Link>
          </p>
          <p className="text-blue-800">
            {/* <Link
              href={`https://mumbai.polygonscan.com/token/0x42feb0856e0d6ae7a85c18e1dd7b8e8862e92b64?a=${ipfs.token_id}`}
              passHref
            > */}
            <Link href={`${ipfs.token_link}`} passHref>
              <a target="_blank">
                Click here to check on Polygonscan - token ID: {nftToken}
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
