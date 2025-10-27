'use client';

import { useEffect, useState } from 'react';

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch('/api/now-playing');

      if (response.status === 401) {
        setError('Not authenticated. Please login again.');
        setLoading(false);
        return;
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError('Failed to fetch now playing data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    // Refresh every 5 seconds
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
        <div className="bg-white p-8 rounded-lg shadow-2xl">
          <p className="text-gray-800">Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <a
            href="/"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full"
          >
            Go Back
          </a>
        </div>
      </main>
    );
  }

  if (!data?.isPlaying) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Nothing Playing
          </h2>
          <p className="text-gray-600">
            Start playing something on Spotify to see it here!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Now Playing
        </h2>

        {data.albumImageUrl && (
          <img
            src={data.albumImageUrl}
            alt={data.album}
            className="w-full rounded-lg shadow-lg mb-6"
          />
        )}

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800">{data.title}</h3>
          <p className="text-gray-600">{data.artist}</p>
          <p className="text-gray-500 text-sm">{data.album}</p>
        </div>

        {data.songUrl && (
          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Open in Spotify
          </a>
        )}

        <div className="mt-4 text-center">
          <a href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            Logout
          </a>
        </div>
      </div>
    </main>
  );
}
