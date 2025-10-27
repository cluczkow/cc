# Spotify Now Playing

A simple Next.js web app that displays what you're currently listening to on Spotify.

## Features

- Login with Spotify OAuth
- Real-time display of currently playing track
- Shows album artwork, song title, artist, and album name
- Auto-refreshes every 5 seconds
- Clean, modern UI with Tailwind CSS

## Prerequisites

- Node.js 18+ installed
- A Spotify account
- Spotify Developer account (free)

## Setup Instructions

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Give it a name (e.g., "Now Playing App") and description
5. Accept the terms and click "Create"
6. Click "Settings" on your new app
7. Note your **Client ID** and **Client Secret**
8. Click "Edit Settings"
9. Under "Redirect URIs", add: `http://localhost:3000/api/auth/callback`
10. Click "Add" and then "Save"

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Spotify credentials:
   ```
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click "Login with Spotify" on the home page
2. Authorize the app to access your Spotify data
3. You'll be redirected to the "Now Playing" page
4. Start playing music on Spotify (desktop, mobile, or web)
5. The page will display your currently playing track and refresh automatically

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Spotify Web API** - Music data

## API Routes

- `/api/auth/spotify` - Initiates Spotify OAuth flow
- `/api/auth/callback` - Handles OAuth callback and stores tokens
- `/api/now-playing` - Fetches currently playing track

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── spotify/route.ts    # OAuth initiation
│   │   │   └── callback/route.ts   # OAuth callback handler
│   │   └── now-playing/route.ts    # Get current track
│   ├── now-playing/
│   │   └── page.tsx                # Now playing display page
│   ├── page.tsx                    # Home/login page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── lib/
│   └── spotify.ts                  # Spotify API utilities
└── .env.local                      # Environment variables (create this)
```

## Notes

- Tokens are stored in HTTP-only cookies (for development)
- Access tokens expire after 1 hour and are automatically refreshed
- The app polls the Spotify API every 5 seconds for updates
- For production use, consider implementing proper session management

## Deployment

To deploy to production (e.g., Vercel):

1. Update the redirect URI in your Spotify app settings to match your production URL
2. Update `SPOTIFY_REDIRECT_URI` in your environment variables
3. Deploy using your preferred platform

## License

MIT
