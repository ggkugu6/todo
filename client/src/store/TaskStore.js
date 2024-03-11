import { makeAutoObservable } from 'mobx'
export default class TaskStore {
    constructor() {
        this._tasks = []
        this._selectedPeriod = ['today','week','future', ''];
        makeAutoObservable(this)
    }

    setTask(tasks) {
        this._tasks = tasks
    }
    get tasks() {
        return this._tasks
    }
    setSelectedPeriod(period) {
        this._selectedPeriod = period;
    };
    get period() {
        return this._selectedPeriod
    }
}
