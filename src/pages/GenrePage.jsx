import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import ContentWrapper, {
  contentWrapperState,
} from "../components/ContentWrapper/ContentWrapper";
import CustomSuspense from "../components/util/CustomSuspense";
import { showContentConversionUtil } from "../utils/conversion.utils.js";
import { pxToAll } from "../utils/theme.utils.js";

export default function GenrePage() {
  const location = useLocation();
  const params = useParams().property;
  let rs = {};
  if (location.state) {
    rs = location.state;
  } else {
    rs = showContentConversionUtil().find((ele) => ele.property === params);
    rs["limit"] = 20;
  }
  const showAllContentLoadable = useRecoilValueLoadable(
    contentWrapperState(rs)
  );
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
      <Flex direction={"column"} px={pxToAll(20)}>
        <ContentWrapper {...contents} autoRows={"auto"} seeAll={false} />
      </Flex>
    </CustomSuspense>
  );
}
