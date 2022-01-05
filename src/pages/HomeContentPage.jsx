import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Header from "../components/header/Header";
import { pxToAll, pxToRem } from "../utils/theme.utils.js";

export default function HomeContentPage() {
  return (
    <Flex direction={"column"}>
      <Text textStyle={"h4"} color={"text.secondary"}>
        Good Evening
      </Text>
    </Flex>
  );
}
