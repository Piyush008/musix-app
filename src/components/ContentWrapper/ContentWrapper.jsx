import { Box, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import { selector, selectorFamily, useRecoilValueLoadable } from "recoil";
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
import CustomSuspense from "../util/CustomSuspense.jsx";

const categoryState = selectorFamily({
  key: "categoryState",
  get: (id) => async () => {
    const [data, error] = await getCategoryDetails(id, {
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
    (id, limit = 5) =>
    async () => {
      const [data, error] = await getCategoryPlayList(id, {
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
    (limit = 5) =>
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
    (limit = 5) =>
    async () => {
      const [data, error] = await getNewReleases({
        country: "IN",
        limit,
      });
      if (error) throw error;
      return data;
    },
});

const contentWrapperState = selectorFamily({
  key: "contentWrapperState",
  get:
    (params) =>
    async ({ get }) => {
      const { as, property } = params;
      if (as == "category") {
        const catPlayListDetails = get(categoryPlayListState(property));
        const catDetails = get(categoryState(property));
        return { ...catPlayListDetails, message: catDetails };
      } else if (as == "release") {
        return get(newReleasesState());
      } else if (as == "featured") {
        return get(featuredPlayListState());
      }
    },
});
export default function ContentWrapper(props) {
  const contentWrapperLoadable = useRecoilValueLoadable(
    contentWrapperState(props)
  );
  const contentWrapper = contentWrapperLoadable.contents;
  const items =
    contentWrapper?.playlists?.items || contentWrapper?.albums?.items || [];
  const title =
    contentWrapper?.message?.name ||
    contentWrapper?.message ||
    "Popular new Releases";
  return (
    <CustomSuspense fallback={<Box />} state={contentWrapperLoadable.state}>
      <Flex direction={"column"} mb={pxToAll(20)}>
        <HStack justifyContent={"space-between"}>
          <Box>
            <Text textStyle={"h4"} color={"text.secondary"}>
              {title}
            </Text>
          </Box>
          <CustomItem variant="card">
            <Text fontWeight={"bold"} textStyle={"p"} color={"text.disabled"}>
              SEE ALL
            </Text>
          </CustomItem>
        </HStack>
        <CardRenderer>
          {items.map(({ id, ...rest }) => (
            <BigCardWrapper {...rest} key={id} />
          ))}
        </CardRenderer>
      </Flex>
    </CustomSuspense>
  );
}

function BigCardWrapper(props) {
  const title = props?.name;
  const subtitle = props?.description || props?.artists[0]?.name;
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
