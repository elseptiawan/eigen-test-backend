module.exports = (sequelize, Datatypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        code: {
            type: Datatypes.STRING,
            allowNull: false
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false
        },
        author: {
            type: Datatypes.STRING,
            allowNull: false
        },
        stock: {
            type: Datatypes.INTEGER,
            allowNull: false
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
        tableName : 'books',
    });

    return Book;
}