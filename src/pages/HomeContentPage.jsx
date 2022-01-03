import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Header from "../components/header/Header";
import { pxToAll, pxToRem } from "../utils/theme.utils.js";

export default function HomeContentPage() {
  return (
    <Flex direction={"column"} pb={pxToRem(20)} px={pxToRem(30)} width={"100%"}>
      <Header />
      <Text textStyle={"h4"} layerStyle={"h4"}>
        Good Evening
      </Text>
    </Flex>
  );
}
