module.exports = (sequelize: any, DataTypes: any) => {
    return sequelize.define('order', {
        id :{
            type: DataTypes.INTEGER(10),  
            primaryKey: true ,
            autoIncrement: true
        },
        userId:{
            type:DataTypes.STRING
        },
        date:{
            type:DataTypes.DATE
        },
        status:{
            type:DataTypes.STRING
        }
    });
}