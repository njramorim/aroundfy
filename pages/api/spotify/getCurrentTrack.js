import { getSession } from "next-auth/client";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi();

export default async (req, res) => {
  const session = await getSession({ req });
  spotifyApi.setCredentials({
    accessToken: session.user.accessToken,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_DOMAIN_URL,
  });

  spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 20,
    })
    .then(
      (data) => {
        console.log("data: ", data);
        res.status(200).json({ data: data.body });
      },
      (err) => {
        console.log("Something went wrong!", err);
        res.status(500).json(err);
      }
    );
};
