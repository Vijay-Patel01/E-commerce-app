module.exports = (sequelize: any, DataTypes: any) => {
    return sequelize.define('product', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        name: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.INTEGER
        },
        stock: {
            type: DataTypes.INTEGER
        },
        vendorId:{
            type:DataTypes.INTEGER,
            references:{
                model:'vendors',
                key:'id'
            }
        },
        cover_image:{
            type: DataTypes.STRING
        },
        images:{
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        status:{
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    });
};