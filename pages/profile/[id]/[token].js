import { useEffect, useState } from "react";
import Link from "next/link";
export async function getServerSideProps({ params }) {
  return { props: { token: params.token } };
}

export default function Token(token) {
  const [ipfs, setIpfs] = useState({});
  useEffect(() => {
    loadInfo(token);
  }, []);

  async function loadInfo(token) {
    const response = await fetch(
      `https://gateway.pinata.cloud/ipfs/${token.token}`
    );
    const data = await response.json();
    setIpfs(data);
  }
  return (
    <div>
      Certificate Detail
      <p>{token.token}</p>
      <p>
        <Link href={`https://gateway.pinata.cloud/ipfs/${token.token}`}>
          <a>Click here to check on IPFS </a>
        </Link>
      </p>
      <p>{ipfs.name}</p>
      <p>{ipfs.certificate_name}</p>
      <p>
        <Link
          href={`https://mumbai.polygonscan.com/token/0x42feb0856e0d6ae7a85c18e1dd7b8e8862e92b64?a=${ipfs.token_id}`}
        >
          <a>Click here to check on Polygonscan {ipfs.token_id}</a>
        </Link>
      </p>
    </div>
  );
}
