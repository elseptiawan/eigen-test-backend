require('dotenv').config();
const express = require('express');
const { sendResponse } = require('./helpers/response');

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    sendResponse(res, 200, 'Success');
});

app.use('/', (req, res) => {
    sendResponse(res, 404, 'Not Found');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});