import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../config/db';
import type { LibraryTypes } from '../types';

interface LibraryModel
    extends Model<InferAttributes<LibraryModel>, InferCreationAttributes<LibraryModel>>,
        LibraryTypes {}

export const Library = sequelize.define<LibraryModel, LibraryTypes>(
    'Library',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false }
    },
    // paranoid tables allow us to soft-delete records
    { paranoid: true }
);
