import { spotifyAxios } from "./axios.utils";
import { SPOTIFY_AUTH } from "./constants/privateKey.constants";
var spotifyToken = "";
export async function spotifyAuth() {
  let error = undefined;
  try {
    const resp = await spotifyAxios(SPOTIFY_AUTH).post(
      "https://accounts.spotify.com/api/token?grant_type=client_credentials",
      null,
      { baseURL: "" }
    );
    spotifyToken = "Bearer " + resp.data.access_token;
  } catch (e) {
    error = e.toString();
  }
  return [spotifyToken, error];
}

const createSpotifyAxiosInstance = async (url, query) => {
  let data = undefined,
    error = undefined;
  try {
    const resp = await spotifyAxios(spotifyToken).get(url, {
      params: query,
    });
    data = resp.data;
  } catch (e) {
    error = e.toString();
  }
  return [data, error];
};

export const getNewReleases = async (query) =>
  await createSpotifyAxiosInstance("/browse/new-releases", query);

export const getSeveralCategories = async (query) =>
  await createSpotifyAxiosInstance("/browse/categories", query);

export const getCategoryDetails = async (id, query) =>
  await createSpotifyAxiosInstance(`/browse/categories/${id}`, query);

export const getFeaturedPlayList = async (query) =>
  await createSpotifyAxiosInstance("/browse/featured-playlists", query);

export const getCategoryPlayList = async (id, query) =>
  await createSpotifyAxiosInstance(`/browse/categories/${id}/playlists`, query);

export const getAlbums = async (query) =>
  await createSpotifyAxiosInstance("/albums", query);

export const getAlbumTracks = async (id, query) =>
  await createSpotifyAxiosInstance(`/albums/${id}/tracks`, query);

export const getArtists = async (query) =>
  await createSpotifyAxiosInstance("/artists", query);

export const getArtistAlbums = async (id, query) =>
  await createSpotifyAxiosInstance(`/artists/${id}/albums`, query);

export const getArtistTopTracks = async (id, query) =>
  await createSpotifyAxiosInstance(`/artists/${id}/top-tracks`, query);

export const getRelatedArtists = async (id, query) =>
  await createSpotifyAxiosInstance(`/artists/${id}/related-artists`, query);

export const getTracks = async (query) =>
  await createSpotifyAxiosInstance("/tracks", query);

export const searchItems = async (query) =>
  await createSpotifyAxiosInstance("/search", query);
