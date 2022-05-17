const mongoose = require("mongoose");
const schema = mongoose.Schema;

const inventorySchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
		min: 10
    }

});

module.exports = mongoose.model('Inventory', inventorySchema);