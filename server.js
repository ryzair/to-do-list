
const app = require('./server/config/app');
const mongoose = require('mongoose');
let DB = require('./server/config/db');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'There is a connection Error'));
mongoDB.once('open',()=>{
  console.log("It's connected with MongoDB")
});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true})

// Start the server
app.listen(PORT, () => {
  console.log(`The server is running on port number ${PORT}`);
});
