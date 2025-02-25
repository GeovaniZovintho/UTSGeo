const Task = require('../models/taskModel');

const taskController = {
    createTask: async (req, res) => {
        const { title, category, deadline, status } = req.body;
        const userId = req.user.id; 
        try {
            const taskId = await Task.create(userId, title, category, deadline, status);
            res.status(201).json({ taskId, message: 'Task created successfully' });
        } catch (err) {
            console.error("Task creation error:", err);
            res.status(500).json({ message: 'Task creation failed', error: err.message });
        }
    },

    getTasks: async (req, res) => {
        const userId = req.user.id;
        try {
            const tasks = await Task.findAllByUserId(userId);
            res.json(tasks);
        } catch (err) {
            console.error("Fetch tasks error:", err);
            res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
        }
    },

    updateTask: async (req, res) => {
        const { id } = req.params;
        const { title, category, deadline, status } = req.body;

        try {
            await Task.update(id, title, category, deadline, status);
            res.json({ message: 'Task updated successfully' });
        } catch (err) {
            console.error("Update task error:", err);
            res.status(500).json({ message: 'Task update failed', error: err.message });
        }
    },

    deleteTask: async (req, res) => {
        const { id } = req.params;

        try {
            await Task.delete(id);
            res.json({ message: 'Task deleted successfully' });
        } catch (err) {
            console.error("Delete task error:", err);
            res.status(500).json({ message: 'Task deletion failed', error: err.message });
        }
    }
};

module.exports = taskController;
