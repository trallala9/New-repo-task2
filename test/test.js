process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Movie = require('../models/movie');
let Comment = require('../models/comment');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

var testID = ''
describe('/movies', () => {
    before((done) => {
        let query =  Movie.find({}) 
        query.exec((err, response) => {
            testID = response[0]['_id'];
            Movie.remove({}, (err) => {        
                done()
            })
        })
       
            
        


    });





    describe('/POST', () => {

        it('Should not post if there is no title', (done) => {
            let movie = {};

            chai.request(server)
                .post('/movies')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Error');
                    done();
                })
        })

        it("Movie doesn't exist in OMBD", (done) => {
            let movie = {
                Title: 'Lorem Ipsum Non Existum'
            };

            chai.request(server)
                .post('/movies')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nonExist');
                    done();
                })
        })

        it('Should post new movie', (done) => {
            let movie = {
                Title: 'Frozen'
            };
            
            chai.request(server)
                .post('/movies')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Title');
                    res.body.should.have.property('Year');
                    res.body.should.have.property('Genre');
                    res.body.should.have.property('Director');
                    res.body.should.have.property('Country');

                    let query =  Movie.find({}) 
                    query.exec((err, response) => {
                        //console.log(response[0]['_id']);
                        testID = response[0]['_id'];
                        done();
                    })
                   
                })
        })

        it('Movie already in database', (done) => {
            let movie = {
                Title: 'Frozen'
            };

            chai.request(server)
                .post('/movies')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Exist').eql(true);
                    done();
                })

        })
    })
    describe('/GET', () => {
        it('GET all the movies', (done) => {
            chai.request(server)
                .get('/movies')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                })
        })

        it('GET filtered and sorted movies', (done) => {
            chai.request(server)
                .get('/movies/2006/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                })
        })


    })
})
describe('/comments', () => {
    before((done) => {
        Comment.remove({}, (err) => {
            done()
        })
    })

   
    describe('/POST', () => {

        it('Movie with this ID not exists', (done) => {
            let comment = {
                id: '1',
                comment: 'Lorem Ipsum'
            }


            chai.request(server)
                .post('/comments')
                .send(comment)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Error');
                    done()
                })
        })

        it('There is no comment input', (done) => {
            let comment = {
                id: testID,
                comment: ''
            }


            chai.request(server)
                .post('/comments')
                .send(comment)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.errors.comment.should.have.property('message').eql("Path `comment` is required.");
                    done()
                })
        })

        it('Comment added and responded from db', (done) => {
            let comment = {
                id: testID,
                comment: 'Test comment'
            }


            chai.request(server)
                .post('/comments')
                .send(comment)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('comment');
                    done()
                })
        })
    })

    describe('/GET', () => {
        it('GET all the comments', (done) => {
            chai.request(server)
                .get('/comments')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                })
        })

        it('GET filtered comments', (done) => {
            chai.request(server)
                .get('/comments/'+testID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                })
        })
    })

})