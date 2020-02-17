import Code from "../code";
import State from "../../stores/login";

export default function CodeStep() {
  return (
    <Code
      onChange={value => (State.code = value)}
      onSubmit={() => State.sendCode()}
    />
  );
}
