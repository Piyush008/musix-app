import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRecoilValueLoadable } from "recoil";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import CustomSuspense from "../components/util/CustomSuspense";
import useAgent from "../hooks/useAgent";
import { showContentState } from "../selector/content.selector.js";
import { pxToAll } from "../utils/theme.utils.js";

export default function HomeContentPage() {
  const showContentsLoadable = useRecoilValueLoadable(showContentState);
  const showContents = showContentsLoadable.contents?.data ?? [];
  const isMobile = useAgent();
  return (
    <CustomSuspense
      fallback={
        <Box textAlign={"center"} pos={"relative"} height={"100%"} top={"30%"}>
          <Spinner />
        </Box>
      }
      state={showContentsLoadable.state}
    >
      <Flex
        direction={"column"}
        pl={pxToAll(20)}
        pr={!isMobile ? pxToAll(15) : 0}
      >
        {showContents.map(({ ...rest }, idx) => (
          <ContentWrapper key={idx} {...rest} seeAll={!isMobile} />
        ))}
      </Flex>
    </CustomSuspense>
  );
}
