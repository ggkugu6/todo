import React, { useContext, useState } from 'react';
import Modal from "./modal/Modal.jsx";
import "./main/Main.css";
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const { task } = useContext(Context)
    
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const logOut = () => {
        if (user) {
            user.setIsAuth(false);
            localStorage.removeItem('token');
            console.log(localStorage.getItem('token'));
        }
    }

    return (
        <div>
            <header
                id="heder">
                <div id="hedr_left">
                    <div id="heder_logo">
                        <img src="spellbook-svgrepo-com.svg" />
                    </div>
                    <div>
                        Задачи
                    </div>
                </div>
                <div id="hedr_right">
                    <Button variant="secondary" onClick={() => setModalShow(true)}>
                        Создать задачу
                    </Button>
                    <DropdownButton
                        className="body_select"
                        name="body_select"
                        title="Выбор периода"
                        variant='outline-secondary'
                        onSelect={e => { task.setSelectedPeriod(e) }}>
                        <Dropdown.Item eventKey="today">
                            Задачи на сегодня
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="week">
                            Задачи на неделю
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="future">
                            Задачи на будущее
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="">
                            Все задачи
                        </Dropdown.Item>
                    </DropdownButton>
                    <a
                        action="/login">
                        <button
                            id="exit_heder"
                            onClick={logOut}>
                            Выход
                        </button>
                    </a>
                </div>
            </header>
            <Modal show={modalShow} tasks={selectedTask}
                onHide={() => setModalShow(false)} />
        </div>
    );
})

export default NavBar;