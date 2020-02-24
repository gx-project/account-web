import Code from "../code";
import Login from "../../stores/login";

function CodeStep() {
  return (
    <Code
      onChange={value => (Login.code = value)}
      onSubmit={() => Login.sendCode()}
    />
  );
}

export default CodeStep;
