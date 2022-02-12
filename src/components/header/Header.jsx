import { Box, HStack, Button } from "@chakra-ui/react";
import { pxToAll } from "../../utils/theme.utils.js";
import Logo from "../logo/Logo";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../../utils/constants/router.constants.js";
import AgentDetect from "../util/AgentDetect.jsx";
import SearchInput from "../Input/SearchInput.jsx";
import useGoogleLogout from "react-google-login/src/use-google-logout";
import { useRecoilState } from "recoil";
import { authConfig } from "../../utils/auth.utils.js";
import { authState } from "../../atoms/auth.atoms.js";

export default function Header({ headerOpacity }) {
  const [auth, setAuth] = useRecoilState(authState);

  const handleLogoutSuccess = () => {
    setAuth((prevState) => ({ ...prevState, isAuth: false }));
  };

  const handleFailure = (resp) => {
    console.log(resp);
  };

  const { signOut } = useGoogleLogout({
    ...authConfig,
    onLogoutSuccess: handleLogoutSuccess,
    onFailure: handleFailure,
    onScriptLoadFailure: handleFailure,
  });
  return (
    <Box h={pxToAll(80)} pos={"sticky"} top={"0"} zIndex={"3"} right={"0"}>
      <Box position="relative">
        <Box
          position="absolute"
          width="100%"
          height={pxToAll(80)}
          bg={"brand.primary"}
          opacity={headerOpacity}
        />
        <HStack
          justifyContent={"space-between"}
          alignItems={"center"}
          px={pxToAll(20)}
          py={pxToAll(20)}
        >
          <AgentDetect
            mobileComponent={<Logo />}
            desktopComponent={
              <HStack width={["100%", null, "40%"]}>
                {/* <Circle size={pxToAll(35)} bg="shade.secondary">
                  <Icon as={MdKeyboardArrowLeft} textStyle={"icon.md"} />
                </Circle>
                <Circle size={pxToAll(35)} bg="shade.secondary">
                  <Icon as={MdKeyboardArrowRight} textStyle={"icon.md"} />
                </Circle> */}
                <Routes>
                  <Route
                    path={`${ROUTER.SEARCH}/*`}
                    element={<SearchInput width={"100%"} />}
                  />
                </Routes>
              </HStack>
            }
          />
          <Box>
            <Button onClick={auth.isAuth ? signOut : auth.signIn}>
              {auth.isAuth ? "Exit Musix" : "Enter Musix"}
            </Button>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
