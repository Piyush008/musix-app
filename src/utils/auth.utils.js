import { KJUR as kjur } from "jsrsasign";
import axios from "axios";
import { parseDurationIntoSec } from "./conversion.utils.js";
export const authConfig = {
  clientId: `${import.meta.env.SNOWPACK_PUBLIC_REACT_APP_CLIENT_ID}`,
  cookiePolicy: "single_host_origin",
  scope: "email profile https://www.googleapis.com/auth/youtube.force-ssl",
  prompt: "select_account",
};

let token = undefined,
  sub = undefined;
export const handleAfterAuth = (accessToken, email) => {
  (token = accessToken), (sub = email);
};

export async function youtubeSearch(search) {
  let error = undefined,
    data = undefined;
  try {
    const resp = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=${search}&type=video&key=${
        import.meta.env.SNOWPACK_PUBLIC_REACT_APP_API_KEY
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const videoId = resp.data?.items[0]?.id?.videoId;
    const resp2 = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${
        import.meta.env.SNOWPACK_PUBLIC_REACT_APP_API_KEY
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const totalDuration = resp2.data?.items[0]?.contentDetails?.duration;
    data = { videoId, totalDuration: parseDurationIntoSec(totalDuration) };
  } catch (e) {
    error = e.toString();
  }
  return [data, error];
}

export const musixToken = () => {
  const iat = kjur.jws.IntDate.getNow();
  const exp = iat + 30;
  const sPayload = !sub ? { iat, exp } : { iat, exp, sub };
  return kjur.jws.JWS.sign(null, { alg: "HS256" }, sPayload, {
    b64: `${import.meta.env.SNOWPACK_PUBLIC_REACT_APP_SECRET_KEY}`,
  });
};
