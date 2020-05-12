const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    classname: {
        type: String,
        required: true,
        trim: true
    },
    classnumber: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    condition: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    imagelink: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    email: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book