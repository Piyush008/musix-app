import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import BigCard from "../components/cards/bigCard";
import Header from "../components/header/Header";
import { pxToAll, pxToRem } from "../utils/theme.utils.js";

export default function HomeContentPage() {
  return (
    <Flex direction={"column"}>
      <Text textStyle={"h4"} color={"text.secondary"}>
        Good Evening
        <HStack width="100%">
          {[1, 2, 3].map((e) => (
            <BigCard
              imageBorderRadius={e === 3 ? "100%" : "12"}
              imageSource={
                "https://i.scdn.co/image/ab67616d00001e02badc10f3684a57f23c26f6c1"
              }
              title={"Song Title ".repeat(e)}
              isPlaying={e == 3}
              subtitle={"Song Subtitle ".repeat(e * 2)}
            />
          ))}
        </HStack>
      </Text>
    </Flex>
  );
}
