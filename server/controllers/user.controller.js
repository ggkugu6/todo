const db = require('../db.js')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

const generateJwt = (login, role) => {
    return jwt.sign(
    {login, role}, 
    process.env.DB_TOKEN, 
    {
        expiresIn: '9h'
      }
    )
    }

class UserController{
    async createUser(req,res){
        const {name,last_name, login} = req.body
        const newPerson = await db.query('INSERT INTO "users" ("name", "last_name", "login") VALUES ($1, $2, $3) RETURNING *', [name, last_name, login])
        console.log(name, last_name, login)
        res.json(newPerson.rows[0])
    }
    async getUser(req,res){
        const users = await db.query('select * from users')
        res.json(users.rows)

    }
    async getOneUser(req,res){  /*возвращает конкрет юзера*/
        const id = req.params.user_id
        const user = await db.query('select * from users where user_id=$1', [id])
        res.json(user.rows)
    }
    async updateUser(req,res){
        const {
            user_id,
            name,
            last_name,
            surname,
            full_name,
            login,
            passsword,
            role
        } = req.body
        const user = await db.query(
        'update users set user_id=$1,name=$2,last_name=$3,surname=$4,full_name=$5,login=$6,passsword=$7,role=$8 RETURNING *',
        [user_id,name,last_name,surname,full_name,login,passsword,role]
        )
            res.json(user.rows[0])

    }
    async deleteUser(req,res){
        const id=req.params.user_id
        const user = await db.query ('delete from users where user_id=$1', [id])
        res.json(user.rows)
    }

    async registration(req,res,next){
        const{login, passsword, role} = req.body
        if(!login || !passsword){
            return next(ApiError.badRequest('Некорректный Логин или Пароль'))
        }
        const candidate = await db.query('select login, passsword, role from users where login=$1', [req.body.login])
        if (candidate.rows[0]) {
            return next(ApiError.badRequest('Такой пользователь уже есть!'))
        }
        const hashPassword = await bcrypt.hash(passsword, 5)
        const user = await db.query('INSERT INTO "users" (login, passsword, role) VALUES ($1, $2, $3) RETURNING *', 
            [login, {passsword: hashPassword}, role])
        const token = generateJwt(user.rows[0].login, user.rows[0].role)
        return res.json({token})
 
    } 
    async login(req,res, next){
        const {login, passsword, role} = req.body
        const user = await db.query('select * from users where login=$1', [req.body.login])
        if(!user.rows[0]){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let jsonParse = JSON.parse(user.rows[0].passsword)
        let comparePassword = bcrypt.compareSync(passsword, jsonParse.passsword)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.rows[0].login, user.rows[0].role)
        return res.json({token})
    }
    async check(req,res, next){
        const token = generateJwt(req.user.login, req.user.role)
        return res.json({token})
    }    

}
module.exports = new UserController()  