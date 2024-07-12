require('dotenv').config();
const express = require('express');
const { sendResponse } = require('./helpers/response');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var bookRouter = require('./routes/bookRoutes');
var memberRouter = require('./routes/memberRoutes');
var borrowRouter = require('./routes/borrowRoutes');
var bookReturnRouter = require('./routes/bookReturnRoutes');

app.get('/health', (req, res) => {
    sendResponse(res, 200, 'Success');
});

app.use('/books', bookRouter);
app.use('/members', memberRouter);
app.use('/borrows', borrowRouter);
app.use('/returns', bookReturnRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/', (req, res) => {
    sendResponse(res, 404, 'Not Found');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

module.exports = app;