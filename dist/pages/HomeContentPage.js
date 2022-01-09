import React from "../../_snowpack/pkg/react.js";
import {Box, Flex, Grid, GridItem, HStack, Text} from "../../_snowpack/pkg/@chakra-ui/react.js";
import BigCard from "../components/cards/bigCard/index.js";
import Header from "../components/header/Header.js";
import {pxToAll, pxToRem} from "../utils/theme.utils.js";
export default function HomeContentPage() {
  return /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    py: pxToAll(20),
    px: pxToAll(30)
  }, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h4",
    color: "text.secondary"
  }, "Good Evening"), /* @__PURE__ */ React.createElement(HStack, {
    width: "100%"
  }, [1, 2, 3].map((e) => /* @__PURE__ */ React.createElement(BigCard, {
    imageBorderRadius: e === 3 ? "100%" : "12",
    imageSource: "https://i.scdn.co/image/ab67616d00001e02badc10f3684a57f23c26f6c1",
    title: "Song Title ".repeat(e),
    isPlaying: e == 3,
    subtitle: "Song Subtitle ".repeat(e * 2)
  }))), /* @__PURE__ */ React.createElement(HStack, {
    width: "100%"
  }, [1, 2, 3].map((e) => /* @__PURE__ */ React.createElement(BigCard, {
    imageBorderRadius: e === 3 ? "100%" : "12",
    imageSource: "https://i.scdn.co/image/ab67616d00001e02badc10f3684a57f23c26f6c1"
  }))), /* @__PURE__ */ React.createElement(HStack, {
    width: "100%"
  }, [1, 2, 3].map((e) => /* @__PURE__ */ React.createElement(BigCard, {
    imageBorderRadius: e === 3 ? "100%" : "12",
    imageSource: "https://i.scdn.co/image/ab67616d00001e02badc10f3684a57f23c26f6c1"
  }))), /* @__PURE__ */ React.createElement(HStack, {
    width: "100%"
  }, [1, 2, 3].map((e) => /* @__PURE__ */ React.createElement(BigCard, {
    imageBorderRadius: e === 3 ? "100%" : "12",
    imageSource: "https://i.scdn.co/image/ab67616d00001e02badc10f3684a57f23c26f6c1"
  }))), /* @__PURE__ */ React.createElement(HStack, {
    width: "100%"
  }, [1, 2, 3].map((e) => /* @__PURE__ */ React.createElement(BigCard, {
    imageBorderRadius: e === 3 ? "100%" : "12",
    imageSource: "https://i.scdn.co/image/ab67616d00001e02badc10f3684a57f23c26f6c1"
  }))));
}
