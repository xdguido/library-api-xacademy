import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes
} from 'sequelize';
import { sequelize } from '../config/db';
import { Library } from './Library';

export interface IBook {
    id?: CreationOptional<number>;
    isbn?: CreationOptional<number>;
    title: string;
    author: string;
    year: string;
    deleted?: CreationOptional<boolean>;
    libId?: CreationOptional<number>;
}

interface BookModel
    extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>>,
        IBook {}

export const Book = sequelize.define<BookModel, IBook>('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isbn: { type: DataTypes.INTEGER, allowNull: true, unique: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.STRING, allowNull: false },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

// Create One-to-Many association with foreign key in Book model.
// We save the return values of the association setup calls to use them later.
Library.hasMany(Book, { foreignKey: 'libId' });
Book.belongsTo(Library, { foreignKey: 'libId' });
