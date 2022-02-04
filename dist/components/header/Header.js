import React from "../../../_snowpack/pkg/react.js";
import {Box, HStack, Button} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {pxToAll} from "../../utils/theme.utils.js";
import Logo from "../logo/Logo.js";
import {Route, Routes} from "../../../_snowpack/pkg/react-router-dom.js";
import ROUTER from "../../utils/constants/router.constants.js";
import AgentDetect from "../util/AgentDetect.js";
import SearchInput from "../Input/SearchInput.js";
import useGoogleLogout from "../../../_snowpack/pkg/react-google-login/src/use-google-logout.js";
import {useRecoilState} from "../../../_snowpack/pkg/recoil.js";
import {authConfig} from "../../utils/auth.utils.js";
import {authState} from "../../App/App.js";
export default function Header({headerOpacity}) {
  const [auth, setAuth] = useRecoilState(authState);
  const handleLogoutSuccess = () => {
    setAuth((prevState) => ({...prevState, isAuth: false}));
  };
  const handleFailure = (resp) => {
    console.log(resp);
  };
  const {signOut} = useGoogleLogout({
    ...authConfig,
    onLogoutSuccess: handleLogoutSuccess,
    onFailure: handleFailure,
    onScriptLoadFailure: handleFailure
  });
  return /* @__PURE__ */ React.createElement(Box, {
    h: pxToAll(80),
    pos: "sticky",
    top: "0",
    zIndex: "1",
    right: "0"
  }, /* @__PURE__ */ React.createElement(Box, {
    position: "relative"
  }, /* @__PURE__ */ React.createElement(Box, {
    position: "absolute",
    width: "100%",
    height: pxToAll(80),
    bg: "brand.primary",
    opacity: headerOpacity,
    zIndex: "-1"
  }), /* @__PURE__ */ React.createElement(HStack, {
    justifyContent: "space-between",
    alignItems: "center",
    px: pxToAll(20),
    py: pxToAll(20)
  }, /* @__PURE__ */ React.createElement(AgentDetect, {
    mobileComponent: /* @__PURE__ */ React.createElement(Logo, null),
    desktopComponent: /* @__PURE__ */ React.createElement(HStack, {
      width: ["100%", null, "40%"]
    }, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
      path: `${ROUTER.SEARCH}/*`,
      element: /* @__PURE__ */ React.createElement(SearchInput, {
        width: "100%"
      })
    })))
  }), /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Button, {
    onClick: auth.isAuth ? signOut : auth.signIn
  }, auth.isAuth ? "Exit Musix" : "Enter Musix")))));
}
