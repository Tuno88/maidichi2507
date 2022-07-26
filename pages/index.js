import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const response = await fetch("http://localhost:3000/api/hello");
    const data = await response.json();
    const studentHash = await Promise.all(
      data.map((d) => {
        return d.hash;
      })
    );
    const distinctStudent = [...new Set(studentHash)];
    console.log("data", distinctStudent);
    setNfts(distinctStudent);
  }
  console.log("nfts", nfts);
  return (
    <div>
      <h1>List of Certificates</h1>
      {nfts.map(
        (nft, i) => (
          <div key={i}>
            <Link key={i} href={`/profile/${nft}`}>{`${nft}`}</Link>
          </div>
        )
        // <Link key={i} href={`/profile/${nft.hash}`}>
        //   {`${nft.hash}`}aa
        // </Link>;
        // <p>{`${nft.hash}`}</p>;
      )}
    </div>
  );
}
