
import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'

export const Product = sequelize.define('products',{
    code:{
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    }
})