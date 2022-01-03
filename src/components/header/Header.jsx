import { useState } from "react";
import {
  Avatar,
  Box,
  Circle,
  HStack,
  Icon,
  useMediaQuery,
  IconButton,
  Wrap,
} from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { pxToAll } from "../../utils/theme.utils.js";
import Logo from "../logo/Logo";

export default function Header() {
  const [width] = useMediaQuery("(min-width:768px)");
  return (
    <HStack
      justifyContent={"space-between"}
      h={pxToAll(80)}
      alignItems={"center"}
    >
      {width ? (
        <Wrap>
          <Circle size={pxToAll(30)} bg="teal.900">
            <Icon as={MdKeyboardArrowLeft} textStyle={"iconMd"} />
          </Circle>
          <Circle size={pxToAll(30)} bg="teal.900">
            <Icon as={MdKeyboardArrowRight} textStyle={"iconMd"} />
          </Circle>
        </Wrap>
      ) : (
        <Logo />
      )}
      <Box>
        <Avatar src="https://bit.ly/broken-link" size="xs" />
      </Box>
    </HStack>
  );
}
