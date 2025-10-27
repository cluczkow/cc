export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Spotify Now Playing
        </h1>
        <p className="text-gray-600 mb-8">
          See what you're currently listening to on Spotify
        </p>
        <a
          href="/api/auth/spotify"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Login with Spotify
        </a>
      </div>
    </main>
  );
}
