import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { Outlet } from "react-router-dom";
import SearchInput from "../components/Input/SearchInput";
import AgentDetect from "../components/util/AgentDetect";
import { pxToAll } from "../utils/theme.utils.js";

export default function SearchPage() {
  return (
    <Flex direction={"column"} p={pxToAll(20)} height={"100%"}>
      <AgentDetect
        mobileComponent={
          <VStack mb={pxToAll(20)}>
            <Box>
              <Text textStyle={"h4"} color={"text.secondary"}>
                Search
              </Text>
            </Box>
            {/* <InputGroup>
              <InputLeftElement
                children={<Icon as={MdSearch} textStyle={"icon.md"} />}
              />
              <Input aria-label="search" />
            </InputGroup> */}
            <SearchInput width={["100%", "75%"]} />
          </VStack>
        }
      />
      <Outlet />
    </Flex>
  );
}
