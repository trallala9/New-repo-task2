let mongoose = require('mongoose');
let Movie = require('../models/movie');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let omdbURL = 'http://www.omdbapi.com/?t='; //url to OMDB API
let keyAPI = '&apikey=6d0c45ad'; //API key for OMDB


//fetching all movies from my database
function getMovies(req, res) {

    let query = Movie.find({});
    query.exec((err, movies) => {
        if (err) res.send(err);

        res.json(movies);
    })
}

function getFiltMovies(req, res) {
    Movie.find({Year : { $gt : req.params.year}}).sort({Year: req.params.sort}).exec((err, result) => {
        res.json(result);
    })
}


//post new movie with details from OMDB API
function postMovie(req, res) {

    if (!req.body.hasOwnProperty('Title')) {
        res.json( {Error: 'No title provided!'})

    } else {

        var source = omdbURL + req.body.Title + keyAPI;

        xhr = new XMLHttpRequest();

        //ajax for fetching data from OMDB
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.Response == "False") {
                    res.json({nonExist: true});
                } else {
                    let query = Movie.find({ Title: req.body.Title });
                    query.exec((err, response) => {
                        if (!response.length) {
                            var newMovie = new Movie(data);
                            newMovie.save((err, movie) => {
                                if (err) {
                                    res.send(err)
                                } else {
                                    res.json(movie)
                                }
                            })
                        } else {
                            res.send({Exist: true});
                        }
                    })

                }

            }
        }

        xhr.open('GET', source, true);
        xhr.send(null);
    }


}

//exporting functions to use elsewhere
module.exports = { getMovies, postMovie, getFiltMovies }