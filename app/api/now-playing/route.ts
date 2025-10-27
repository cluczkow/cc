import { NextRequest, NextResponse } from 'next/server';
import { getNowPlaying, refreshAccessToken } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  let access_token = request.cookies.get('spotify_access_token')?.value;
  const refresh_token = request.cookies.get('spotify_refresh_token')?.value;

  if (!access_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  let response = await getNowPlaying(access_token);

  // If token expired, try to refresh
  if (response.status === 401 && refresh_token) {
    try {
      const data = await refreshAccessToken(refresh_token);
      access_token = data.access_token;

      // Update the cookie with new access token
      const newResponse = NextResponse.next();
      newResponse.cookies.set('spotify_access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        path: '/',
      });

      response = await getNowPlaying(access_token);
    } catch (error) {
      return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
    }
  }

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false });
  }

  const song = await response.json();

  if (!song.item) {
    return NextResponse.json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((artist: any) => artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0]?.url;
  const songUrl = song.item.external_urls.spotify;

  return NextResponse.json({
    isPlaying,
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
  });
}
