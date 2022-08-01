import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import avatar01 from "../../../public/images/avatar03.jpg";
export async function getServerSideProps({ params }) {
  return { props: { id: params.id } };
}

export default function Profile(id) {
  const [nfts, setNfts] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    try {
      loadNFT(id);
    } catch (e) {
      console.log(e);
    }
  }, []);

  async function loadNFT(id) {
    console.log("id", id);
    // const response = await fetch("http://localhost:3000/api/hello");
    const response = await fetch(
      "https://portal-staging.funix.edu.vn/certificates/nfts"
    );
    const data = await response.json();
    console.log("data", data);
    const nftList = data.filter((d) => d.hash == id.id);
    console.log(nftList);
    setNfts(nftList);
    const ipfsImageList = await Promise.all(
      nftList.map(async (nft) => {
        const ipfsEach = await fetch(nft.ipfs_link);
        const ipfsData = await ipfsEach.json();
        const url = new URL(ipfsData.certificate_link);
        // const url = new URL(
        //   "https://firebasestorage.googleapis.com/v0/b/test-upload-55566.appspot.com/o/certificates%2F2022%2F7%2FFX200839SC-FX05416-Nguy%E1%BB%85n%20Ho%C3%A0ng%20Linh.pdf?alt=media&token=3828b440-8477-44c7-a97c-59259e586403&fbclid=IwAR2k-cdgtZGc38im-0ejHQnd52PnWX3LruhSfj8545zBK20Hg64Kys3nbIY"
        // );
        const host = url.host;
        const pathname = url.pathname;
        return "https://" + host + "" + pathname + "?alt=media";
      })
    );

    setImages(ipfsImageList);
  }
  console.log("nftlist", nfts);
  console.log("ipfsImageList", images);
  return (
    <div className=" m-auto w-full h-screen shadow-2xl">
      <div className="relative  grid grid-cols-2 w-2/3 m-auto">
        <div className="  relative outline outline-slate-300 w-48 h-48 rounded-full  left-2/4 ">
          <Image
            className="rounded-full"
            src={avatar01}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            priority
          />
        </div>
        <div className="  relative">
          <h1 className="relative block top-2/4 font-bold text-xl text-orange-900">
            Student: {id.id.slice(0, 3)}.....{id.id.slice(-8)}
          </h1>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5  relative ">
        {nfts.map((nft, i) => (
          <div className="m-10 md:m-5 lg:m-20 border-solid border-2 border-orange-400 bg-orange-300 overflow-clip">
            <iframe
              className="w-full aspect-square scrolling:no"
              src={`${images[i]}`}
            ></iframe>
            <Link href={`/profile/${id.id}/${nft.ipfs_link.slice(34)}`} alt="">
              <a>
                <h3 className="text-center">Click here for detail</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
