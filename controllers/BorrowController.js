const {BorrowingBook, Penalty, Book, Member} = require('../models')
const { sendResponse, validationErrResponse } = require('../helpers/response');
const Validator = require('fastest-validator');
const sequelize = require('sequelize');
const db = require('../models/index');

const v = new Validator();
const { Op } = require("sequelize");

/**
 * @swagger
 * components:
 *   schemas:
 *     BorrowRequest:
 *       type: object
 *       required:
 *         - member_id
 *         - book_id
 *       properties:
 *         member_id:
 *           type: string
 *           description: The ID of the member who is borrowing the book
 *         book_id:
 *           type: string
 *           description: The ID of the book being borrowed
 *       example:
 *         member_id: 1
 *         book_id: 101
 */

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: API endpoints for borrowing and returning books
 */

/**
 * @swagger
 * /borrows:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BorrowRequest'
 *     responses:
 *       201:
 *         description: Successfully borrowed
 *       400:
 *         description: Request Validation Error
 */
exports.borrow = async (req, res) => {
    const schema = {
        member_id : 'number|min:1',
        book_id : 'number|min:1'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return validationErrResponse(res, 'Request validation error', validate);
    }

    const t = await db.sequelize.transaction();
    try{
        const checkMember = await Member.findByPk(req.body.member_id);
        if (!checkMember) {
            return sendResponse(res, 404, 'Member not found');
        }
        
        const checkPenalty = await Penalty.findOne({
            where: {
                member_id: req.body.member_id,
                end_date: {
                    [Op.gte]: new Date()
                }
            }
        });

        if (checkPenalty) {
            return sendResponse(res, 400, `You are under penalty. You cannot borrow books until ${checkPenalty.end_date}`);
        }

        const checkBorrow = await BorrowingBook.findAll({
            where: {
                member_id: req.body.member_id,
                is_returned: false
            }
        });

        if (checkBorrow.length > 1) {
            return sendResponse(res, 400, 'You cannot borrow more than 2 books in a time');
        }

        const book = await Book.findByPk(req.body.book_id);

        if (!book) {
            return sendResponse(res, 404, 'Book not found');
        }

        if (book.stock === 0) {
            return sendResponse(res, 400, 'Book is not available for now');
        }

        await BorrowingBook.create({
            member_id: req.body.member_id,
            book_id: req.body.book_id
        });

        book.stock -= 1;
        await book.save();

        await t.commit();
        sendResponse(res, 201, 'Created');
    } catch (error) {
        await t.rollback();
        console.log(error);
        sendResponse(res, 500, 'Internal server error');
    }
}

/**
 * @swagger
 * /returns:
 *   put:
 *     summary: Return a book
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BorrowRequest'
 *     responses:
 *       200:
 *         description: Successfully returned
 *       400:
 *         description: Request Validation Error
 */
exports.bookReturn = async (req, res) => {
    const schema = {
        member_id : 'number|min:1',
        book_id : 'number|min:1'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return validationErrResponse(res, 'Request validation error', validate);
    }

    const t = await db.sequelize.transaction();
    try{
        now = new Date();

        const checkMember = await Member.findByPk(req.body.member_id);
        if (!checkMember) {
            return sendResponse(res, 404, 'Member not found');
        }

        const book = await Book.findByPk(req.body.book_id);
        if (!book) {
            return sendResponse(res, 404, 'Book not found');
        }

        const checkBorrow = await BorrowingBook.findOne({
            where: {
                member_id: req.body.member_id,
                book_id: req.body.book_id,
                is_returned: false
            }
        });
        if(!checkBorrow){
            return sendResponse(res, 400, 'You are not borrowing this book');
        }

        const dayDiff = Math.floor((now - checkBorrow.createdAt) / (1000 * 60 * 60 * 24));

        let message = 'You have returned the book';
        if (dayDiff > 7) {
            const penalty = await Penalty.create({
                member_id: req.body.member_id,
                end_date: now.setDate(now.getDate() + 3)
            });
            message = `You have returned the book late. You have a penalty until ${penalty.end_date}`;
        }

        await checkBorrow.update({
            is_returned: true
        });

        book.stock += 1;
        await book.save();

        await t.commit();
        sendResponse(res, 200, message);
    } catch (error) {
        await t.rollback();
        console.log(error);
        sendResponse(res, 500, 'Internal server error');
    }
}