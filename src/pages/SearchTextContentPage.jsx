import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { searchDetailsState } from "../components/Input/SearchInput";

export default function SearchTextContentPage() {
  const searchText = useParams()?.searchText.trim() ?? "";
  const searchDetailsLoadable = useRecoilValueLoadable(
    searchDetailsState(searchText)
  );
  console.log(searchDetailsLoadable);
  return <Box />;
}
