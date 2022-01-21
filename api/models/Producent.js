const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const producentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    supports:{
        type: Array,
    },
    imgurl:{
        type: String,
    },
    creationDate:{
        type: Date,
        require: true
    }
});

module.exports = model('Producent', producentSchema);
