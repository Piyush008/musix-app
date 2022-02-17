import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  albumPlaylistParamState,
  albumPlayListTrackState,
} from "../../atoms/albumPlayList.atom.js";
import useAgent from "../../hooks/useAgent.js";
import {
  albumPlayListDetailsSate,
  albumPlayListSelectorTrackState,
} from "../../selector/albumPlayList.selector.js";
import ROUTER from "../../utils/constants/router.constants.js";
import { PLAYMODE } from "../../utils/constants/trackState.constants.js";
import { searchTrackTemplate } from "../../utils/conversion.utils.js";
import { pxToAll } from "../../utils/theme.utils.js";
import CardRenderer from "../cardRenderrer/index.jsx";
import BigCard from "../cards/bigCard/index.jsx";
import CustomItem from "../util/CustomItem.jsx";

export default function ContentWrapper(props) {
  const { property, autoRows, seeAll, noOfChildren } = props;
  const items = props?.playlists?.items || props?.albums?.items || [];
  const title = props?.message?.name || props?.message || "";
  const navigate = useNavigate();
  const isMobile = useAgent();
  const showAllContent = () => {
    navigate(`${ROUTER.GENRE}/${property}`);
  };

  return (
    <Flex direction={"column"} py={pxToAll(20)}>
      <HStack justifyContent={"space-between"}>
        <Box>
          <Text textStyle={"h5"} color={"text.secondary"}>
            {title}
          </Text>
        </Box>
        {seeAll && (
          <CustomItem
            variant="card"
            onClick={() => showAllContent()}
            cursor={isMobile ? "auto" : "pointer"}
          >
            <Text fontWeight={"bold"} textStyle={"label"}>
              SEE ALL
            </Text>
          </CustomItem>
        )}
      </HStack>
      <CardRenderer autoRows={autoRows} noOfChildren={noOfChildren}>
        {items.map(({ id, ...rest }) => (
          <BigCardWrapper {...rest} key={id} id={id} width={"100%"} />
        ))}
      </CardRenderer>
    </Flex>
  );
}

export function BigCardWrapper(props) {
  const navigate = useNavigate();
  const [albumPlayListTrack, setAlbumPlayListTrack] = useRecoilState(
    albumPlayListTrackState
  );
  const albumPlayListSelectorTrack = useRecoilValue(
    albumPlayListSelectorTrackState
  );
  const title = props?.name ?? "";
  const subtitle = props?.description || props?.artists?.[0]?.name || "";
  const imageSource = props?.images?.[0]?.url || props?.album?.images?.[0]?.url;
  const type = props?.album?.type || props?.type;
  const id = props?.album?.id || props?.id;
  const isPlaying =
    albumPlayListTrack?.id === id &&
    albumPlayListTrack?.isPlaying === PLAYMODE.PLAYING;
  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };

  const handlePlayCallback = useRecoilCallback(
    ({ snapshot, set }) =>
      async (type, id) => {
        set(albumPlaylistParamState, { type, id });
        try {
          const albumPlayListDetails = await snapshot.getPromise(
            albumPlayListDetailsSate({
              type,
              id,
            })
          );
          const items = albumPlayListDetails?.tracks?.items ?? [];
          const searchTrack = searchTrackTemplate(
            items[0]?.track?.name || items[0].name,
            items[0]?.track?.artists[0].name || items[0]?.artists[0].name
          );
          const itemId = items[0]?.track?.id || items[0]?.id;
          set(albumPlayListSelectorTrackState, { id: itemId, searchTrack });
        } catch (e) {
          console.log(e);
        }
      },
    []
  );

  const handlePlayClick = () => {
    if (albumPlayListTrack?.id === id) {
      const { idx, totalLength } = albumPlayListSelectorTrack;
      let currentIdx = idx - 1;
      if (idx == 0) currentIdx = totalLength - 1;
      setAlbumPlayListTrack((prevState) => ({
        ...prevState,
        isPlaying: PLAYMODE.PLAYING,
        items: [
          ...prevState.items.slice(0, currentIdx),
          {
            ...prevState.items[currentIdx],
            isPlaying: PLAYMODE.PLAYING,
          },
          ...prevState.items.slice(currentIdx + 1),
        ],
      }));
    } else {
      handlePlayCallback(type, id);
    }
  };

  const handlePauseClick = () => {
    const { idx, totalLength } = albumPlayListSelectorTrack;
    let currentIdx = idx - 1;
    if (idx == 0) currentIdx = totalLength - 1;
    setAlbumPlayListTrack((prevState) => ({
      ...prevState,
      isPlaying: PLAYMODE.PAUSE,
      items: [
        ...prevState.items.slice(0, currentIdx),
        {
          ...prevState.items[currentIdx],
          isPlaying: PLAYMODE.PAUSE,
        },
        ...prevState.items.slice(currentIdx + 1),
      ],
    }));
  };

  return (
    <BigCard
      imageBorderRadius={type === "artist" ? "50%" : "10px"}
      imageSource={imageSource}
      title={title}
      subtitle={subtitle}
      onClick={handleClick}
      imageWidth={props.width}
      onPlayClick={handlePlayClick}
      onPauseClick={handlePauseClick}
      isPlaying={isPlaying}
    />
  );
}
ContentWrapper.defaultProps = {
  autoRows: 0,
  seeAll: true,
  noOfChildren: 6,
};
