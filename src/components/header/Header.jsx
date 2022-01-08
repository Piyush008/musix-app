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
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSearch,
} from "react-icons/md";
import { pxToAll, pxToRem } from "../../utils/theme.utils.js";
import Logo from "../logo/Logo";
import useAgent from "../../hooks/useAgent.js";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../../utils/constants/router.constants.js";
import AgentDetect from "../util/AgentDetect.jsx";

export default function Header() {
  return (
    <HStack
      justifyContent={"space-between"}
      h={pxToAll(80)}
      alignItems={"center"}
      pos={"sticky"}
      top={"0"}
      zIndex={"1"}
      right={"0"}
      bg={"brand.primary"}
      px={pxToAll(30)}
      py={pxToAll(20)}
    >
      <AgentDetect
        mobileComponent={<Logo />}
        desktopComponent={
          <HStack>
            <Circle size={pxToAll(35)} bg="shade.secondary">
              <Icon as={MdKeyboardArrowLeft} textStyle={"icon.md"} />
            </Circle>
            <Circle size={pxToAll(35)} bg="shade.secondary">
              <Icon as={MdKeyboardArrowRight} textStyle={"icon.md"} />
            </Circle>
            <Routes>
              <Route
                path={`${ROUTER.SEARCH}/*`}
                element={
                  <InputGroup>
                    <InputLeftElement
                      children={<Icon as={MdSearch} textStyle={"icon.md"} />}
                    />
                    <Input />
                  </InputGroup>
                }
              />
            </Routes>
          </HStack>
        }
      />
      <Box>
        <Button>Enter Musix</Button>
      </Box>
    </HStack>
  );
}
