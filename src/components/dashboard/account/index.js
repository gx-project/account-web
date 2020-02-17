import { observer } from "mobx-react";
import { Divider } from "@material-ui/core";

import { stylesHook } from "../../../style/dashboard";
import CreatePanel from "../createPanel";

import StaticData from "./static";
import Profile from "./profile";
import Contact from "./contact";

function AccountPanel(props) {
  const { divider, expansionPanelContent } = stylesHook();

  return (
    <CreatePanel title="Conta" id="account-panel-head" {...props}>
      <StaticData />
      <div className={expansionPanelContent}>
        <Profile />
        <Divider className={divider} />
        <Contact />
      </div>
    </CreatePanel>
  );
}

export default observer(AccountPanel);
