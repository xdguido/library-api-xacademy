import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes
} from 'sequelize';
import { sequelize } from '../config/db';

export interface ILibrary {
    id?: CreationOptional<number>;
    name: string;
    location: string;
    phone: string;
    deleted?: CreationOptional<boolean>;
}

interface LibraryModel
    extends Model<InferAttributes<LibraryModel>, InferCreationAttributes<LibraryModel>>,
        ILibrary {}

export const Library = sequelize.define<LibraryModel, ILibrary>('Library', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
