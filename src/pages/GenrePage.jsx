import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import ContentWrapper, {
  contentWrapperState,
} from "../components/ContentWrapper/ContentWrapper";
import CustomSuspense from "../components/util/CustomSuspense";
import useAgent from "../hooks/useAgent";
import { pxToAll, pxToRem, pxToRemSm } from "../utils/theme.utils.js";

export const genreParamState = atom({
  key: "genreParamState",
  default: null,
});
const genreContentState = selector({
  key: "genreContentState",
  get: ({ get }) => {
    const params = get(genreParamState);
    return get(contentWrapperState(params));
  },
});

export default function GenrePage() {
  const property = useParams().property;
  const [genreParam, setGenreParam] = useRecoilState(genreParamState);
  const resetGenreParam = useResetRecoilState(genreParamState);
  const isMobile = useAgent();
  React.useEffect(() => {
    if (property === "featured" || property === "release")
      setGenreParam({ as: property, property, limit: 20 });
    else setGenreParam({ as: "category", property, limit: 20 });
    return () => {
      resetGenreParam();
    };
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
            bgPos={"top"}
            width={
              isMobile
                ? `calc(100vw - 6px)`
                : [
                    `calc(100vw - 6px - ${pxToRemSm(230 / 1.5)})`,
                    null,
                    `calc(100vw - 6px - ${pxToRem(230)})`,
                  ]
            }
            position={"fixed"}
            height={[
              `calc(${pxToRemSm(80 / 1.5)} + 30% + ${pxToRemSm(160 / 1.5)})`,
              null,
              `calc(${pxToRem(80)} + 30% + ${pxToRem(160)})`,
            ]}
          />
        )}
        <Flex
          direction={"column"}
          pos={"relative"}
          top={contents?.message?.name ? "30%" : "0"}
        >
          {contents?.message?.name && (
            <Text
              textStyle={"h2"}
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
              contents?.message?.name
                ? "linear(to-t,brand.secondary 70%, brand.primary 100%)"
                : "none"
            }
          >
            <ContentWrapper
              {...contents}
              autoRows={"auto"}
              seeAll={false}
              noOfChildren={"auto-fill"}
            />
          </Box>
        </Flex>
      </React.Fragment>
    </CustomSuspense>
  );
}
