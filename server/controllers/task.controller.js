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
        const task = await db.query('select tasks.* from tasks join users on tasks.responsible_id = users.user_id where tasks.responsible_id = users.user_id')
        res.json(task.rows)
    }
    async getOneTask(req,res){  /*возвращает конкрет*/
        const id = req.params.id
        const task = await db.query('select * from tasks where id=$1', [id])
        res.json(task.rows)
    }
    async updateTask(req, res) {
        const { id, ...updatedFields } = req.body;
        const fieldUpdates = [];
        const fieldValues = [];
      
        Object.entries(updatedFields).forEach(([fieldName, value], index) => {
          if (value !== null) {
            fieldUpdates.push(`${fieldName}=$${fieldValues.length + 1}`);
            fieldValues.push(value);
          }
        });
      
        fieldValues.push(id);
      
        const query = {
          text: `UPDATE tasks SET ${fieldUpdates.join(',')} WHERE id=$${fieldValues.length} RETURNING *`,
          values: fieldValues
        };
      
        const task = await db.query(query);
        res.json(task.rows[0]);
      }
    async deleteTask(req,res){
        const id=req.params.id
        const task = await db.query ('delete from task where id=$1', [id])
        res.json(task.rows)
    }
}
module.exports = new TaskController()