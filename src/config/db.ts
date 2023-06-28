import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

export const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');
        await sequelize.sync({ force: false });
    } catch (err) {
        console.error('Error while connecting Database', err);
    }
};
