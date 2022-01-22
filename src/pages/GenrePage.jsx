import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import {
  atom,
  selector,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import ContentWrapper, {
  contentWrapperState,
} from "../components/ContentWrapper/ContentWrapper";
import CustomSuspense from "../components/util/CustomSuspense";
import useAgent from "../hooks/useAgent";
import { showContentConversionUtil } from "../utils/conversion.utils.js";
import { pxToAll, pxToRem, pxToRemSm } from "../utils/theme.utils.js";

const genreParamState = atom({
  key: "genreParamState",
  default: {},
});
const genreContentState = selector({
  key: "genreContentState",
  get: ({ get }) => {
    const params = get(genreParamState);
    return get(contentWrapperState(params));
  },
});

export default function GenrePage() {
  const location = useLocation();
  const params = useParams().property;
  const setGenreParam = useSetRecoilState(genreParamState);
  const isMobile = useAgent();
  React.useEffect(() => {
    let rs = {};
    if (location.state) {
      rs = location.state;
    } else {
      rs = showContentConversionUtil().find((ele) => ele.property === params);
      rs["limit"] = 20;
    }
    setGenreParam(rs);
  }, []);
  const showAllContentLoadable = useRecoilValueLoadable(genreContentState);
  const contents = showAllContentLoadable.contents;
  return (
    <CustomSuspense
      fallback={
        <Box textAlign={"center"} pos={"relative"} height={"100%"} top={"30%"}>
          <Spinner />
        </Box>
      }
      state={showAllContentLoadable.state}
    >
      <React.Fragment>
        {contents?.message?.name && (
          <Box
            bgImage={contents.message?.icons?.[0]?.url}
            bgSize={"cover"}
            bgRepeat={"no-repeat"}
            width={isMobile ? "100%" : `calc(100vw - 9.1rem)`}
            position={"fixed"}
            height={pxToRemSm(515 / 1.5)}
          />
        )}
        <Flex
          direction={"column"}
          pos={"relative"}
          top={contents.message?.name ? "30%" : "0"}
        >
          {contents.message?.name && (
            <Text
              textStyle={"h1"}
              color={"text.secondary"}
              ml={pxToAll(20)}
              isTruncated
            >
              {contents?.message?.name}
            </Text>
          )}
          <Box
            px={pxToAll(20)}
            bgGradient={
              contents.message?.name
                ? "linear(to-t,brand.secondary 70%, brand.primary 100%)"
                : "none"
            }
          >
            <ContentWrapper {...contents} autoRows={"auto"} seeAll={false} />
          </Box>
        </Flex>
      </React.Fragment>
    </CustomSuspense>
  );
}
