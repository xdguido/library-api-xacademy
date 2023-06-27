import { Book, Library } from '../models';
import type { LibraryTypes, BookTypes } from '../types';

const createBook = async (bookData: BookTypes) => {
    return await Book.create(bookData);
};

const getAll = async () => {
    return await Book.findAll();
};

const getOne = async (bookId: string) => {
    return await Book.findByPk(bookId);
};

const edit = async (bookData: BookTypes, bookId: string) => {
    return await Book.update(bookData, {
        where: { id: bookId }
    });
};

const remove = async (bookId: string) => {
    return await Book.destroy({
        where: { id: bookId }
    });
};

const restore = async (bookId: string) => {
    return await Book.restore({
        where: { id: bookId }
    });
};

export default { createBook, getAll, getOne, edit, remove, restore };
