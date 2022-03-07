import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { genreParamState } from "../atoms/genre.atoms.js";
import { genreContentState } from "../selector/genre.selector.js";
import CustomSuspense from "../components/util/CustomSuspense";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import useAgent from "../hooks/useAgent";
import { pxToAll, pxToRem, pxToRemSm } from "../utils/theme.utils.js";
import { useEffect } from "react";
import { authState } from "../atoms/auth.atoms.js";

export default function GenrePage() {
  const { property } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const [genreParam, setGenreParam] = useRecoilState(genreParamState);
  const resetGenreParam = useResetRecoilState(genreParamState);
  useEffect(() => {
    if (property) {
      if (location.pathname.includes("recommend")) {
        if (auth.isAuth)
          setGenreParam({ as: "recommend", property, limit: 20 });
        else navigate("/");
      } else if (
        property === "recently" ||
        property === "mixes" ||
        property === "topPlayItems"
      ) {
        if (auth.isAuth) setGenreParam({ as: "user", property, limit: 20 });
        else navigate("/");
      } else if (property === "featured" || property === "release")
        setGenreParam({ as: property, property, limit: 20 });
      else setGenreParam({ as: "category", property, limit: 20 });
    }
    return () => {
      resetGenreParam();
    };
  }, []);

  if (genreParam != null) return <GenreContentPage />;
  return null;
}

function GenreContentPage() {
  const isMobile = useAgent();
  const showAllContentLoadable = useRecoilValueLoadable(genreContentState);
  const contents = showAllContentLoadable?.contents ?? {};
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
