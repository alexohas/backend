const mongoose = require("mongoose");

const lessonsSchema = new mongoose.Schema({
    lesson: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    space: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
  
});

const Lessons = mongoose.model("Lessons", lessonsSchema);
module.exports = Lessons;
