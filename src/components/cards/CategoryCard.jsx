import { Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ROUTER from "../../utils/constants/router.constants.js";
import { pxToAll } from "../../utils/theme.utils.js";
import CustomItem from "../util/CustomItem";

export default function CategoryCard(props) {
  const { icons, name, property, ...rest } = props;
  const navigate = useNavigate();
  return (
    <CustomItem
      {...rest}
      variant="card"
      onClick={() =>
        navigate(`/${ROUTER.GENRE}/${property}`, {
          state: {
            as: "category",
            property,
            limit: 20,
            urlFrom: `/${ROUTER.SEARCH}`,
          },
        })
      }
    >
      <Image src={icons[0].url} alt={name} borderRadius={"10%"} />
      <Text mt={pxToAll(10)}>{name}</Text>
    </CustomItem>
  );
}
