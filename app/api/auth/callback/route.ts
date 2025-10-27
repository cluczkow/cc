import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    const data = await getAccessToken(code);

    if (data.error) {
      return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
    }

    // Store tokens in cookies (in production, use secure session storage)
    const response = NextResponse.redirect(new URL('/now-playing', request.url));
    response.cookies.set('spotify_access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    if (data.refresh_token) {
      response.cookies.set('spotify_refresh_token', data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('Error getting access token:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
