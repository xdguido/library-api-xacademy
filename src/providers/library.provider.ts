import { Book, Library } from '../models';
import type { LibraryTypes, BookTypes } from '../types';

const createLib = async (libraryData: LibraryTypes) => {
    return await Library.create(libraryData);
};

const getAll = async () => {
    return await Library.findAll({
        where: { deleted: false },
        include: Book
    });
};

const getOne = async (libId: string) => {
    return await Library.findByPk(libId, { include: Book });
};

const edit = async (libraryData: LibraryTypes, libId: string) => {
    return await Library.update(libraryData, {
        where: { id: libId },
        validate: true
    });
};

const remove = async (libId: string) => {
    return await Library.update(
        { deleted: true },
        {
            where: { id: libId },
            validate: true
        }
    );
};

const createBook = async (book: BookTypes, libId: string) => {
    const libIdToNumber = Number(libId);
    return await Book.create({ ...book, libId: libIdToNumber });
};

export default { createLib, getAll, getOne, edit, remove, createBook };
