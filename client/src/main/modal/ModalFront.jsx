import React from "react";
import "./modal_front_content.css";

const ModalFront = (
  <div id="modal_front_content">
    <form action="">
      <button className="close_t">Закрыть</button>
      <input type="text" placeholder="Заголовок" />
      <input type="text" placeholder="Описание" />
      <div>Дата окончания</div>
      <input type="date" placeholder="Дата окончания" />
      <div>Приоритет</div>
      <select className="prioriti_select" name="prioriti_select">
        <option value="high" selected>
          высокий
        </option>
        <option value="medium">средний</option>
        <option value="low">низкий</option>
      </select>
      <div>Статус</div>
      <select className="status_task" name="status">
        <option value="implementation" selected>
          к выполнению
        </option>
        <option value="in_progress">выполняется</option>
        <option value="completed">выполнена</option>
        <option value="cancelled">отменена</option>
      </select>
      <input type="creator" placeholder="Создатель" />
      <input type="responsible" placeholder="Ответственный" />
      <button>Сохранить</button>
    </form>
  </div>
);
export default ModalFront;
