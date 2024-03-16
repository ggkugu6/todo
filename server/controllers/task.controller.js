const db = require('../db.js')

class TaskController{
    async createTask(req,res){
        const {title, description, priority, status, deleted_at, ended_at, creator_id, responsible_id} = req.body
        const newTask = await db.query('INSERT INTO "tasks" ("title", "description", "priority", "status", "deleted_at", "ended_at", "creator_id", "responsible_id") VALUES ($1, $2, $3,$4, $5, $6,$7, $8) RETURNING *', 
        [title, description, priority, status, deleted_at, ended_at, creator_id, responsible_id])
        console.log(title, description, priority, status, deleted_at, ended_at, creator_id, responsible_id)
        res.json(newTask.rows[0])
    }
    async getTask(req,res){
        const task = await db.query('select * from tasks')
        res.json(task.rows)

    }
    async getOneTask(req,res){  /*возвращает конкрет*/
        const id = req.params.id
        const task = await db.query('select * from tasks where id=$1', [id])
        res.json(task.rows)
    }
    async updateTask(req,res){
        const {title, description, priority, status, deleted_at, ended_at, creator_id, responsible_id} = req.body
        const task = await db.query(
        'update tasks set title=$1,description=$2,priority=$3,status=$4,deleted_at=$5,ended_at=$6,creator_id=$7,responsible_id=$8 RETURNING *',
        [title, description, priority, status, deleted_at, ended_at, creator_id, responsible_id]
        )
            res.json(task.rows[0])

    }
    async deleteTask(req,res){
        const id=req.params.id
        const task = await db.query ('delete from task where id=$1', [id])
        res.json(task.rows)
    }
}
module.exports = new TaskController()