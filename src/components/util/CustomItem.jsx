import { Box, useStyleConfig } from "@chakra-ui/react";

export default function CustomItem(props) {
  const { variant, size, as, ...rest } = props;
  const styles = useStyleConfig(as, { variant, size });
  return <Box __css={styles} {...rest} />;
}

CustomItem.defaultProps = {
  as: "CustomItem",
};
