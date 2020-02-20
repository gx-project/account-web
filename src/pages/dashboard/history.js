import { observer } from "mobx-react";

import { Page } from "../../components";
export default observer(function HistoryPage() {
  return (
    <Page auth={true} redirect="/login">
      asd
    </Page>
  );
});
