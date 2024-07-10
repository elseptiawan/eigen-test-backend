module.exports = (sequelize, Datatypes) => {
    const Member = sequelize.define('Member', {
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
        name: {
            type: Datatypes.STRING,
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
        tableName : 'members',
    });

    return Member;
}