import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { searchDetailsState } from "../components/Input/SearchInput";

export default function SearchPage() {
  const searchDetails = useRecoilValueLoadable(searchDetailsState);
  console.log(searchDetails.state);
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
