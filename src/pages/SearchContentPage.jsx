import { Box, Text } from "@chakra-ui/react";
import { selector, useRecoilValueLoadable } from "recoil";
import CardRenderer from "../components/cardRenderrer";
import CategoryCard from "../components/cards/CategoryCard";
import { getSeveralCategories } from "../utils/spotify.utils.js";
import { pxToAll } from "../utils/theme.utils.js";

const allCategoryState = selector({
  key: "allCategoryState",
  get: async () => {
    const [data, error] = await getSeveralCategories({
      country: "IN",
    });
    if (error) throw error;
    return data;
  },
});

export default function SearchContentPage() {
  const categoryLoadable = useRecoilValueLoadable(allCategoryState);
  const items = categoryLoadable.contents?.categories?.items ?? [];
  return (
    <Box>
      <Text textStyle={"h5"} color={"text.secondary"}>
        Browse all
      </Text>
      <CardRenderer minCardWidth={"155px"} autoRows={"auto"}>
        {items.map(({ id, ...rest }) => (
          <CategoryCard key={id} {...rest} />
        ))}
      </CardRenderer>
    </Box>
  );
}
