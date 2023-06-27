import { ErrorCode, Exception } from '../lib/exception';
import { bookProvider } from '../providers';
import type { LibraryTypes, BookTypes } from '../types';

const createBook = async (bookData: BookTypes) => {
    return await bookProvider.createBook(bookData);
};

const getAll = async () => {
    return await bookProvider.getAll();
};

const getOne = async (bookId: string) => {
    const book = await bookProvider.getOne(bookId);
    if (book) {
        return book;
    } else {
        throw new Exception(ErrorCode.NotFound, { message: 'Book not found' });
    }
};

const edit = async (bookData: BookTypes, bookId: string) => {
    const [affectedRows] = await bookProvider.edit(bookData, bookId);
    if (affectedRows === 1) {
        return await bookProvider.getOne(bookId);
    } else {
        throw new Exception(ErrorCode.NotFound, { message: 'Book not found' });
    }
};

const remove = async (bookId: string) => {
    const deletedBook = await bookProvider.remove(bookId);
    if (deletedBook) {
        return { message: 'Book deleted successfully' };
    } else {
        throw new Exception(ErrorCode.NotFound, { message: 'Book not found' });
    }
};

const restore = async (bookId: string) => {
    await bookProvider.restore(bookId);
    const book = await bookProvider.getOne(bookId);
    if (book) {
        return { message: 'Book restored successfully' };
    } else {
        throw new Exception(ErrorCode.NotFound, { message: 'Book not found' });
    }
};

export default { createBook, getAll, getOne, edit, remove, restore };
