import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { albumPlayListTrackState } from "../atoms/albumPlayList.atom.js";
import { authState } from "../atoms/auth.atoms.js";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import CustomSuspense from "../components/util/CustomSuspense";
import useAgent from "../hooks/useAgent";
import {
  recentlyPlayedSelectorState,
  recentlyPlayedState,
  showAuthContentState,
  showContentState,
} from "../selector/content.selector.js";
import { getSalutation } from "../utils/date.utils.js";
import { pxToAll } from "../utils/theme.utils.js";

export default function HomeContentPage() {
  const { isAuth } = useRecoilValue(authState);

  if (isAuth) return <HomeAuthContentPage />;
  else if (!isAuth) return <HomeNonAuthContentPage />;
}

function HomeAuthContentPage() {
  const showAuthContentLoadable = useRecoilValueLoadable(showAuthContentState);
  const recentlyPlayedLoadable = useRecoilValueLoadable(
    recentlyPlayedSelectorState(6)
  );
  const refreshRecentlyPlayed = useRecoilRefresher_UNSTABLE(
    recentlyPlayedSelectorState(6)
  );
  const [recentlyPlayed, setRecentlyPlayed] =
    useRecoilState(recentlyPlayedState);
  const albumPlayListId = useRecoilValue(albumPlayListTrackState)?.id;
  const showContents = showAuthContentLoadable.contents?.data ?? [];
  const showState = showAuthContentLoadable.state;
  const isMobile = useAgent();

  React.useEffect(() => {
    if (recentlyPlayedLoadable.state === "hasValue") {
      setRecentlyPlayed(recentlyPlayedLoadable.contents);
    }
  }, [recentlyPlayedLoadable.state]);

  React.useEffect(() => {
    if (albumPlayListId) refreshRecentlyPlayed();
  }, [albumPlayListId]);
  const rows = recentlyPlayed?.rows ?? [];
  return (
    <CustomSuspense
      fallback={
        <Box textAlign={"center"} pos={"relative"} height={"100%"} top={"30%"}>
          <Spinner />
        </Box>
      }
      state={showState}
    >
      <Flex
        direction={"column"}
        pl={pxToAll(20)}
        pr={!isMobile ? pxToAll(15) : 0}
      >
        <Text textStyle={"h4"} color="text.secondary">
          {getSalutation()}
        </Text>
        {rows.length !== 0 && (
          <ContentWrapper
            key={"recently played"}
            seeAll={!isMobile}
            {...recentlyPlayed}
          />
        )}
        {showContents.map(({ ...rest }, idx) => (
          <ContentWrapper key={idx} {...rest} seeAll={!isMobile} />
        ))}
      </Flex>
    </CustomSuspense>
  );
}

function HomeNonAuthContentPage() {
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
