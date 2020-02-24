import { observer } from "mobx-react";

import AppBar from "../../components/dashboard/appBar";
import Page from "../../components/page";
function HistoryPage() {
  return (
    <Page auth={true} redirect="/login">
      <AppBar />
      asd
    </Page>
  );
}

export default observer(HistoryPage);
