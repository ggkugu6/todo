import React, { useState } from "react";
import ModalFront from "./modal/ModalFront.jsx";
import Modal from "./modal/Modal.jsx";

const Test_t = () => {
    const [modalActive, setModalActive] = useState(false)
    return (
        <div className="app">
            <Modal active={modalActive} setActive={setModalActive}>
                <div id="xx">
                    {ModalFront}
                </div>
            </Modal>
            <div id='hedr'>
                <button className="modal_taskk" onClick={() => setModalActive(true)}>
                    Добавить задачу
                </button>
            </div>
        </div>)
}
export default Test_t 