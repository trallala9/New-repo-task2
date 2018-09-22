let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Movie schema definition
let MovieSchema = new Schema(
    {
        Title: { type: String, required: true},
    },
    {
        versionKey: false,
        strict: false
        
    }
);


//Export MovieSchema
module.exports = mongoose.model('movies', MovieSchema);

