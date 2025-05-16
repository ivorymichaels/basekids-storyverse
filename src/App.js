import { useState } from "react";
import { ThirdwebProvider, ConnectWallet } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/Home";
import StoryCreator from "./components/StoryCreator";
import MintNFT from "./components/MintNFT";
import Profile from "./components/Profile";
import ParentalDashboard from "./components/ParentalDashboard";

const queryClient = new QueryClient();

const baseSepolia = {
  chainId: 84532,
  rpc: ["https://sepolia.base.org"],
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  shortName: "base-sepolia",
  slug: "base-sepolia",
  testnet: true,
  chain: "Base",
  name: "Base Sepolia",
};

function App() {
  const [view, setView] = useState("home");
  const [story, setStory] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        activeChain={baseSepolia}
        supportedChains={[baseSepolia]}
        clientId="b7f22c3174f4edf57c9a1bd03e936dfb" // Replace with your actual Client ID
      >
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
          <nav className="flex justify-between p-4 bg-yellow-300">
            <h1 className="text-2xl font-bold text-purple-700">BaseKids-Storyverse</h1>
            <div className="space-x-2 flex items-center">
              <button
                onClick={() => setView("home")}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => setView("create")}
                className="px-3 py-1 bg-green-500 text-white rounded-lg"
              >
                Create
              </button>
              <button
                onClick={() => setView("mint")}
                className="px-3 py-1 bg-purple-500 text-white rounded-lg"
              >
                Mint
              </button>
              <button
                onClick={() => setView("profile")}
                className="px-3 py-1 bg-orange-500 text-white rounded-lg"
              >
                Profile
              </button>
              <button
                onClick={() => setView("parent")}
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Parents
              </button>
              <ConnectWallet theme="light" btnTitle="Connect Wallet" />
            </div>
          </nav>
          {view === "home" && <Home setView={setView} />}
          {view === "create" && <StoryCreator setStory={setStory} />}
          {view === "mint" && <MintNFT story={story} />}
          {view === "profile" && <Profile />}
          {view === "parent" && <ParentalDashboard />}
        </div>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default App;