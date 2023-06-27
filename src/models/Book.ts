import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../config/db';
import { Library } from './Library';
import { BookTypes } from '../types';

interface BookModel
    extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>>,
        BookTypes {}

export const Book = sequelize.define<BookModel, BookTypes>(
    'Book',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        isbn: { type: DataTypes.INTEGER, allowNull: true, unique: true },
        title: { type: DataTypes.STRING, allowNull: false },
        author: { type: DataTypes.STRING, allowNull: false },
        year: { type: DataTypes.STRING, allowNull: false }
    },
    // paranoid tables allow us to soft-delete records
    { paranoid: true }
);

// Create One-to-Many association with foreign key in Book model.
Library.hasMany(Book, { foreignKey: 'libId' });
Book.belongsTo(Library, { foreignKey: 'libId' });
