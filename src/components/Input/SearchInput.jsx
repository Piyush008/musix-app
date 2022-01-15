import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { MdClose, MdSearch } from "react-icons/md";
import { atom, selector, selectorFamily, useSetRecoilState } from "recoil";
import { searchItems } from "../../utils/spotify.utils.js";

export const searchTextState = atom({
  key: "searchTextState",
  default: "",
});
export const searchDetailsState = selector({
  key: "searchDetailsState",
  get: async ({ get }) => {
    const [data, error] = await searchItems({
      q: get(searchTextState),
      type: "track,artist,album",
    });
    if (error) throw "Failure";
    return data;
  },
});

export default function SearchInput(props) {
  const setSearchText = useSetRecoilState(searchTextState);
  return (
    <InputGroup>
      <InputLeftElement
        children={<Icon as={MdSearch} textStyle={"icon.md"} />}
      />
      <Input
        aria-label="search"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <InputRightElement
        children={<Icon as={MdClose} textStyle={"icon.md"} />}
      />
    </InputGroup>
  );
}
