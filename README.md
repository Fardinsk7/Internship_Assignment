# Project Title: REST API Server for movies

Description:
This project is a simple REST API server built using Node.js and MongoDB. It allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of data. The data stored in the MongoDB database includes information about various movies.

# Folder Structure:
- database: Contains files related to the MongoDB database connection.
- mongooseModels: Contains Mongoose schemas for defining the data structure.
- router: Contains route files for handling API endpoints.
- server.js: Main file where the server is initialized.
- .env: Configuration file for storing environment variables, such as the MongoDB connection URL.
- Installation:

# Clone the repository: 
git clone [https://github.com/Fardinsk7/Internship_Assignment.git]

#Install dependencies: npm install
Create a .env file and add your MongoDB connection URL in the format MONGO_URL=<your_mongo_url>
Start the server: npm start

# API Endpoints:
- GET /movie/create : Retrieve data by ID.
- GET /movie/getMovies : Retrieve all data from the database.
- POST /movie//getSingleMovie/:id : Create new data. 
- PUT /movie//updateMovie/:id : Update data by ID.
- DELETE /movie//deleteMovie/:id : Delete data by ID.

# Sample Data Schema:
javascript
Copy code
{
  name: String,
  img: String,
  summary: String
}

# Contributing:
- Fork the repository.
- Create a new branch: git checkout -b feature/new-feature
- Make your changes and commit them: git commit -m 'Add new feature'
- Push to the branch: git push origin feature/new-feature
- Submit a pull request.


# Author:
## Fardin Khan

Contact:
For any inquiries, please contact [itzfardinsk@gmail.com].

Feel free to contribute or provide feedback! 🚀