import Head from "next/head";
import Image from "next/image";
// import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
import avatar01 from "../public/images/avatar03.jpg";
export default function Home() {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const response = await fetch(
      "https://portal-staging.funix.edu.vn/certificates/nfts"
    );
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
    <div className="border-solid border-2 border-red-200 m-auto w-3/4 h-screen shadow-2xl">
      <h1 className="text-xl text-indigo-900 font-bold">
        List ofaaaaaa Students
      </h1>
      fdsfs
      {nfts.map((nft, i) => (
        <div key={i}>
          <Link key={i} href={`/profile/${nft}`}>
            <div className="ml-5 mt-10">
              {i} - {`${nft}`}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
