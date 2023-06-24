import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes
} from 'sequelize';
import { sequelize } from '../config/db';

export interface IUser {
    id?: CreationOptional<number>;
    username: string;
    password: string;
}

interface UserModel
    extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
        IUser {}

export const User = sequelize.define<UserModel, IUser>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
