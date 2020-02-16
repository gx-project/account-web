import { Divider } from "@material-ui/core";

import CreatePanel from "../createPanel";
import Password from "./password";
import SecondFactor from "./secondFactor";
import { stylesHook } from "../../../style/dashboard";

export default function SecutiryPanel(props) {
  const { divider, expansionPanelContent } = stylesHook();

  return (
    <CreatePanel title="Segurança" id="secutiry-panel-head" {...props}>
      <div className={expansionPanelContent}>
        <SecondFactor />
        <Divider className={divider} />
        <Password />
      </div>
    </CreatePanel>
  );
}
