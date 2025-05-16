export default function Home({ setView }) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-3xl font-bold text-white">Welcome to Storyverse!</h2>
      <p className="text-lg text-white mt-2">Create fun stories and mint them as NFTs!</p>
      <div className="mt-4 space-x-4">
        <button
          onClick={() => setView("create")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-lg"
        >
          Start Creating
        </button>
        <button
          onClick={() => setView("profile")}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg text-lg"
        >
          My Stories
        </button>
      </div>
    </div>
  );
}