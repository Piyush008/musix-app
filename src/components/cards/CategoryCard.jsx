import { Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { genreParamState } from "../../atoms/genre.atoms.js";
import ROUTER from "../../utils/constants/router.constants.js";
import { pxToAll } from "../../utils/theme.utils.js";
import CustomItem from "../util/CustomItem";

export default function CategoryCard(props) {
  const { icons, name, property, ...rest } = props;
  const navigate = useNavigate();
  const setGenreParam = useSetRecoilState(genreParamState);
  return (
    <CustomItem
      {...rest}
      variant="card"
      onClick={() => {
        setGenreParam({
          as: "category",
          property,
          limit: 20,
        });
        navigate(`/${ROUTER.GENRE}/${property}`, {
          state: { urlFrom: `/${ROUTER.SEARCH}` },
        });
      }}
      p={0}
    >
      <Image src={icons[0].url} alt={name} borderRadius={"10%"} />
      <Text mt={pxToAll(10)}>{name}</Text>
    </CustomItem>
  );
}
