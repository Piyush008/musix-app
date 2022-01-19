import { Flex } from "@chakra-ui/react";
import { selector, useRecoilValueLoadable } from "recoil";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import { showContentConversionUtil } from "../utils/conversion.utils.js";
import { pxToAll } from "../utils/theme.utils.js";

const showContentState = selector({
  key: "showContentState",
  get: () => {
    return showContentConversionUtil();
  },
});

export default function HomeContentPage() {
  const showContentsLoadable = useRecoilValueLoadable(showContentState);
  const showContents = showContentsLoadable.contents;
  return (
    <Flex direction={"column"} py={pxToAll(20)} px={pxToAll(20)}>
      {showContents.map(({ ...rest }, idx) => (
        <ContentWrapper key={idx} {...rest} />
      ))}
    </Flex>
  );
}
