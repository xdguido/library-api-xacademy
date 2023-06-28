import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../config/db';
import { UserTypes } from '../types';

interface UserModel
    extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
        UserTypes {}

export const User = sequelize.define<UserModel, UserTypes>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
