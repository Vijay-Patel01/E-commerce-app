module.exports = (sequelize: any, DataTypes: any) => {
    return sequelize.define('vendor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        status:{
            type: DataTypes.STRING
        },
    },{
        timestamps: true,
    });
}