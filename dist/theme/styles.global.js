const styles = {
  global: (props) => {
    console.log(props);
    return {
      html: {
        fontSize:
          props.colorMode === "light"
            ? `calc(1vw + 1vh + .5vmin)`
            : `calc(1vw + 1vh + .5vmin)`,
        transition: "all 0.25s",
      },
      body: {
        color: props.colorMode === "light" ? "green.700" : "text.primary",
        bgGradient:
          props.colorMode === "light"
            ? "linear(to-t, green.200, green.500)"
            : "linear(to-t,gray.700 70%, blue.700 100%)",
      },
    };
  },
};

export default styles;
