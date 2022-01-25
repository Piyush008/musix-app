import { Box, Flex, Spinner } from "@chakra-ui/react";
import { selector, useRecoilValueLoadable } from "recoil";
import ContentWrapper, {
  contentWrapperState,
} from "../components/ContentWrapper/ContentWrapper";
import CustomSuspense from "../components/util/CustomSuspense";
import useAgent from "../hooks/useAgent";
import { showContentConversionUtil } from "../utils/conversion.utils.js";
import { pxToAll } from "../utils/theme.utils.js";

const showContentState = selector({
  key: "showContentState",
  get: ({ get }) => {
    const metaData = showContentConversionUtil();
    const data = metaData.map((content) => ({
      ...content,
      ...get(contentWrapperState({ ...content, limit: 6 })),
    }));
    return { data };
  },
});

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
      <Flex direction={"column"} pl={pxToAll(20)}>
        {showContents.map(({ ...rest }, idx) => (
          <ContentWrapper key={idx} {...rest} seeAll={!isMobile} />
        ))}
      </Flex>
    </CustomSuspense>
  );
}
