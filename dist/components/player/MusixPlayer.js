import React from "../../../_snowpack/pkg/react.js";
import {
  Box,
  HStack,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack
} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import useAgent from "../../hooks/useAgent.js";
import {pxToAll, pxToRem} from "../../utils/theme.utils.js";
import {FaPause, FaPlay} from "../../../_snowpack/pkg/react-icons/fa.js";
import {searchTrackState} from "../../pages/AlbumPlayListPage.js";
import {selector, useRecoilValue, useRecoilValueLoadable} from "../../../_snowpack/pkg/recoil.js";
import {youtubeSearch} from "../../utils/auth.utils.js";
import {authState} from "../../App/App.js";
const init = {
  track: null,
  isPlaying: false,
  isLoading: false,
  totalDuration: 0,
  currentTime: 0
};
const audioTrackState = selector({
  key: "audioTrackState",
  get: async ({get}) => {
    const auth = get(authState);
    const search = get(searchTrackState);
    if (auth.isAuth && search) {
      const [data, error] = await youtubeSearch(search);
      if (error)
        throw error;
      return data;
    } else {
      return init;
    }
  }
});
export default function MusixPlayer() {
  const isMobile = useAgent();
  const player = React.useRef();
  const audioTrackLoadable = useRecoilValueLoadable(audioTrackState);
  const searchTrack = useRecoilValue(searchTrackState);
  const loadingState = audioTrackLoadable.state;
  const audioContent = audioTrackLoadable.contents;
  const [PlayerState, setPlayerState] = React.useState(init);
  React.useEffect(() => {
    if (loadingState === "loading")
      setPlayerState({...PlayerState, isLoading: true, isPlaying: false});
    else if (loadingState === "hasValue")
      if (searchTrack)
        setPlayerState({
          ...PlayerState,
          isLoading: false,
          isPlaying: true,
          track: `http://localhost:3000/youtube.com/watch?v=${audioContent.videoId}`,
          totalDuration: audioContent.totalDuration
        });
      else
        setPlayerState(init);
  }, [loadingState]);
  React.useEffect(() => {
    if (player.current) {
      player.current.ontimeupdate = (event) => setPlayerState((previousState) => ({
        ...previousState,
        currentTime: event.srcElement.currentTime
      }));
      player.current.onended = (event) => {
        setPlayerState(init);
      };
    }
  }, [player]);
  React.useEffect(() => {
    if (player.current) {
      player.current.src = PlayerState.track;
      player.current.onstalled = () => console.log("stalled");
      player.current.onseeked = () => setPlayerState((previousState) => ({
        ...previousState,
        isLoading: false
      }));
      player.current.onseeking = () => setPlayerState((previousState) => ({
        ...previousState,
        isLoading: true
      }));
    }
  }, [PlayerState.track]);
  React.useEffect(() => {
    if (player.current) {
      if (!PlayerState.isPlaying) {
        player.current.pause();
      } else {
        player.current.play();
      }
    }
  }, [PlayerState.isPlaying]);
  const secondsToMins = (sec) => `${Math.floor(sec / 60)}:${("0" + Math.floor(sec) % 60).slice(-2)}`;
  const getSliderValue = () => PlayerState.currentTime / PlayerState.totalDuration * 100;
  const handlePlayerChange = (value) => {
    let currentTime = value * PlayerState.totalDuration / 100;
    setPlayerState((previousState) => ({
      ...previousState,
      currentTime
    }));
    if (player.current) {
      player.current.currentTime = currentTime;
    }
  };
  const handlePlayPauseClick = () => {
    if (player.current && PlayerState.track) {
      if (PlayerState.isPlaying) {
        setPlayerState((previousState) => ({
          ...previousState,
          isPlaying: false
        }));
      } else {
        setPlayerState((previousState) => ({
          ...previousState,
          isPlaying: true
        }));
      }
    }
  };
  return /* @__PURE__ */ React.createElement(VStack, {
    justify: "space-evenly",
    height: pxToAll(100),
    pos: "fixed",
    bottom: isMobile ? pxToAll(75) : "0",
    w: "100%",
    bg: "brand.secondary",
    zIndex: "1",
    boxShadow: `0 -5px 25px rgba(0,0,0,0.2)`,
    px: "6"
  }, /* @__PURE__ */ React.createElement("audio", {
    ref: player
  }), /* @__PURE__ */ React.createElement(Slider, {
    "aria-label": "slider-ex-2",
    colorScheme: "pink",
    defaultValue: 0,
    value: getSliderValue(),
    onChange: handlePlayerChange,
    isDisabled: PlayerState.isLoading
  }, /* @__PURE__ */ React.createElement(SliderTrack, null, /* @__PURE__ */ React.createElement(SliderFilledTrack, null)), /* @__PURE__ */ React.createElement(SliderThumb, null)), /* @__PURE__ */ React.createElement(HStack, {
    w: "100%",
    justifyContent: "space-between",
    paddingBottom: "2"
  }, /* @__PURE__ */ React.createElement(Box, {
    borderRadius: "1rem",
    borderWidth: "thin",
    p: "1.5",
    fontSize: pxToAll(18),
    boxShadow: "inset 0 0 20px black",
    borderColor: "blackAlpha.200"
  }, secondsToMins(PlayerState.currentTime)), /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(IconButton, {
    fontSize: `${pxToRem(24)} !important`,
    paddingTop: `${pxToRem(18)} !important`,
    paddingBottom: `${pxToRem(18)} !important`,
    paddingInlineStart: `${pxToRem(18)} !important`,
    paddingInlineEnd: `${pxToRem(18)} !important`,
    borderRadius: "100%",
    onClick: handlePlayPauseClick,
    isLoading: PlayerState.isLoading,
    isRound: true,
    icon: PlayerState.isPlaying ? /* @__PURE__ */ React.createElement(FaPause, null) : /* @__PURE__ */ React.createElement(FaPlay, null)
  })), /* @__PURE__ */ React.createElement(Box, {
    borderRadius: "1rem",
    borderWidth: "thin",
    p: "1.5",
    fontSize: pxToAll(18),
    boxShadow: "inset 0 0 20px black",
    borderColor: "blackAlpha.200"
  }, secondsToMins(PlayerState.totalDuration))));
}
