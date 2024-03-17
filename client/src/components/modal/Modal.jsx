import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './modal.css'
import '../modal/modal_front_content.css'
import { createTask, putTask } from '../../http/taskAPI';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../index';
import { format } from "date-fns";
import { Subordinate } from '../task/AccessRights';

const ModalFront = observer(({ show, tasks, onHide }) => {
  const { user } = useContext(Context)
  const subordinate = Subordinate()
  const defaultValue = tasks && tasks.ended_at ? format(new Date(tasks.ended_at), 'yyyy-MM-dd') : null;
  const nowValue = format(Date.now(), 'yyyy-MM-dd')
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [ended_at, setEnded_at] = useState(null);
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);
  const [userName, setUserName] = useState(null);
  const [creator_id, setCreator_id] = useState(user.user && user.user.find(u => u.login === user?.currentUser.login)?.user_id);

  const saveTask = () => {
    if (tasks) {
      const updatedTask = { id: tasks.id, title: title, description: description, ended_at: ended_at, priority: priority, status: status, responsible_id: userName };
      putTask(updatedTask).then(data => {
        setTitle(null);
        setDescription(null)
        setEnded_at(null)
        setPriority(null)
        setStatus(null)
        setUserName(null)
        onHide()
      });
    } else {
      createTask({ title: title, description: description, ended_at: ended_at, ended_at: ended_at, priority: priority, status, responsible_id: userName, creator_id: creator_id }).then(data => {
        setTitle(null)
        setDescription(null)
        setEnded_at(null)
        setPriority(null)
        setStatus(null)
        setUserName(null)
        setCreator_id(null)
        onHide()
      })
    }

  }
console.log(title)
  return (
    <>
      <form>
        <Modal
          show={show}
          onHide={onHide}>
          <Modal.Header>
            <Modal.Title>
              {tasks ? "Редактирование Задачи" : "Создание Задачи"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              variant="outline-secondary"
              className="mb-2">
              <Form.Group
                controlId="exampleForm.ControlInput1"
                className="mb-2">
                <Form.Label>
                {"Заголовок"}
                </Form.Label>
                <Form.Control
                  defaultValue={tasks && tasks.title}
                  onChange={e => setTitle(e.target.value)}
                  as="textarea"
                  placeholder="Заголовок..."
                  disabled={user.currentUser.role === 'ADMIN' ? false : true}
                  variant="danger"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                controlId="exampleForm.ControlTextarea1"
                className="mb-1"
              >
                <Form.Label>
                  Описание
                </Form.Label>
                <Form.Control
                  defaultValue={tasks && tasks.description}
                  onChange={e => setDescription(e.target.value)}
                  variant="outline-secondary"
                  as="textarea"
                  placeholder="Описание..."
                  style={{ height: '100px' }}
                  disabled={user.currentUser.role === 'ADMIN' ? false : true} />
              </Form.Group>
              <Form.Group>
                <div id='status'>
                  <Form.Group>
                    <Form.Group controlId="custom-select">
                      <div>
                        Дата окончания
                      </div>
                      <input
                        defaultValue={defaultValue ?? nowValue}
                        value={ended_at}
                        onChange={e => setEnded_at(e.target.value)}
                        id="date"
                        type="date"
                        placeholder="Дата окончания"
                        disabled={user.currentUser.role === 'ADMIN' ? false : true} />
                    </Form.Group>
                    <Form.Label>Приоритет</Form.Label>
                    <select
                      class="form-control" id="select-country" data-live-search="true"
                      onChange={e => setPriority(e.target.value)}
                      disabled={user.currentUser.role === 'ADMIN' ? false : true} >
                      <option defaultValue={tasks && tasks.priority} className="d-none" disabled selected>{tasks && tasks.priority || 'Приоритет'}</option>
                      <option value="высокий">высокий</option>
                      <option value="средний">средний</option>
                      <option value="низкий">низкий</option>
                    </select >
                  </Form.Group>
                  <Form.Group controlId="custom-select">
                    <Form.Label>Статус</Form.Label>
                    <Form.Control
                      as="select"
                      controlId="custom-select"
                      variant="outline-secondary"
                      onChange={e => setStatus(e.target.value)}>
                      <option defaultValue={tasks && tasks.status} className="d-none" disabled selected>{tasks && tasks.status || 'Статус'}</option>
                      <option value="к выполнению">к выполнению</option>
                      <option value="выполняется">выполняется</option>
                      <option value="выполнена">выполнена</option>
                      <option value="отменена">отменена</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <Form.Group controlId="custom-select-user">
                  <Form.Label>Ответственный</Form.Label>
                  <Form.Control
                    as="select"
                    controlId="custom-select-user"
                    onChange={e => setUserName(e.target.value)}
                    disabled={user.currentUser.role === 'ADMIN' ? false : true} >
                    <option
                      defaultValue={tasks && tasks.responsible_id}
                      className="d-none" disabled selected>
                      {(user.user && user.user.find(u => u.user_id === tasks?.responsible_id)?.name || 'Ответственный')}
                    </option>
                    {subordinate[0] && subordinate[0].accessor && user.user ?
                      user.user.filter(u => subordinate[0].accessor.includes(u.user_id)).map(u => (
                        <option value={u.user_id}>
                          {u.name}
                        </option>
                      )) : null}
                  </Form.Control>
                </Form.Group>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={onHide}>
              Закрыть
            </Button>
            <Button
              variant="outline-secondary"
              onClick={saveTask}
              disabled={
                tasks ?
                  status || user.currentUser.role === 'ADMIN' ? false : true
                  :
                  title && userName && status ? false : true
              }>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
})

export default ModalFront;