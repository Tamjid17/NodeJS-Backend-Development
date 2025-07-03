const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    category : {
        type: String,
        required: true,
        trim: true,
    },
    price : {
        type: Number,
        required: true,
    },
    inStock : {
        type: Boolean,
        required: true,
    },
    tags : {
        type : [String],
        required : true
    }
});

module.exports = mongoose.model('Product', productSchema);