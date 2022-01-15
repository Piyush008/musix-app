export default function CustomSuspense(props) {
  const { state, fallback, children, ...rest } = props;
  let component = children;
  if (state === "loading") component = fallback;
  return <React.Fragment children={component} {...rest} />;
}
