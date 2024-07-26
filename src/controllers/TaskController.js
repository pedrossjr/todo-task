const Task = require('../models/Task')

module.exports = class TaskController {
    //Chama o formulário para adicionar tarefa
    static createTask(req, res) {
        res.render('tasks/create')
    }

    //Executa a inclusão da tarefa
    static async createTaskSave(req, res) {
        try {
            const task = {
                title: req.body.title,
                description: req.body.description,
                done: false
            }

            await Task.create(task)

            res.redirect('/tasks')
        } catch (e) {
            return console.log(e);
        }
    }

    //Remove uma tarefa
    static async removeTask(req, res) {
        try {
            const id = req.body.id

            await Task.destroy({ where: { id: id } })

            res.redirect('/tasks')
        } catch (e) {
            return console.log(e);
        }
    }

    //Editar tarefa
    static async updateTask(req, res) {
        const id = req.params.id

        const task = await Task.findOne({ where: { id: id }, raw: true })

        res.render('tasks/edit', { task })
    }

    static async updateTaskPost(req, res) {
        try {
            const id = req.body.id

            const task = {
                title: req.body.title,
                description: req.body.description
            }

            await Task.update(task, { where: { id: id } })

            res.redirect('/tasks')
        } catch (e) {
            return console.log(e);
        }
    }

    static async toggleTaskStatus(req, res) {
        try {
            const id = req.body.id

            const task = {
                done: req.body.done === '0' ? true : false
            }

            await Task.update(task, { where: { id: id } })

            res.redirect('/tasks')
        } catch (e) {
            return console.log(e);
        }
    }

    //Lista todas as tarefas
    static async showTasks(req, res) {
        const tasks = await Task.findAll({ raw: true })

        res.render('tasks/all', { tasks })
    }
}