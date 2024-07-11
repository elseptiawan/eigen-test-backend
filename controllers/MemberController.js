const {Member, BorrowingBook} = require('../models')
const { sendResponse } = require('../helpers/response');

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