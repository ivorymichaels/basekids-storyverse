import { useEffect, useState } from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import { contractAddress, contractABI } from "../contract";

export default function Profile() {
  const address = useAddress();
  const { contract } = useContract(contractAddress, contractABI);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address || !contract) return;
      const totalSupply = await contract.call("totalSupply");
      const userNfts = [];
      for (let i = 1; i <= totalSupply; i++) {
        const uri = await contract.call("tokenURI", [i]);
        const response = await fetch(uri);
        const metadata = await response.json();
        userNfts.push({ id: i, ...metadata });
      }
      setNfts(userNfts);
    };
    fetchNFTs();
  }, [address, contract]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white">My Stories</h2>
      {nfts.length === 0 ? (
        <p className="text-white">No stories yet!</p>
      ) : (
        nfts.map((nft) => (
          <div key={nft.id} className="mt-4 p-4 bg-white rounded-lg">
            <h3 className="text-lg font-bold">{nft.name}</h3>
            <p>{nft.story}</p>
          </div>
        ))
      )}
    </div>
  );
}