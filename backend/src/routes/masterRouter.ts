import  express  from "express";
import db from "../dbConfig";

let masterRouter = express.Router();

masterRouter.route('/create').get(async (req, res) => {
    try {
        await db.sync({force: true});
        res.status(201).json({message: "Database created"});
        //res.send("Database created");
    } catch (err) {
        //res.send(err);
        console.warn(err);
        res.status(500).json({message: "Database creation failed"});
    }
});

export default masterRouter;