const {BorrowingBook, Penalty, Book, Member} = require('../models')
const { sendResponse, validationErrResponse } = require('../helpers/response');
const Validator = require('fastest-validator');
const sequelize = require('sequelize');
const db = require('../models/index');

const v = new Validator();
const { Op } = require("sequelize");

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