import { User, Library, Book } from '../models';
import type { LibraryTypes, BookTypes, UserTypes } from '../types';

const createUsers = async (usersData: UserTypes[]) => {
    return await User.bulkCreate(usersData);
};

const createLibraries = async (librariesData: LibraryTypes[]) => {
    return await Library.bulkCreate(librariesData);
};

const createBooks = async (booksData: BookTypes[]) => {
    return await Book.bulkCreate(booksData);
};

export default { createUsers, createLibraries, createBooks };
