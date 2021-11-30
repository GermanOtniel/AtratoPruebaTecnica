const env = require('node-env-file');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const cors         = require("cors");

env(__dirname + '/.env');

mongoose.Promise = Promise;
mongoose
  .connect(process.env.DATABASE,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

path.resolve(__dirname);
app.use(cookieParser());

const options = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
}
app.use(cors(options));
app.use(express.json());
app.use( '/api/', require(__dirname + '/routes/router') );

app.get('/', (request, response) =>{
  response.send('API atrato');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});