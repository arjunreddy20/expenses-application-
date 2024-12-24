const Note = require('../models/noteModel');

const NoteController = {
    getNotes: async (req, res) => {
        try {
            const notes = await Note.findAll({
                where: { userId: req.userId },
                order: [['date', 'ASC']]
            });
            res.status(200).json(notes);
        } catch (err) {
            console.error('Error fetching notes:', err);
            res.status(500).json({ message: 'Error fetching notes' });
        }
    }
};

module.exports = NoteController;