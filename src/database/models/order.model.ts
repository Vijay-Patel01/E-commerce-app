module.exports = (sequelize: any, DataTypes: any) => {
    return sequelize.define('order', {
        id :{
            type: DataTypes.INTEGER(10),  
            primaryKey: true ,
            autoIncrement: true
        },
        orderId:{
            type:DataTypes.STRING
        },
        userId:{
            type:DataTypes.STRING
        },
        productId:{
            type:DataTypes.STRING
        },
        quantity :{
            type:DataTypes.INTEGER
        },
        price:{
            type:DataTypes.DECIMAL(8,2)
        },
        totalPrice:{
            type:DataTypes.DECIMAL(9,3)
        },
        paymentMethod:{
            type:DataTypes.STRING
        },
        date:{
            type:DataTypes.DATE
        },
        status:{
            type:DataTypes.STRING
        }
    },
    {
        timestamps: true,
    });
}