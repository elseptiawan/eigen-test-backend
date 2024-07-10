module.exports = (sequelize, Datatypes) => {
    const Penalty = sequelize.define('Penalty', {
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
        end_date: {
            type: Datatypes.DATEONLY,
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
        tableName : 'penalties',
    });

    return Penalty;
}