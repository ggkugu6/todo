import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const datа = [{ id: "1", tittle: "dfd", prior: "sf", dateend: "sada", respons: "asd", status: "32" }]
const columns = [{
  dataField: 'id',
  text: '#'
}, {
  dataField: 'tittle',
  text: 'Заголовок'
}, {
  dataField: 'prior',
  text: 'Приоритет',
}, {
  dataField: 'dateend',
  text: 'Дата окончания'
}, {
  dataField: 'respons',
  text: 'Ответственный'
}, {
  dataField: 'status',
  text: 'Статус',
}
];
const TaskTable = () => {

  return (
    <div id="body_main">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Заголовок</th>
            <th scope="col">Приоритет</th>
            <th scope="col">Дата окончания</th>
            <th scope="col">Ответственный</th>
            <th scope="col">Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th id="id"><date /></th>
            <td id="tittle">Задача важная</td>
            <td id="prior">Высокий</td>
            <td id="dateend">2025-01-01 12:56</td>
            <td id="respons">Ирина</td>
            <td id="status">Высокий</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default TaskTable


