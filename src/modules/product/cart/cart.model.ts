module.exports = (sequelize: any, DataTypes: any) => {
    return sequelize.define('cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    },
        {
            timestamps: true,
        });
    // Cart.associate =
    //     (models: any) => {
    //         Cart.hasOne(models.Product,{
    //             foreignKey: 'productId',
    //             onDelete: 'CASCADE'
    //         });
    //     };
}