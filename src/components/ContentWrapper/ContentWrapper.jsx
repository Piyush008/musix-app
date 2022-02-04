import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { selectorFamily } from "recoil";
import useAgent from "../../hooks/useAgent.js";
import ROUTER from "../../utils/constants/router.constants.js";
import {
  getAlbum,
  getCategoryDetails,
  getCategoryPlayList,
  getFeaturedPlayList,
  getNewReleases,
  getPlayListDetails,
} from "../../utils/spotify.utils.js";
import { pxToAll } from "../../utils/theme.utils.js";
import CardRenderer from "../cardRenderrer/index.jsx";
import BigCard from "../cards/bigCard/index.jsx";
import CustomItem from "../util/CustomItem.jsx";

const categoryState = selectorFamily({
  key: "categoryState",
  get:
    ({ property }) =>
    async () => {
      const [data, error] = await getCategoryDetails(property, {
        country: "IN",
        locale: "en_IN",
      });
      if (error) throw error;
      return data;
    },
});
const categoryPlayListState = selectorFamily({
  key: "categoryPlayListState",
  get:
    ({ property, limit }) =>
    async () => {
      const [data, error] = await getCategoryPlayList(property, {
        country: "IN",
        limit,
      });
      if (error) throw error;
      return data;
    },
});

const featuredPlayListState = selectorFamily({
  key: "featuredPlayListState",
  get:
    ({ limit }) =>
    async () => {
      const [data, error] = await getFeaturedPlayList({
        country: "IN",
        locale: "en_IN",
        limit,
        timestamp: new Date().toISOString(),
      });
      if (error) throw error;
      return data;
    },
});

const newReleasesState = selectorFamily({
  key: "newReleasesState",
  get:
    ({ limit }) =>
    async () => {
      const [data, error] = await getNewReleases({
        country: "IN",
        limit,
      });
      if (error) throw error;
      return { message: "Popular new releases", ...data };
    },
});

export const contentWrapperState = selectorFamily({
  key: "contentWrapperState",
  get:
    (params) =>
    ({ get }) => {
      const { as, ...rest } = params;
      if (as == "category") {
        const catPlayListDetails = get(categoryPlayListState(rest));
        const catDetails = get(categoryState(rest));
        return { ...catPlayListDetails, message: catDetails };
      } else if (as == "release") {
        return get(newReleasesState(rest));
      } else if (as == "featured") {
        return get(featuredPlayListState(rest));
      }
    },
});

const albumState = selectorFamily({
  key: "albumState",
  get: (id) => async () => {
    const [data, error] = await getAlbum(id, { market: "IN" });
    if (error) throw error;
    return data;
  },
});

const playlistState = selectorFamily({
  key: "playlistState",
  get: (id) => async () => {
    const [data, error] = await getPlayListDetails(id, {
      id,
      market: "IN",
      limit: 20,
    });
    if (error) throw error;
    return data;
  },
});
export const albumPlayListDetailsSate = selectorFamily({
  key: "albumPlayListDetailsState",
  get:
    (params) =>
    async ({ get }) => {
      const { type, id } = params;
      if (type === "album") return get(albumState(id));
      else if (type === "playlist") return get(playlistState(id));
    },
});
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
          <BigCardWrapper {...rest} key={id} id={id} />
        ))}
      </CardRenderer>
    </Flex>
  );
}

function BigCardWrapper(props) {
  const navigate = useNavigate();
  const title = props?.name ?? "";
  const subtitle = props?.description || props?.artists?.[0]?.name || "";
  const imageSource = props?.images?.[0]?.url;
  const type = props?.type;
  const id = props?.id;
  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };
  return (
    <BigCard
      imageBorderRadius={"10px"}
      imageSource={imageSource}
      title={title}
      subtitle={subtitle}
      onClick={handleClick}
    />
  );
}

ContentWrapper.defaultProps = {
  autoRows: 0,
  seeAll: true,
  noOfChildren: 6,
};
