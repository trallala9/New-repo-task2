let mongoose = require('mongoose');
let Comment = require('../models/comment');
let Movie = require('../models/movie');

//fetching all comments
function getComments(req, res) {

    let query = Comment.find({});
    query.exec((err, comments) => {
        if (err) res.send(err);

        res.json(comments);
    })
}

//fetching all comments of specific movie 
function getComment(req, res) {
    
    let query = Movie.find({ _id: req.params['id'] });
    query.exec((err, movie) => {
        if (movie === undefined) {
            res.json({Error: 'No movie in db'});
        } else {
            let query = Comment.find({ Title: movie[0].Title });
            query.exec((err, comment) => {
                if (!comment.length) {
                    res.send("No comments")
                } else {
                    res.json(comment);
                }
            })
        }
    })
    
};


//posting comment
function postComment(req, res) {
    let query = Movie.find({ _id: req.body['id'] });
    query.exec((err, response) => {
        if (!response) {
            res.json({Error: 'No movie in db'});
        } else {
            var obj = Object.assign({}, { Title: response[0].Title }, { MovieID: response[0]['id'] }, { comment: req.body.comment });
            var newComment = new Comment(obj);
            newComment.save((err, comment) => {
                if (err) {
                    res.send(err)
                } else {
                    res.json(comment);
                }
            })
        }
    })


}

//exporting functions to use elsewhere
module.exports = { getComments, postComment, getComment }