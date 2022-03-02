import { Box, Grid, GridItem, HStack, Image, Text } from "@chakra-ui/react";
import { useRecoilCallback } from "recoil";
import { albumPlayListTrackState } from "../../atoms/albumPlayList.atom.js";
import {
  albumPlayListDetailsSate,
  albumPlayListSelectorTrackState,
} from "../../selector/albumPlayList.selector.js";
import { musixToken } from "../../utils/auth.utils.js";
import { musixAxios } from "../../utils/axios.utils.js";
import {
  searchTrackTemplate,
  secondsToMins,
} from "../../utils/conversion.utils.js";
import { pxToAll, pxToRem, pxToRemSm } from "../../utils/theme.utils.js";

export default function Track(props) {
  const artists = props?.artists ?? [];
  const album = props?.album;
  const imageUrl = props?.imgUrl || album?.images?.[0]?.url;
  const artistName = artists.map((artist) => artist.name);

  const handleClick = useRecoilCallback(
    ({ snapshot, set }) =>
      async (header, artists, trackName, artistName, trackId) => {
        const albumPlayListTrack = snapshot.getLoadable(
          albumPlayListTrackState
        );
        const release = snapshot.retain();
        try {
          const { type, id, name, desc, imgUrl } = header;
          if (albumPlayListTrack.contents?.id !== id) {
            const resp = await musixAxios(musixToken()).put("/playItems/", {
              type,
              spotifyId: id,
              name,
              description: desc,
              imgUrl,
              artists,
            });
            if (!(resp.status >= 400)) {
              await snapshot.getPromise(albumPlayListDetailsSate({ type, id }));
              set(albumPlayListSelectorTrackState, {
                id: trackId,
                searchTrack: searchTrackTemplate(trackName, artistName),
                type,
                albumPlayListId: id,
              });
            }
          } else
            set(albumPlayListSelectorTrackState, {
              id: trackId,
              searchTrack: searchTrackTemplate(trackName, artistName),
              type,
              albumPlayListId: id,
            });
        } catch (e) {
          console.log(e);
        } finally {
          release();
        }
      },
    []
  );

  return (
    <Grid
      templateColumns={
        imageUrl
          ? [
              `${pxToRemSm(25 / 1.5)} minmax(${pxToRemSm(
                375 / 1.5
              )}, 2fr) minmax(${pxToRemSm(100 / 1.5)}, 1fr) ${pxToRemSm(
                80 / 1.5
              )}`,
              null,
              `${pxToRem(25)} minmax(${pxToRem(300)}, 2fr) minmax(${pxToRem(
                100
              )}, 1fr) ${pxToRem(80)}`,
            ]
          : "25px minmax(300px, 2fr) 100px"
      }
      gridColumnGap={pxToAll(20)}
      height={pxToAll(70)}
      mt={pxToAll(10)}
      alignItems={"center"}
      px={pxToAll(20)}
      transition="all 0.25s"
      _hover={{
        bg: "shade.primary",
        borderRadius: "10px",
        transition: "all 0.25s",
      }}
      onClick={() =>
        handleClick(props.header, artists, props.name, artistName[0], props.id)
      }
    >
      <GridItem justifySelf={"end"}>
        <Text textStyle={"h6"}>{props.seq}</Text>
      </GridItem>
      <GridItem>
        <HStack>
          {imageUrl && (
            <Box width={pxToAll(60)}>
              <Image src={imageUrl} />
            </Box>
          )}
          <Box
            width={[
              `calc(100% - ${pxToRemSm(60 / 1.5)} - 0.5rem)`,
              null,
              `calc(100% - ${pxToRem(60)} - 0.5rem)`,
            ]}
          >
            <Text textStyle={"h6"} color={"text.secondary"} isTruncated>
              {props.name}
            </Text>
            <Text textStyle={"label"} isTruncated>
              {artistName.join(", ")}
            </Text>
          </Box>
        </HStack>
      </GridItem>
      {album && (
        <GridItem>
          <Text textStyle={"label"} isTruncated>
            {album?.name}
          </Text>
        </GridItem>
      )}
      <GridItem justifySelf={"end"}>
        <Text textStyle={"label"}>
          {secondsToMins(props?.duration_ms / 1000)}
        </Text>
      </GridItem>
    </Grid>
  );
}
