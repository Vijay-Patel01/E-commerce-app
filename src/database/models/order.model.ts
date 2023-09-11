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
        totalPrice:{
            type:DataTypes.DECIMAL(9,3)
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