# OMBD

## install

Required:
- node.js
- npm
- MongoDB

### npm install
Please use **npm install** in /app directory to install packages from package.json
### MongoDB 
MongoDB is a NotSQL database. It stores documents as objects, which helps trasnfering data from OMBD API to MongoDB.

MongoDB should be on localhost and listens 27017 port. 

Structure of DB
- MovieDB
  - movies
  - comments
- MovieDB_test
  - movies
  - comments
  
  ## Usage
  
  App works http://localhost:8000 (listens  port 8000). 
  
  ### Endpoints
  
  
  **POST /movies**
  
Request body should contain only movie title, and its presence should be validated. **_Done_**

Based on passed title, other movie details should be fetched from http://www.omdbapi.com/ (or other similar, public movie database) - and saved to application database.**_Done_**

Request response should include full movie object, along with all data fetched from external API. **_Done_**


  **GET /movies**
  
Should fetch list of all movies already present in application database. **_Done_**

Additional filtering, sorting is fully optional - but some implementation is a bonus. **_Done, year filtering + sorting_**


  **POST /comments**
  
Request body should contain ID of movie already present in database, and comment text body. **_Done_**

Comment should be saved to application database and returned in request response. **_Done_**


  **GET /comments**
  
Should fetch list of all comments present in application database **_Done_**

Should allow filtering comments by associated movie, by passing its ID. **_Done_**

### Express
Simplifies routing http requests.

### body-parser
Parsing requests for more coding comfort

### mongoose
Using Schema and much less code for multiple queries. 




