
const app = require('./server/config/app');
const mongoose = require('mongoose');
let DB = require('./server/config/db');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{
  console.log("Connected with the MongoDB")
});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
