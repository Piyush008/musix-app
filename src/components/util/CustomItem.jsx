import { Box, useStyleConfig } from "@chakra-ui/react";

export default function CustomItem(props) {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig("CustomItem", { variant, size });
  return <Box __css={styles} {...rest} />;
}
