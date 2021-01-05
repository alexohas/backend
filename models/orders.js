const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        }
    },
    contents: [
        {
            lesson: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Lessons"
            },
            total: {
                type: Number,
                required: true,
                min: 0,
            },
            quantity: {
                type: Number,
                required: true,
                min: 0,
            },
        }
    ],
    total: {
        type: Number,
        required: true,
        min: 0,
    },
  
}, {
        timestamps: true
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
