import {
  Box,
  Circle,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { pxToAll } from "../../utils/theme.utils.js";
import Logo from "../logo/Logo";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../../utils/constants/router.constants.js";
import AgentDetect from "../util/AgentDetect.jsx";
import SearchInput from "../Input/SearchInput.jsx";

export default function Header({ headerOpacity }) {
  return (
    <Box h={pxToAll(80)} pos={"sticky"} top={"0"} zIndex={"1"} right={"0"}>
      <Box position="relative">
        <Box
          position="absolute"
          width="100%"
          height={pxToAll(80)}
          bg={"brand.primary"}
          opacity={headerOpacity}
          zIndex="-1"
        ></Box>
        <HStack
          justifyContent={"space-between"}
          alignItems={"center"}
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
                      <SearchInput/>
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
      </Box>
    </Box>
  );
}
