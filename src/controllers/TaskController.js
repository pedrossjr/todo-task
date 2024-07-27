const Task = require('../models/Task')

let message = null;
let type = null;

module.exports = class TaskController {
    // EXIBE O FORMULÁRIO DE CRIAÇÃO DE UMA TAREFA
    static createTask(req, res) {
        res.render('tasks/create');
    }

    // EXECUTA A INCLUSÃO DE UMA TAREFA
    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        if (!task.title) {
            message = "O campo título deve ser informado!";
            type = 'danger';
            return res.render('tasks/create', { message, type });
        }

        if (!task.description) {
            message = "O campo descrição deve ser informado!";
            type = 'danger';
            return res.render('tasks/create', { message, type });
        }

        try {
            await Task.create(task)
            message = "Tarefa criada com sucesso!";
            type = 'success';

            res.render('tasks/create', { message, type, redirect: true });
        } catch (e) {
            return res.status(500).send({ error: e.message });
        }
    }

    // EXECUTA A EXCLUSÃO DE UMA TAREFA
    static async removeTask(req, res) {
        const id = req.body.id

        try {
            await Task.destroy({ where: { id: id } })
            message = 'Tarefa excluída com sucesso!';
            type = 'success';
            res.redirect('/tasks')
        } catch (e) {
            return res.status(500).send({ error: e.message });
        }
    }

    // EXIBE O FORMULÁRIO DE EDIÇÃO DE UMA TAREFA
    static async updateTask(req, res) {
        const id = req.params.id

        const task = await Task.findOne({ where: { id: id }, raw: true })

        res.render('tasks/edit', { task });
    }

    // EXECUTA A ATUALIZAÇÃO DE UMA TAREFA
    static async updateTaskPost(req, res) {
        const GetId = req.body.id;

        const task = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description
        }

        try {
            if (!task.title) {
                message = "O campo título deve ser informado!";
                type = 'danger';

                return res.render('tasks/edit', { message, type });
            }

            if (!task.description) {
                message = "O campo descrição deve ser informado!";
                type = 'danger';
                return res.render('tasks/edit', { message, type });
            }

            await Task.update(task, { where: { id: GetId } })

            message = "Tarefa atualizada com sucesso!";
            type = 'success';

            res.render('tasks/edit', { message, type, redirect: true });
        } catch (e) {
            return res.status(500).send({ error: e.message });
        }
    }

    // EXECUTA A ATUALIZAÇÃO DE UMA TAREFA PARA CONCLUÍDA OU NÃO CONCLUÍDA
    static async toggleTaskStatus(req, res) {
        const id = req.body.id

        const task = {
            done: req.body.done === '0' ? true : false
        }

        try {
            await Task.update(task, { where: { id: id } });

            res.redirect('/tasks');
        } catch (e) {
            return res.status(500).send({ error: e.message });
        }
    }

    // EXIBE A LISTA DE TAREFAS
    static async showTasks(req, res) {
        try {
            setTimeout(() => {
                message = ''
            }, 2000)

            const tasks = await Task.findAll({ raw: true })

            res.render('tasks/all', { tasks })
        } catch (e) {
            return res.status(500).send({ error: e.message });
        }
    }
}