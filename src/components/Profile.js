import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { contractAddress } from "../contract"; // make sure this file exists

export default function Profile() {
  const address = useAddress();
  const { contract } = useContract(contractAddress, "nft-collection");
  const { data: nfts, isLoading, error } = useOwnedNFTs(contract, address);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white">My Stories</h2>

      {isLoading && <p className="text-white">Loading your NFTs...</p>}
      {error && <p className="text-red-500">Error fetching NFTs</p>}

      {!isLoading && nfts?.length === 0 && (
        <p className="text-white">No stories yet!</p>
      )}

      {nfts?.map((nft) => (
        <div key={nft.metadata.id} className="mt-4 p-4 bg-white rounded-lg">
          <h3 className="text-lg font-bold">{nft.metadata.name}</h3>
          <p>{nft.metadata.description}</p>
        </div>
      ))}
    </div>
  );
}
