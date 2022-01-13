import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import BigCard from "../components/cards/bigCard";
import Header from "../components/header/Header";
import { pxToAll, pxToRem } from "../utils/theme.utils.js";
import CardRenderer from "./../components/cardRenderrer/index";

export default function HomeContentPage() {
  return (
    <Flex direction={"column"} py={pxToAll(20)} px={pxToAll(30)}>
      <Text textStyle={"h4"} color={"text.secondary"}>
        Good Evening
      </Text>
      {[1, 2, 3, 4, 5, 6].map((r) => (
        <CardRenderer>
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <BigCard
              imageBorderRadius={(e + r) % 2 === 1 ? "100%" : "12"}
              imageSource={
                "https://i.scdn.co/image/ab67616d00001e02badc10f3684a57f23c26f6c1"
              }
              title={"Song Title ".repeat(e)}
              isPlaying={(e + r) % 2 == 1}
              subtitle={"Song Subtitle ".repeat(e * 2)}
            />
          ))}
        </CardRenderer>
      ))}
    </Flex>
  );
}
