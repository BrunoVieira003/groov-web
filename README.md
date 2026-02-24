# Groov web
Web client for groov-api inspired by many spotify-like web players.

Made for fun

## Features
Here's a list of all features that may be available in this project

✅ Available
⏳ In progress
💭 Planned

- ✅ Play all songs
- ✅ Artist page
- ⏳ Fuzzy search
    - ✅ Songs
    - ✅ Artists
    - 💭 Albums
    - 💭 Playlists
- ⏳ Play modes
    - 💭 Random
    - 💭 Auto-repeat
    - 💭 Single-repeat
- ✅ Custom accent color according with cover art
- ⏳ 'Playing now' minimalist page
- ✅ Upload new song files
- ✅ Trigger folder scan
- 💭 Task feedback
- ✅ Integration with Web Audio API
- 💭 Display unsynced lyrics
- 💭 Display synced lyrics
- 💭 Audio visualizers
- 💭 Artist images auto-download
- 💭 Internacionalization

## Running locally
To run this client you will need groov-api already running, both api and this client uses Bun as it's runtime, so make sure to install Bun first

### Installing dependencies
```bash
bun install
```

### Config
Create a `.env` file and fill with the following info according with your api url
```env
PUBLIC_API_URL=http://localhost:3000
```

### Running in dev mode
Run the following command and visit `http://localhost:5173`
```bash
bun dev
```

### Build and Running
Run the following command to build
```bash
bun run build
```

and the following to run and then visit `http://localhost:4173`
```bash
bun run preview
```