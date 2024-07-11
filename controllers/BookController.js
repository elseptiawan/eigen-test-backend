const {Book} = require('../models')
const { sendResponse } = require('../helpers/response');

/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       required:
 *         - id
 *         - code
 *         - title  
 *         - author
 *         - stock
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: auto increment unique identifier
 *         code:
 *           type: string
 *           description: The code of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         stock:
 *           type: integer
 *           description: The stock of the book
 *       example:
 *         id: 1
 *         code: JK-45
 *         title: Harry Potter
 *         author: J.K. Rowling
 *         stock: 1
 *         createdAt: 2021-01-01
 *         updatedAt: 2021-01-01
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books Endpoint
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of the books include the stock
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Books'
 */
exports.getAll = async (req, res) => {
    try{
        const books = await Book.findAll();

        sendResponse(res, 200, 'Success', books);
    } catch (error) {
        sendResponse(res, 500, 'Internal server error');
    }
}