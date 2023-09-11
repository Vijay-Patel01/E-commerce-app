module.exports = (sequelize: any, DataTypes: any) => {
    return sequelize.define('orderItem', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.STRING()
        },
        productId: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.DECIMAL(8, 2)
        }
    },
        {
            timestamps: true,
        });
}