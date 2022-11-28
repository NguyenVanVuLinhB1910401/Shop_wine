const mongoose = require("mongoose");

const capbacSchema = new mongoose.Schema({
    tencapbac: {
        type: String,
        unipue: true,
    },
    km: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Capbac", capbacSchema);