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
import { pxToAll } from "../../utils/theme.utils.js";
import Logo from "../logo/Logo";
import useAgent from "../../hooks/useAgent.js";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../../utils/constants/router.constants.js";

export default function Header() {
  const isMobile = useAgent();
  return (
    <HStack
      justifyContent={"space-between"}
      h={pxToAll(80)}
      alignItems={"center"}
    >
      {!isMobile ? (
        <>
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
          <Box>
            <Button>Enter Musix</Button>
          </Box>
        </>
      ) : (
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
          <Route
            path="*"
            element={
              <>
                <Logo />
                <Box>
                  <Button>Enter Musix</Button>
                </Box>
              </>
            }
          />
        </Routes>
      )}
    </HStack>
  );
}
