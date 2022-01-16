import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { MdClose, MdSearch } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { atom, selectorFamily, useRecoilState } from "recoil";
import { searchItems } from "../../utils/spotify.utils.js";

export const searchTextState = atom({
  key: "searchTextState",
  default: "",
});
export const searchDetailsState = selectorFamily({
  key: "searchDetailsState",
  get: (searchText) => async () => {
    const [data, error] = await searchItems({
      q: searchText,
      type: "track,artist,album,playlist",
      limit: 5,
      country: "IN",
    });
    if (error) throw "Failure";
    return data;
  },
});

export default function SearchInput({ ...rest }) {
  const [modSearchText, setSearchText] = useRecoilState(searchTextState);
  const navigate = useNavigate();
  const searchText = useParams()?.searchText ?? "";
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus();
    setSearchText(searchText);
  }, []);

  const handleChange = (value) => {
    navigate(`${value}`);
    setSearchText(value);
  };
  return (
    <InputGroup {...rest}>
      <InputLeftElement
        children={<Icon as={MdSearch} textStyle={"icon.md"} />}
      />
      <Input
        type={"text"}
        placeholder="Songs,artists,albums"
        aria-label="search"
        onChange={(e) => handleChange(e.target.value)}
        value={modSearchText}
        ref={inputRef}
      />
      <InputRightElement
        children={
          !!modSearchText ? <Icon as={MdClose} textStyle={"icon.md"} /> : null
        }
        onClick={() => handleChange("")}
      />
    </InputGroup>
  );
}
