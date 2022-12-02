import Sequelize from 'sequelize'

export const sequelize = new Sequelize('railway', 'postgres', 'o8oivU1ZKOmPgv0SAFpw', {
    host: 'containers-us-west-123.railway.app',
    port: '5848',
    dialect: 'postgres'
  });

