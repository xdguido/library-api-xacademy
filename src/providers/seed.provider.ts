import { Attributes } from 'sequelize';
import { User, Library, Book, IUser, ILibrary, IBook } from '../models';

const createUsers = async (usersData: IUser[]) => {
    return await User.bulkCreate(usersData);
};

const createLibraries = async (librariesData: ILibrary[]) => {
    return await Library.bulkCreate(librariesData);
};

const createBooks = async (booksData: IBook[]) => {
    return await Book.bulkCreate(booksData);
};

export default { createUsers, createLibraries, createBooks };
