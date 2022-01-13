import React from "../../_snowpack/pkg/react.js";
import {Box, Flex, Grid, GridItem, HStack, Text} from "../../_snowpack/pkg/@chakra-ui/react.js";
import BigCard from "../components/cards/bigCard/index.js";
import Header from "../components/header/Header.js";
import {pxToAll, pxToRem} from "../utils/theme.utils.js";
import CardRenderer from "../components/cardRenderrer/index.js";
export default function HomeContentPage() {
  return /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    py: pxToAll(20),
    px: pxToAll(30)
  }, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h4",
    color: "text.secondary"
  }, "Good Evening"), [1, 2, 3, 4, 5, 6].map((r) => /* @__PURE__ */ React.createElement(CardRenderer, null, [1, 2, 3, 4, 5, 6].map((e) => /* @__PURE__ */ React.createElement(BigCard, {
    imageBorderRadius: (e + r) % 2 === 1 ? "100%" : "12",
    imageSource: "https://i.scdn.co/image/ab67616d00001e02badc10f3684a57f23c26f6c1",
    title: "Song Title ".repeat(e),
    isPlaying: (e + r) % 2 == 1,
    subtitle: "Song Subtitle ".repeat(e * 2)
  })))));
}
