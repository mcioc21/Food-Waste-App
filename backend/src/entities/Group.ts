import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import { UserAttributes } from './User';

export interface GroupAttributes{
    GroupId : number,
    GroupName: string,
    // GroupMembers: UserAttributes[],
}

export interface GroupCreationAttributes extends UserAttributes {}

const Group : ModelDefined<GroupAttributes, GroupCreationAttributes> = db.define("Group", 
{
    GroupId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    GroupName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    
});

Group.belongsToMany(db.models.User, {
    through: 'UserGroup',
    foreignKey: 'GroupId',
    otherKey: 'UserId',
    as: 'GroupMembers',
    onDelete: 'CASCADE',});

export default Group;