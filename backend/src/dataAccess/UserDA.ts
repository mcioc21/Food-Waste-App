import { Sequelize, QueryTypes } from "sequelize";
import db from "../dbConfig";
import Product from "../entities/Product";
import User, { UserCreationAttributes } from "../entities/User";
import { Users, UserProductList } from "../entities/dbConst";
import UserFilterDto from "./models/userFilterDto";
import { Like } from "./operators";

async function createUser(user : UserCreationAttributes) {
    return await User.create(user, { include: [{model: Product, as: UserProductList }] });
}

async function getUserById(id : number) {
    return await User.findByPk(id, { include: [UserProductList] });
}

async function getUsers(userFilter: UserFilterDto) {

    if (!userFilter.take)
      userFilter.take = 10;
  
    if (!userFilter.skip)
      userFilter.skip = 0;
  
    let whereClause: any = {};
    if (userFilter.userId)
      whereClause.userId = { [Like]: `%${userFilter.userId}%` };
  
    if (userFilter.userEmail)
      whereClause.userEmail = { [Like]: `%${userFilter.userEmail}%` };

    if (userFilter.userName)
      whereClause.userName = { [Like]: `%${userFilter.userName}%` };

    // if (userFilter.userPassword)
    //   whereClause.userPassword = { [Like]: `%${userFilter.userPassword}%` };
  
    return await User.findAndCountAll(
      {
        distinct: true,
        where: whereClause,
        limit: userFilter.take,
        offset: userFilter.skip * userFilter.take,
      });
  
  }

  async function deleteUser(id: number) {  
    //delete user should also delete in the db the products associated to that user, as the onDelete: CASCADE is present in Product.ts foreign key

    let deleteElem = await User.findByPk(id);
  
    if (!deleteElem) {
      console.log("This element does not exist, so it cannot be deleted");
      return;
    }
    return await deleteElem.destroy();
  }

  async function updateUser(user: UserCreationAttributes, id: number) {
    const findUser = await getUserById(user.UserId);
  
    if (!findUser) {
      console.log("This user does not exist");
      return;
    }
  
    const t = await db.transaction()
    try {
      await findUser.update(user);
  
      // deleted
      const existProduct = await Product.findAll({
        where: {
          ProductId: user.UserId,
        },
      });
  
      if (existProduct.length > 0) {
        let productIds = existProduct.map(a => a.dataValues.ProductId);
        let productIdsDeleted = productIds.filter(id => !user.UserProductList.find(add => add.ProductId === id)?.ProductId)
        if (productIdsDeleted.length > 0)
          await Product.destroy({
            where: {
              ProductId: productIdsDeleted,
            },
          })
      }
  
      // inserted 
      const insertedP = user.UserProductList.filter(a => a.ProductId === 0)
      if (insertedP.length > 0)
        await Product.bulkCreate(insertedP)
  
      // updated
      const updatedP = user.UserProductList.filter(a => a.ProductId !== 0);
      if (updatedP.length > 0) {
        for (let item of updatedP) {
          const findP = await Product.findByPk(item.ProductId);
          await findP?.update(item);
        }
      }
  
      await t.commit();
  
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }

  async function last_insert_row_id() {
    const result = await db.query("SELECT COUNT(*) AS count FROM user", { type: QueryTypes.SELECT, });
    console.log(result);
    const res = result[0];
    return res;
  }

 export {
    createUser,
    getUserById,
    getUsers,
    deleteUser,
    updateUser,
    last_insert_row_id
 }