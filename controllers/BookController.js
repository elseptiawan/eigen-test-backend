const {Book} = require('../models')
const { sendResponse } = require('../helpers/response');

exports.getAll = async (req, res) => {
    try{
        const books = await Book.findAll();

        sendResponse(res, 200, 'Success', books);
    } catch (error) {
        sendResponse(res, 500, 'Internal server error');
    }
}