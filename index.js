// must at top
import 'express-async-errors';
import 'dotenv/config';

import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import cors from 'cors';

import router from './src/routes/index.js';
import handleError from './src/middlewares/handleError.middleware.js';

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1', router);

app.use(handleError);

// create server
const server = http.createServer(app);
const port = process.env.PORT || 5000;
// connect DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    server.listen(port, () => {
      console.log('Connect DB successfully!');
      console.log('Server is listening on port: ' + port);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
