import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { albumPlayListTrackState } from "../../atoms/albumPlayList.atom.js";
import useAgent from "../../hooks/useAgent.js";
import usePlayPauseClick from "../../hooks/usePlayPauseClick.js";
import {
  albumPlayListDetailsSate,
  albumPlayListSelectorTrackState,
} from "../../selector/albumPlayList.selector.js";
import { musixToken } from "../../utils/auth.utils.js";
import { musixAxios } from "../../utils/axios.utils.js";
import ROUTER from "../../utils/constants/router.constants.js";
import { PLAYMODE } from "../../utils/constants/trackState.constants.js";
import {
  getNewStateForPlayPause,
  searchTrackTemplate,
} from "../../utils/conversion.utils.js";
import { pxToAll } from "../../utils/theme.utils.js";
import CardRenderer from "../cardRenderrer/index.jsx";
import BigCard from "../cards/bigCard/index.jsx";
import CustomItem from "../util/CustomItem.jsx";

export default function ContentWrapper(props) {
  const { as, property, autoRows, seeAll, noOfChildren } = props;
  const items = props?.playlists?.items || props?.albums?.items || props?.rows;
  const title = props?.message?.name || props?.message || "";
  const navigate = useNavigate();
  const isMobile = useAgent();
  const showAllContent = () => {
    if (as === "recommend") navigate(`${as}/${property}`);
    else navigate(`${ROUTER.GENRE}/${property}`);
  };

  return (
    <Flex direction={"column"} py={pxToAll(10)}>
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
        {items.map(({ ...rest }) => {
          const modId = rest?.id || rest?.spotifyId;
          return (
            <BigCardWrapper {...rest} key={modId} id={modId} width={"100%"} />
          );
        })}
      </CardRenderer>
    </Flex>
  );
}

export function BigCardWrapper(props) {
  const navigate = useNavigate();
  const title = props?.name ?? "";
  const subtitle = props?.description || props?.artists?.[0]?.name || "";
  const imageSource =
    props?.imgUrl || props?.images?.[0]?.url || props?.album?.images?.[0]?.url;
  const type = props?.album?.type || props?.type;
  const id = props?.spotifyId || props?.album?.id || props?.id;
  const [isPlaying, onPlayClick, onPauseClick] = usePlayPauseClick(id);
  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };

  return (
    <BigCard
      imageBorderRadius={type === "artist" ? "50%" : "10px"}
      imageSource={imageSource}
      title={title}
      subtitle={subtitle}
      onClick={handleClick}
      imageWidth={props.width}
      onPlayClick={() =>
        onPlayClick(type, title, imageSource, {
          artists: props.artists,
          description: props.description,
        })
      }
      onPauseClick={onPauseClick}
      isPlaying={isPlaying}
    />
  );
}
ContentWrapper.defaultProps = {
  autoRows: 0,
  seeAll: true,
  noOfChildren: 6,
};
