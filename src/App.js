import React, { useState } from "react";
import "./App.scss";
import ShowNotificationBegin from "./features/todo/components/ShowNotificationBegin";
import TodoFeature from "./features/todo/Todo";
import "./index.css";

function App() {
  const [open, setOpen] = useState(true);
  const handleCloseNoti = () => {
    setOpen(false);
  };
  return (
    <>
      <TodoFeature />;
      <ShowNotificationBegin
        openNotification={open}
        closeNotification={handleCloseNoti}
      />
    </>
  );
}

export default App;
