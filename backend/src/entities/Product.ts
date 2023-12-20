import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import { UserAttributes, UserCreationAttributes } from './User';

export interface ProductAttributes{
    ProductId : number, //primary key
    ProductName: string,
    ProductExpiry: Date,
    ProductAvailability: boolean,
    UserId: number //foreign key
}

export interface ProductCreationAttributes extends ProductAttributes {}

const Product : ModelDefined<ProductAttributes, ProductCreationAttributes> = db.define("Product", 
{
    ProductId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ProductName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    ProductExpiry:
    {
        type: Sequelize.DATE,
        allowNull: false
    },

    ProductAvailability:
    {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    UserId:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'UserId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
});

Product.belongsTo(db.models.User, {
    foreignKey: 'UserId',
    as: 'User',
    onDelete: 'CASCADE',});

export default Product;