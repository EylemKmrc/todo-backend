const mongoose = require('mongoose');

//definieren mit mongoose wie eine Todo in MongoDB aufgebaut sein soll
const schema = new mongoose.Schema ({
        title: {
            type: String,
            required: true
        },

        category: {
            type: String,
            enum: [
                'Uni',
                'Privat',
                'Sport',
                'Einkaufen',
                'Haushalt',
                'Arbeit',
                'Freizeit',
                'Orga'
            ],
            required: true
        },

        status: {
            type: String,
            enum: [
                'offen',
                'in Bearbeitung',
                'erledigt'
            ],
            default: 'offen',
            required: true
        },

        dueDate: {
            type: Date
        }
    }
);

//model mit dem Namen 'Todo' wird erstellt - mit dem obigen Schema
//module.exports gibt das Modell für andere Dateien frei (zb.: routes.js)
module.exports = mongoose.model('Todo', schema);