import * as dotenv from 'dotenv'
dotenv.config()

import app from "./app.js";
import { sequelize } from './database/database.js';
//import './models/Product.js'; 
//import './models/Bill.js'; 




async function main() {
    try {
        await sequelize.sync({alter: true});
        app.listen(4000, () => {
            console.log("Listen on port 4000")
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();