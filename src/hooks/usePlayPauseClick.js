import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { albumPlayListTrackState } from "../atoms/albumPlayList.atom.js";
import {
  albumPlayListSelectorTrackState,
  albumPlayListDetailsSate,
} from "../selector/albumPlayList.selector.js";
import { musixToken } from "../utils/auth.utils.js";
import { musixAxios } from "../utils/axios.utils.js";
import { PLAYMODE } from "../utils/constants/trackState.constants.js";
import {
  getNewStateForPlayPause,
  searchTrackTemplate,
} from "../utils/conversion.utils.js";

export default function usePlayPauseClick(id) {
  const [albumPlayListTrack, setAlbumPlayListTrack] = useRecoilState(
    albumPlayListTrackState
  );
  const albumPlayListSelectorTrack = useRecoilValue(
    albumPlayListSelectorTrackState
  );

  const isPlaying =
    albumPlayListTrack?.id === id &&
    albumPlayListTrack?.isPlaying === PLAYMODE.PLAYING;
  const handlePlayCallback = useRecoilCallback(
    ({ snapshot, set }) =>
      async (type, id) => {
        try {
          const albumPlayListDetails = await snapshot.getPromise(
            albumPlayListDetailsSate({
              type,
              id,
            })
          );
          const items =
            albumPlayListDetails?.tracks?.items ||
            albumPlayListDetails?.tracks ||
            [];
          const searchTrack = searchTrackTemplate(
            items[0]?.track?.name || items[0].name,
            items[0]?.track?.artists[0].name || items[0]?.artists[0].name
          );
          const itemId = items[0]?.track?.id || items[0]?.id;
          set(albumPlayListSelectorTrackState, {
            id: itemId,
            searchTrack,
            type,
            albumPlayListId: id,
          });
        } catch (e) {
          console.log(e);
        }
      },
    []
  );

  const handlePlayClick = async (type, title, imageSource, props) => {
    if (albumPlayListTrack?.id === id) {
      const { idx, totalLength } = albumPlayListSelectorTrack;
      let currentIdx = idx - 1;
      if (idx == 0) currentIdx = totalLength - 1;
      setAlbumPlayListTrack((prevState) =>
        getNewStateForPlayPause(prevState, PLAYMODE.PLAYING, currentIdx)
      );
    } else {
      const resp = await musixAxios(musixToken()).put("/playItems/", {
        type,
        spotifyId: id,
        name: title,
        description: props.description,
        imgUrl: imageSource,
        artists: props.artists,
      });
      if (!(resp.status >= 400)) await handlePlayCallback(type, id);
    }
  };

  const handlePauseClick = () => {
    const { idx, totalLength } = albumPlayListSelectorTrack;
    let currentIdx = idx - 1;
    if (idx == 0) currentIdx = totalLength - 1;
    setAlbumPlayListTrack((prevState) =>
      getNewStateForPlayPause(prevState, PLAYMODE.PAUSE, currentIdx)
    );
  };

  return [isPlaying, handlePlayClick, handlePauseClick];
}
