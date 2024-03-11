import React from "react";
import "./Main.css";
import TaskTable from "../task/TaskTable.jsx";
import NavBar from "../NavBar.jsx";
import { observer } from "mobx-react-lite";

const Main = observer(() => {
  return (
  <div>
    <NavBar />
    <TaskTable />
  </div>
  );
});
export default Main;
