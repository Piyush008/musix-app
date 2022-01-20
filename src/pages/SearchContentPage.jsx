import { Box, Spinner, Text } from "@chakra-ui/react";
import { selector, selectorFamily, useRecoilValueLoadable } from "recoil";
import CardRenderer from "../components/cardRenderrer";
import CategoryCard from "../components/cards/CategoryCard";
import CustomSuspense from "../components/util/CustomSuspense";
import { getSeveralCategories } from "../utils/spotify.utils.js";
import { pxToAll } from "../utils/theme.utils.js";

const allCategoryState = selectorFamily({
  key: "allCategoryState",
  get:
    (limit = 20) =>
    async () => {
      const [data, error] = await getSeveralCategories({
        country: "IN",
        limit,
      });
      if (error) throw error;
      return data;
    },
});

export default function SearchContentPage() {
  const categoryLoadable = useRecoilValueLoadable(allCategoryState(50));
  const items = categoryLoadable.contents?.categories?.items ?? [];
  return (
    <CustomSuspense
      fallback={
        <Box pos={"relative"} top={"30%"} textAlign={"center"}>
          <Spinner />
        </Box>
      }
      state={categoryLoadable.state}
    >
      <Box>
        <Text textStyle={"h5"} color={"text.secondary"}>
          Browse all
        </Text>
        <CardRenderer minCardWidth={"155px"} autoRows={"auto"}>
          {items.map(({ id, ...rest }) => (
            <CategoryCard key={id} {...rest} property={id} />
          ))}
        </CardRenderer>
      </Box>
    </CustomSuspense>
  );
}
