import { useRecoilCallback, useRecoilRefresher_UNSTABLE } from "recoil";
import { likedItemsState } from "../atoms/albumPlayList.atom";
import { likedItemsSelectorState } from "../selector/albumPlayList.selector";
import { musixToken } from "../utils/auth.utils";
import { musixAxios } from "../utils/axios.utils";

export default function () {
  const refreshLikedItems = useRecoilRefresher_UNSTABLE(
    likedItemsSelectorState
  );
  const likeCallback = useRecoilCallback(
    ({ set, snapshot }) =>
      async (spotifyId, type) => {
        const release = snapshot.retain();
        try {
          const resp = await musixAxios(musixToken()).put("/liked/", {
            spotifyId,
            type,
          });
          if (resp.status === 200) {
            refreshLikedItems();
            const rows = await snapshot.getPromise(likedItemsSelectorState);
            set(likedItemsState, rows);
          }
        } catch (e) {
          console.log(e);
        } finally {
          release();
        }
      },
    []
  );
  function handleLiked(id, type) {
    likeCallback(id, type);
  }
  return handleLiked;
}
