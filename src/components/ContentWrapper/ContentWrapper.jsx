import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { selectorFamily } from "recoil";
import useAgent from "../../hooks/useAgent.js";
import ROUTER from "../../utils/constants/router.constants.js";
import {
  getCategoryDetails,
  getCategoryPlayList,
  getFeaturedPlayList,
  getNewReleases,
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
    async ({ get }) => {
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

export default function ContentWrapper(props) {
  const { as, property, autoRows, seeAll } = props;
  const items = props?.playlists?.items || props?.albums?.items || [];
  const title = props?.message?.name || props?.message || "";
  const navigate = useNavigate();
  const isMobile = useAgent();
  const showAllContent = () => {
    navigate(`${ROUTER.GENRE}/${property}`, {
      state: { as, property, limit: 20 },
    });
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
            onClick={() => showAllContent({ as, property, limit: 20 })}
            cursor={isMobile ? "auto" : "pointer"}
          >
            <Text fontWeight={"bold"} textStyle={"p"}>
              SEE ALL
            </Text>
          </CustomItem>
        )}
      </HStack>
      <CardRenderer autoRows={autoRows}>
        {items.map(({ id, ...rest }) => (
          <BigCardWrapper {...rest} key={id} />
        ))}
      </CardRenderer>
    </Flex>
  );
}

function BigCardWrapper(props) {
  const title = props?.name ?? "";
  const subtitle = props?.description || props?.artists[0]?.name || "";
  const imageSource = props?.images[0].url;
  return (
    <BigCard
      imageBorderRadius={"10px"}
      imageSource={imageSource}
      title={title}
      subtitle={subtitle}
    />
  );
}

ContentWrapper.defaultProps = {
  autoRows: 0,
  seeAll: true,
};
