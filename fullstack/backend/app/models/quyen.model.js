const mongoose = require("mongoose");

const quyenSchema = new mongoose.Schema({
    url: {
        type: String,
    },
    chuthich: {
        type: String,
    },
});

module.exports = mongoose.model("Quyen", quyenSchema);