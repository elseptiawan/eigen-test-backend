module.exports = (sequelize, Datatypes) => {
    const BorrowingBook = sequelize.define('BorrowingBook', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        member_id: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        book_id: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        is_returned: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: Datatypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Datatypes.DATE,
            allowNull: false
        },
    }, {
        tableName : 'borrowing_books',
    });

    return BorrowingBook;
}