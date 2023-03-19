const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    
    "username": {
        type: String,
        require: true
    },
    "password": {
        type: String,
        require: true
    }
});

// Exporting the schema
const Account = mongoose.model('Account', accountSchema);
module.exports = Account; 