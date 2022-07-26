import { useEffect, useState } from "react";
import Link from "next/link";
export async function getServerSideProps({ params }) {
  return { props: { id: params.id } };
}

export default function Profile(id) {
  const [nfts, setNfts] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    loadNFT(id);
  }, []);

  async function loadNFT(id) {
    console.log("id", id);
    const response = await fetch("http://localhost:3000/api/hello");
    const data = await response.json();
    console.log("data", data);
    const nftList = data.filter((d) => d.hash == id.id);
    console.log(nftList);
    setNfts(nftList);
    const ipfsImageList = await Promise.all(
      nftList.map(async (nft) => {
        const ipfs = await fetch(nft.link_ipfs);
        const ipfsData = await ipfs.json();
        return ipfsData;
      })
    );
    setImages(ipfsImageList);
  }
  console.log("nftlist", nfts);
  console.log("ipfsImageList", images);
  return (
    <div>
      profile
      {nfts.map((nft, i) => (
        <Link href={`/profile/${id.id}/${nft.link_ipfs.slice(34)}`} alt="">
          {/* <img src={`${nft.link_certificate}`}></img> */}
          {/* <div>{`${nft.link_ipfs}`}</div> */}
          <div>{`${nft.link_ipfs}`}</div>
        </Link>
      ))}
    </div>
  );
}
