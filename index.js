import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import router from './src/routes/index.js';
import 'dotenv/config';

const app = express();

// middleware

// routes
app.use('/api/v1', router);

// create server
const server = http.createServer(app);
const port = process.env.PORT || 5000;
// connect DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connect DB successfully!');
    server.listen(port, () => {
      console.log('Server is listening on port: ' + port);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
