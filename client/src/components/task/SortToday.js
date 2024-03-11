import { useContext, useEffect } from "react";
import { isToday, isWithinInterval, isAfter } from 'date-fns';
import { Context } from '../../index.js'
import  {AccessRights}  from "./AccessRights.js";

export const SortToday = () => {
  const { task } = useContext(Context);

  const tasks = AccessRights()

  let result;
  switch (task.period) {
    case 'today':
      result = tasks.filter(task => task?.ended_at && isToday(new Date(task.ended_at)));
      break;
    case 'week':
      const weekStartDate = new Date();
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 7);
      result = tasks.filter(task => task?.ended_at && isWithinInterval(new Date(task.ended_at), weekStartDate, weekEndDate));
      break;
    case 'future':
      const weekEndDate2 = new Date();
      weekEndDate2.setDate(weekEndDate2.getDate() + 7);
      result = tasks.filter(task => task?.ended_at && isAfter(new Date(task.ended_at), weekEndDate2));
      break;
    default:
      result = tasks;
  }

  return result;
}

