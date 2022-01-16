import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { selector, useRecoilValueLoadable } from "recoil";
import CardRenderer from "../components/cardRenderrer";
import CategoryCard from "../components/cards/CategoryCard";
import AgentDetect from "../components/util/AgentDetect";
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

export default function SearchPage() {
  const categoryLoadable = useRecoilValueLoadable(allCategoryState);
  const items = categoryLoadable.contents?.categories?.items ?? [];
  return (
    <Flex direction={"column"} px={pxToAll(20)} py={pxToAll(20)}>
      <AgentDetect
        mobileComponent={
          <VStack mb={pxToAll(10)}>
            <Box>
              <Text textStyle={"h4"} color={"text.secondary"}>
                Search
              </Text>
            </Box>
            <InputGroup>
              <InputLeftElement
                children={<Icon as={MdSearch} textStyle={"icon.md"} />}
              />
              <Input aria-label="search" />
            </InputGroup>
          </VStack>
        }
      />
      <Text textStyle={"h5"} color={"text.secondary"}>
        Browse all
      </Text>
      <CardRenderer minCardWidth={"155px"} autoRows={"auto"}>
        {items.map(({ id, ...rest }) => (
          <CategoryCard key={id} {...rest} />
        ))}
      </CardRenderer>
      <Outlet />
    </Flex>
  );
}
