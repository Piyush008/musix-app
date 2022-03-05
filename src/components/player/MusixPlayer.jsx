import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import useAgent from "../../hooks/useAgent.js";
import { pxToAll } from "../../utils/theme.utils.js";
import { FaPause, FaPlay, FaHamburger } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import {
  GiSelfLove,
  GiSoundOn,
  GiSoundOff,
  GiSoundWaves,
} from "react-icons/gi";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { BiShuffle } from "react-icons/bi";
import { MdRepeat } from "react-icons/md";
import {
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { musixToken, youtubeSearch } from "../../utils/auth.utils.js";
import { musixAxios } from "../../utils/axios.utils.js";
import { PLAYMODE } from "../../utils/constants/trackState.constants.js";
import { authState } from "../../atoms/auth.atoms.js";
import {
  getNewStateForPlayPause,
  secondsToMins,
} from "../../utils/conversion.utils.js";
import { albumPlayListSelectorTrackState } from "../../selector/albumPlayList.selector.js";
import {
  albumPlayListTrackState,
  likedItemsState,
  searchTrackState,
} from "../../atoms/albumPlayList.atom.js";
import useLiked from "../../hooks/useLiked.js";

const init = {
  track: null,
  isLoading: false,
  totalDuration: 1,
  currentTime: 0,
  isEnded: false,
  isSliding: false,
};

const audioTrackState = selector({
  key: "audioTrackState",
  get: async ({ get }) => {
    const auth = get(authState);
    let search = get(searchTrackState);
    if (auth.isAuth && search) {
      search = encodeURIComponent(search);
      try {
        const resp = await musixAxios(musixToken()).get(
          `/youtubeSearch/${search}`
        );
        if (resp.status === 200) {
          return resp.data?.value;
        }
      } catch (e) {
        const [data, error] = await youtubeSearch(search);
        if (error) throw error;
        try {
          await musixAxios(musixToken()).post("/youtubeSearch/", {
            searchName: decodeURIComponent(search),
            ...data,
          });
        } catch (e2) {}
        return data;
      }
    } else {
      return init;
    }
  },
});

export default function MusixPlayer() {
  const isMobile = useAgent();
  const player = React.useRef();
  const audioTrackLoadable = useRecoilValueLoadable(audioTrackState);
  const audioTrackRefresh = useRecoilRefresher_UNSTABLE(audioTrackState);
  const [searchTrack, setSearchTrack] = useRecoilState(searchTrackState);
  const albumPlayListSelectorTrack = useRecoilValue(
    albumPlayListSelectorTrackState
  );
  const [albumPlayListTrack, setAlbumPlayListTrack] = useRecoilState(
    albumPlayListTrackState
  );
  const isPlaying = albumPlayListTrack?.isPlaying ?? false;
  const currentItem = albumPlayListSelectorTrack?.currentItem ?? null;
  const loadingState = audioTrackLoadable.state;
  const audioContent = audioTrackLoadable.contents;
  const [PlayerState, setPlayerState] = React.useState(init);

  React.useEffect(() => {
    if (!!searchTrack) {
      if (loadingState === "loading")
        setPlayerState({ ...PlayerState, isLoading: true });
      else if (loadingState === "hasValue")
        if (searchTrack)
          setPlayerState({
            ...PlayerState,
            track: `http://localhost:3000/youtube.com/watch?v=${audioContent.videoId}`,
            totalDuration: audioContent.totalDuration,
            isEnded: false,
          });
        else setPlayerState(init);
    }
  }, [loadingState, searchTrack]);

  // Adding onTimeUpdate Event listener to player
  React.useEffect(() => {
    if (player.current) {
      player.current.src = PlayerState.track;
      player.current.onstalled = () => console.log("stalled");
      player.current.onloadeddata = () => {
        setPlayerState((prevState) => ({ ...prevState, isLoading: false }));
        player.current.play();
        playItemsTrack();
      };
      player.current.ontimeupdate = (event) =>
        setPlayerState((previousState) => ({
          ...previousState,
          currentTime: previousState.isSliding
            ? previousState.currentTime
            : parseInt(event.srcElement.currentTime),
        }));
      async function playItemsTrack() {
        const { itemId, song, artists, imageSource } =
          albumPlayListSelectorTrack.currentItem;
        await musixAxios(musixToken()).put("/playItems/", {
          type: "track",
          spotifyId: itemId,
          name: song,
          description: "",
          imgUrl: imageSource,
          artists,
        });
      }
    }
  }, [PlayerState.track]);

  React.useEffect(() => {
    if (player.current)
      player.current.onended = (event) => {
        setPlayerState({ ...init, isEnded: true });
        const { idx, totalLength, nextSearchTrack } =
          albumPlayListSelectorTrack;
        if (idx >= 0) {
          setSearchTrack(nextSearchTrack);
          setAlbumPlayListTrack((prevState) => {
            if (idx == 0) {
              if (totalLength == 1)
                return {
                  ...prevState,
                  isPlaying: PLAYMODE.PAUSE,
                  items: [
                    { ...prevState.items[idx], isPlaying: PLAYMODE.PAUSE },
                  ],
                };
              return {
                ...prevState,
                items: [
                  {
                    ...prevState.items[idx],
                    isPlaying: PLAYMODE.PLAYING,
                  },
                  ...prevState.items.slice(1, totalLength - 1),
                  {
                    ...prevState.items[totalLength - 1],
                    isPlaying: PLAYMODE.INQUEUE,
                  },
                ],
              };
            }
            return {
              ...prevState,
              items: [
                ...prevState.items.slice(0, idx - 1),
                {
                  ...prevState.items[idx - 1],
                  isPlaying: PLAYMODE.INQUEUE,
                },
                {
                  ...prevState.items[idx],
                  isPlaying: PLAYMODE.PLAYING,
                },
                ...prevState.items.slice(idx + 1),
              ],
            };
          });
        }
      };
  }, [albumPlayListSelectorTrack]);

  const handlePlayerChange = (value) => {
    setPlayerState((previousState) => ({
      ...previousState,
      currentTime: parseInt(value),
      isSliding: true,
    }));
  };

  const handlePlayerChangeEnd = (value) => {
    setPlayerState((prevState) => ({ ...prevState, isSliding: false }));
    player.current.currentTime = parseInt(value);
  };

  React.useEffect(() => {
    if (player.current.src === PlayerState.track) {
      if (isPlaying === PLAYMODE.PLAYING) player.current.play();
      else if (isPlaying === PLAYMODE.PAUSE) player.current.pause();
    }
  }, [player, isPlaying]);

  const handlePlayPauseClick = () => {
    const { idx, totalLength } = albumPlayListSelectorTrack;
    let currentIdx = idx - 1;
    if (idx == 0) currentIdx = totalLength - 1;
    if (PlayerState.track) {
      if (isPlaying) {
        setAlbumPlayListTrack((prevState) =>
          getNewStateForPlayPause(prevState, PLAYMODE.PAUSE, currentIdx)
        );
      } else {
        setAlbumPlayListTrack((prevState) =>
          getNewStateForPlayPause(prevState, PLAYMODE.PLAYING, currentIdx)
        );
      }
    }
    if (PlayerState.isEnded && !isPlaying) {
      setAlbumPlayListTrack((prevState) =>
        getNewStateForPlayPause(prevState, PLAYMODE.PLAYING, currentIdx)
      );
      audioTrackRefresh();
    }
  };

  return (
    <React.Fragment>
      <audio ref={player} />
      <Grid
        gridTemplateColumns={`minmax(200px, 1fr) minmax(300px, 1fr) 1fr`}
        columnGap={"30px"}
        px={pxToAll(20)}
        bg={"brand.secondary"}
        w={"100%"}
        height={pxToAll(100)}
        pos={"fixed"}
        bottom={isMobile ? pxToAll(75) : "0"}
        zIndex={"1"}
        boxShadow={`0 -5px 25px rgba(0,0,0,0.2)`}
        alignItems={"center"}
      >
        <GridItem>
          {!!currentItem && <TrackLabel currentItem={currentItem} />}
        </GridItem>
        <GridItem>
          <Flex direction={"row"} wrap="nowrap">
            <Text textStyle={"label"}>
              {secondsToMins(PlayerState.currentTime)}
            </Text>
            <Slider
              aria-label="slider-ex-2"
              defaultValue={0}
              value={PlayerState.currentTime}
              onChange={handlePlayerChange}
              max={PlayerState.totalDuration}
              isDisabled={PlayerState.isLoading}
              onChangeEnd={handlePlayerChangeEnd}
              focusThumbOnChange={false}
              mx={pxToAll(15)}
            >
              <SliderTrack bg={"shade.hoverPrimary"}>
                <SliderFilledTrack bg={"text.play"} />
              </SliderTrack>
              <SliderThumb bg={"text.primary"} hidden>
                <Box color={"text.play"} as={GiSoundWaves} />
              </SliderThumb>
            </Slider>
            <Text textStyle={"label"}>
              {secondsToMins(PlayerState.totalDuration)}
            </Text>
          </Flex>
          <Flex
            direction={"row"}
            w="100%"
            justifyContent={"center"}
            wrap="nowrap"
            columnGap={pxToAll(20)}
            marginTop={pxToAll(5)}
            alignItems={"center"}
          >
            <Icon as={BiShuffle} textStyle={"icon.sm"} />
            <IconButton size={"mdlg"} icon={<CgPlayTrackPrev />} />
            <IconButton
              onClick={handlePlayPauseClick}
              isLoading={PlayerState.isLoading}
              size={"mdlg"}
              icon={isPlaying ? <FaPause /> : <FaPlay />}
            />
            <IconButton size={"mdlg"} icon={<CgPlayTrackNext />} />
            <Icon as={MdRepeat} textStyle={"icon.sm"} />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex
            direction={"row"}
            justifyContent={"flex-end"}
            columnGap={pxToAll(20)}
            alignItems={"center"}
          >
            <Icon as={FaHamburger} textStyle={"icon.md"} />
            <Icon as={GiSoundOn} textStyle={"icon.md"} />
            <Slider aria-label="slider-ex-2" defaultValue={0} w={pxToAll(100)}>
              <SliderTrack bg={"shade.hoverPrimary"}>
                <SliderFilledTrack bg={"text.play"} />
              </SliderTrack>
            </Slider>
          </Flex>
        </GridItem>
      </Grid>
    </React.Fragment>
  );
}

function TrackLabel({ currentItem }) {
  const { imageSource, song, itemId, artists } = currentItem;
  const artistName = artists.map((artist) => artist.name).join();
  const onLiked = useLiked();
  const likedItems = useRecoilValue(likedItemsState);
  const isLiked = !!likedItems[itemId] && likedItems[itemId] === "track";
  return (
    <HStack>
      <Box width={pxToAll(60)}>
        <Image src={imageSource} />
      </Box>
      <Box maxW={pxToAll(150)}>
        <Text textStyle={"h6"} color={"text.play"}>
          {song}
        </Text>
        <Text textStyle={"label"} isTruncated>
          {artistName}
        </Text>
      </Box>
      <Box ml={pxToAll(20)}>
        <Icon
          as={isLiked ? FcLike : GiSelfLove}
          textStyle={"icon.md"}
          _hover={{
            color: "text.play",
            transition: "all 0.25s",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onLiked(itemId, "track");
          }}
        />
      </Box>
    </HStack>
  );
}
