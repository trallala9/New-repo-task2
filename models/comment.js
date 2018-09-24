let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Comment schema definition
let CommentSchema = new Schema(
    {
        
        Title: { type: String, required: true},
        comment: { type: String, required: true},
        createdAt: { type: Date, default: Date.now}
    },
    {
        versionKey: false
    }
);

CommentSchema.path('comment').validate(function (v) {
    return v.length > 1;
    });

//Sets createdAt as current time
CommentSchema.pre('save', next => {
    now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

//Export CommentSchema
module.exports = mongoose.model('comments', CommentSchema);