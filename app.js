require('dotenv').config();
const express = require('express');
const { sendResponse } = require('./helpers/response');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var bookRouter = require('./routes/bookRoutes');
var memberRouter = require('./routes/memberRoutes');
var borrowRouter = require('./routes/borrowRoutes');

app.get('/health', (req, res) => {
    sendResponse(res, 200, 'Success');
});

app.use('/books', bookRouter);
app.use('/members', memberRouter);
app.use('/borrows', borrowRouter);

app.use('/', (req, res) => {
    sendResponse(res, 404, 'Not Found');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});