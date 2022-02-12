import { selector } from "recoil";
import { spotifyAuth } from "../utils/spotify.utils.js";

export const spotifyAuthState = selector({
  key: "spotifyAuthState",
  get: async () => {
    const [token, error] = await spotifyAuth();
    if (error) throw error;
    return token;
  },
});
