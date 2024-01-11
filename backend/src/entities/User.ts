import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import { ProductAttributes, ProductCreationAttributes } from './Product';
import { GroupAttributes, GroupCreationAttributes } from './Group';

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
        allowNull: false
    },    
});

User.hasMany(db.models.Product, {
    foreignKey: 'UserId',
    as: 'ProductList',
    onDelete: 'CASCADE',});

User.belongsToMany(db.models.Group, {
    through: 'UserGroup',
    foreignKey: 'UserId',
    otherKey: 'GroupId',
    as: 'Groups',
    onDelete: 'CASCADE',});

export default User;