import { Box, Flex, GridItem, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import CardRenderer from "../components/cardRenderrer";
import ContentWrapper, {
  BigCardWrapper,
} from "../components/ContentWrapper/ContentWrapper";
import { searchDetailsState } from "../components/Input/SearchInput";
import CustomSuspense from "../components/util/CustomSuspense";
import { pxToAll } from "../utils/theme.utils.js";
import { Track } from "./AlbumPlayListPage";

export default function SearchTextContentPage() {
  const searchText = useParams()?.searchText.trim() ?? "";
  const [topResult, setTopResult] = React.useState(null);
  const searchDetailsLoadable = useRecoilValueLoadable(
    searchDetailsState(searchText)
  );
  const contents = searchDetailsLoadable.contents;
  const tracks = contents?.tracks?.items ?? [];
  const albums = contents?.albums;
  const playlists = contents?.playlists;
  const artists = contents?.artists;
  useEffect(() => {
    if (searchDetailsLoadable.state === "hasValue") {
      const artistTrackItems = [...artists?.items, ...tracks];
      const allItems = [
        ...artistTrackItems,
        ...albums?.items,
        ...playlists?.items,
      ];
      let matchedItem = allItems.find(
        (item) => item.name.toLowerCase() === searchText.toLowerCase()
      );
      if (!matchedItem) {
        const popularityArr = artistTrackItems.map((item) => item.popularity);
        const maxPop = Math.max(...popularityArr);
        const idx = popularityArr.findIndex((item) => item === maxPop);
        matchedItem = artistTrackItems[idx];
      }
      setTopResult(matchedItem);
    }
  }, [searchDetailsLoadable.state]);
  return (
    <CustomSuspense state={searchDetailsLoadable.state} fallback={<Box />}>
      <Flex direction={"column"}>
        <CardRenderer
          autoRows={true}
          minCardWidth={"380"}
          noOfChildren={"auto-fit"}
          overflowX="hidden"
        >
          <GridItem>
            <Text textStyle={"h5"} color="text.secondary">
              Top Result
            </Text>
            <BigCardWrapper {...topResult} width={pxToAll(170)} />
          </GridItem>
          <GridItem>
            <Text textStyle={"h5"} color="text.secondary">
              Songs
            </Text>
            {tracks.map(({ id, ...rest }, idx) => (
              <Track {...rest} key={id} id={id} seq={idx + 1} />
            ))}
          </GridItem>
        </CardRenderer>
        <ContentWrapper albums={albums} message={"Albums"} seeAll={false} />
        <ContentWrapper
          playlists={playlists}
          message={"Playlists"}
          seeAll={false}
        />
      </Flex>
    </CustomSuspense>
  );
}
