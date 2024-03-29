import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import Product, { ProductAttributes, ProductCreationAttributes } from './Product';
import Group, { GroupAttributes, GroupCreationAttributes } from './Group';

export interface UserAttributes{
    UserId : number,
    UserName: string,
    UserEmail: string | null,
    UserPassword: string,
    UserProductList: ProductAttributes[],
    // UserGroups: GroupAttributes[]
}

//IMPORTANT: user login made like this is rudimentary and not secure and we may not implement the user login at all

export interface UserCreationAttributes extends UserAttributes {};

const User : ModelDefined<UserAttributes, UserCreationAttributes> = db.define("User", 
{
    UserId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    UserEmail:
    {
        type: Sequelize.STRING,
        allowNull: true
    },

    UserPassword:
    {
        type: Sequelize.STRING,
        allowNull: true
    },    
});


User.hasMany(Product, {
    foreignKey: 'UserId',
    as: 'UserProductList',
    onDelete: 'CASCADE',});
Product.belongsTo(User, {
    foreignKey: 'UserId',
    as: 'User',
    onDelete: 'CASCADE',});

// User.belongsToMany(Group, {
//     through: 'UserGroup',
//     foreignKey: 'UserId',
//     otherKey: 'GroupId',
//     as: 'Groups',
//     onDelete: 'CASCADE',});

export default User;