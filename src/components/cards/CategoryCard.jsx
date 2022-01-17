import { Image, Text } from "@chakra-ui/react";
import { pxToAll } from "../../utils/theme.utils.js";
import CustomItem from "../util/CustomItem";

export default function CategoryCard(props) {
  const { icons, name, ...rest } = props;
  return (
    <CustomItem {...rest} variant="card">
      <Image src={icons[0].url} alt={name} borderRadius={"10%"} />
      <Text mt={pxToAll(10)}>{name}</Text>
    </CustomItem>
  );
}
