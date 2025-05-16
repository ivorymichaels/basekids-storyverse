import { useState } from "react";
import { useAddress, useContract, useMintNFT } from "@thirdweb-dev/react";

export default function MintNFT({ story }) {
  const address = useAddress();
  const { contract } = useContract("0x9486426d4cB92B84C07464Da025DA514A38C389A"); // Replace with your actual contract address
  const { mutate: mintNFT, isLoading, error } = useMintNFT(contract);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleMint = async () => {
    if (!address) {
      alert("Please connect your wallet!");
      return;
    }
    if (!title || !description) {
      alert("Please enter a title and description!");
      return;
    }

    try {
      await mintNFT({
        metadata: {
          name: title,
          description: description,
          attributes: [{ trait_type: "Story", value: story.join(" -> ") }],
        },
        to: address,
      });
      alert("Story minted as NFT!");
    } catch (err) {
      console.error(err);
      alert("Failed to mint NFT. Try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white">Mint Your Story as an NFT!</h2>
      {!address ? (
        <p className="text-white mt-2">Connect your wallet to mint.</p>
      ) : (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 rounded-lg text-black"
          />
          <textarea
            placeholder="Story Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-2 rounded-lg text-black"
          />
          <p className="text-white mb-2">Story: {story.join(" -> ")}</p>
          <button
            onClick={handleMint}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Minting..." : "Mint NFT"}
          </button>
          {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
        </div>
      )}
    </div>
  );
}