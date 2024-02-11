import React, { useState } from "react";
import "./Main.css";
import Modal from "./modal/Modal.jsx";
import ModalFront from "./modal/ModalFront.jsx";
import TaskTable from "./task/TaskTable.jsx";

const Main = () => {
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className="appp">
      <Modal active={modalActive} setActive={setModalActive}>
        {ModalFront}
      </Modal>
      <div className="main">
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="./Main.css" />
        <div id="all">
          <header id="heder">
            <div id="hedr_left">
              <div id="heder_logo">
                <img src="spellbook-svgrepo-com.svg" />
              </div>
              <div>Задачи</div>
            </div>
            <div id="hedr_right">
              <button
                className="modal_task"
                onClick={() => setModalActive(true)}
              >
                Добавить задачу
              </button>
              <select className="body_select" name="body_select">
                <option value="today" selected>Задачи на сегодня</option>
                <option value="week">Задачи на неделю</option>
                <option value="after">Задачи на будущее</option>
              </select>
              <a id="exit_heder" href="/auto">Выход</a>
            </div>
          </header>
          <TaskTable />
        </div>
      </div>
    </div>
  );
};
export default Main;
