import {DataTypes} from 'sequelize'
import { sequelize } from '../database/database.js'

export const Bill = sequelize.define('bills',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    items:{
        type: DataTypes.JSONB,
        allowNull: false
    },
    total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
})