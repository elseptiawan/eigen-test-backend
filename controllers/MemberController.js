const {Member, BorrowingBook} = require('../models')
const { sendResponse } = require('../helpers/response');

/**
 * @swagger
 * components:
 *   schemas:
 *     Members:
 *       type: object
 *       required:
 *         - id
 *         - code
 *         - name
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: auto increment unique identifier
 *         code:
 *           type: string
 *           description: The code of the member
 *         name:
 *           type: string
 *           description: The name of the member
 *         total_borrowed:
 *           type: integer
 *           description: The total borrowed books
 *       example:
 *         id: 1
 *         code: M001
 *         name: Angga
 *         createdAt: 2021-01-01
 *         updatedAt: 2021-01-01
 *         total_borrowed: 2
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Members Endpoint
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Returns the list of the members and the total borrowed books
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: The list of the members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Members'
 */
exports.getAll = async (req, res) => {
    try{
        const members = await Member.findAll({
            include: [
                {
                    model: BorrowingBook,
                    where: {
                        is_returned: false
                    },
                    as: 'borrowing_books',
                    required: false
                }
            ],
            order: [['id', 'ASC']]
        });

        for (let i = 0; i < members.length; i++) {
            members[i].dataValues.total_borrowed = members[i].borrowing_books.length;
            delete members[i].dataValues.borrowing_books;
        }

        sendResponse(res, 200, 'Success', members);
    } catch (error) {
        sendResponse(res, 500, 'Internal server error');
    }
}