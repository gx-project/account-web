import Code from "../code";
import State from "../../stores/login";

function CodeStep() {
  return (
    <Code
      onChange={value => (State.code = value)}
      onSubmit={() => State.sendCode()}
    />
  );
}

export default CodeStep;
