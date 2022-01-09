import useAgent from "../../hooks/useAgent";

export default function AgentDetect(props) {
  const isMobileDevice = useAgent();
  const { mobileComponent, desktopComponent, ...rest } = props;
  return (
    <React.Fragment
      children={isMobileDevice ? mobileComponent : desktopComponent}
      {...rest}
    />
  );
}
