import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { contractAddress } from "../contract";
import { useEffect } from "react";
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

export default function Profile() {
  const address = useAddress();
  const { contract } = useContract(contractAddress, "nft-collection");
  const { data: nfts, isLoading, error } = useOwnedNFTs(contract, address);

  // Debug logs
  useEffect(() => {
    console.log("Contract address:", contractAddress);
    console.log("Wallet address:", address);
    console.log("Contract instance:", contract);
    console.log("NFTs data:", nfts);
    // Log tokenURI for each NFT
    nfts?.forEach((nft, index) => {
      console.log(
        `NFT ${index + 1} - Token ID: ${nft.metadata?.id || "Unknown"}, tokenURI: ${
          nft.metadata?.uri || "Empty"
        }`
      );
    });
    console.log("Error loading NFTs:", error);
  }, [nfts, address, contract]);

  if (!address) {
    return <p className="text-white">Please connect your wallet to view your NFTs.</p>;
  }

  if (!contract) {
    return <p className="text-white">Loading contract...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching NFTs: {error.message}</p>;
  }

  // Filter NFTs by owner
  const ownedNfts = nfts?.filter(nft => nft.owner.toLowerCase() === address.toLowerCase());

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white">My Stories</h2>

      {isLoading && <p className="text-white">Loading your NFTs...</p>}

      {!isLoading && (!ownedNfts || ownedNfts.length === 0) && (
        <p className="text-white">No stories yet!</p>
      )}

      {ownedNfts?.map((nft, index) => (
        <div key={index} className="mt-4 p-4 bg-white rounded-lg">
          {nft.metadata && nft.metadata.uri ? (
            <>
              <h3 className="text-lg font-bold">
                {nft.metadata.name || `Token #${nft.metadata.id || "Unknown"}`}
              </h3>
              <p>{nft.metadata.description || "No description available"}</p>
              {nft.metadata.image ? (
                <img
                  src={
                    nft.metadata.image.startsWith("ipfs://")
                      ? nft.metadata.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
                      : nft.metadata.image
                  }
                  alt={nft.metadata.name || "NFT Image"}
                  className="w-full mt-2 rounded"
                />
              ) : (
                <p>No image available</p>
              )}
            </>
          ) : (
            <p className="text-red-500">
              Failed to load metadata for Token #{nft.metadata?.id || index}. tokenURI: {nft.metadata?.uri || "None"}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}