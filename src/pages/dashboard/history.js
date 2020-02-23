import { observer } from "mobx-react";

import { Page } from "../../components";
function HistoryPage() {
  return (
    <Page auth={true} redirect="/login">
      asd
    </Page>
  );
}

export default observer(HistoryPage);
