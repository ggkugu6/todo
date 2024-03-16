import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Context } from '../../index.js'
import { format } from "date-fns";
import { Badge } from 'react-bootstrap'
import { SortToday } from '../task/SortToday.js'
import Modal from "../modal/Modal.jsx";

const TaskTable = observer(() => {
  const { task } = useContext(Context)
  const { user } = useContext(Context)
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedTasks, setSortedTasks] = useState([]);
  const [clickCount, setClickCount] = useState({});
  const sortedTodayTasks = SortToday();
  const [modalShow, setModalShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const defaultSorted = sortedTodayTasks.sort((a, b) => new Date(b['update_at']) - new Date(a['update_at']));
  const handleSort = (key) => {
    setClickCount(prevCount => ({ ...prevCount, [key]: (prevCount[key] || 1) + 1 }));
    let newSortedTasks;
    if (clickCount[key] % 3 === 0) {
      newSortedTasks = sortedTodayTasks.sort((a, b) => new Date(b['update_at']) - new Date(a['update_at']));
    } else {
      if (key === 'ended_at') {
        newSortedTasks = sortedTodayTasks.sort((a, b) => {
          const dateA = new Date(a[key]);
          const dateB = new Date(b[key]);
          if (sortOrder === 'asc') {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });
      } else {
        newSortedTasks = sortedTodayTasks.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[key] > b[key] ? 1 : -1;
          } else {
            return a[key] < b[key] ? 1 : -1;
          }
        });
      }
    }
    setSortedTasks(newSortedTasks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleRowClick = (data) => {
    setSelectedTask(data);
    setModalShow(true);
  };
  useEffect(() => {
    setSortedTasks(defaultSorted);
    setModalShow(false);
    setSelectedTask(null);
    setClickCount({});
  }, [user.currentUser, user.user,  task.tasks, task.period]);

  return (
    <div id="body_main">
      <table id="table" class="table table-hover">
        <thead>
          <tr>
            <th scope="col1">#</th>
            <th onClick={() => handleSort('title')} scope="col2">Заголовок <i className="fa fa-sort"></i></th>
            <th onClick={() => handleSort('description')} scope="col3">Описание <i className="fa fa-sort"></i></th>
            <th onClick={() => handleSort('priority')} scope="col4">Приоритет <i className="fa fa-sort"></i></th>
            <th onClick={() => handleSort('ended_at')} scope="col5">Дата окончания <i className="fa fa-sort"></i></th>
            <th onClick={() => handleSort('responsible_id')} scope="col6">Ответственный <i className="fa fa-sort"></i></th>
            <th onClick={() => handleSort('status')} scope="col7">Статус <i className="fa fa-sort"></i></th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((data, index) => (
            <tr
              key={data.id}
              onClick={() => { handleRowClick(data) }}>
              <td>{index + 1}</td>
              <td
                style={{
                  color: data.ended_at && new Date(data.ended_at) < new Date() ? "#ff0000d1" :
                    data.status === "выполнена" ? "#008000c4" : "",
                  fontWeight: "700",
                  opacity: 0.7
                }}>
                {data.title}
              </td>
              <td>{data.description && data.description.length >= 50 ? data.description.substring(0, 50) + "..." : data.description} </td>
              <td>
                <Badge
                  pill bg={data.priority === "высокий" ? "danger" : data.priority === "средний" ? "warning" : "primary"}
                  text="light">
                  {data.priority}
                </Badge>
              </td>
              <td>{data.ended_at ? format(new Date(data.ended_at), 'dd-MM-yyyy HH:mm') : null}</td>
              <td>{(user.user && user.user.find(u => u.user_id === data.responsible_id)?.name)}</td>
              <td>
                <Badge
                  bg={data.status === "выполнена" ? "success" : "secondary"}
                  text="light">
                  {data.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={modalShow} tasks={selectedTask}
        onHide={() => setModalShow(false)} />
    </div>
  )
})
export default TaskTable