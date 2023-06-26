import { ErrorCode, Exception } from '../lib/exception';
import { libraryProvider } from '../providers';
import type { LibraryTypes, BookTypes } from '../types';

const createLib = async (libraryData: LibraryTypes) => {
    return await libraryProvider.createLib(libraryData);
};

const getAll = async () => {
    return await libraryProvider.getAll();
};

const getOne = async (libId: string) => {
    const library = await libraryProvider.getOne(libId);
    if (library) {
        return library;
    } else {
        throw new Exception(ErrorCode.NotFound, { message: 'Library not found' });
    }
};

const edit = async (libraryData: LibraryTypes, libId: string) => {
    const [affectedRows] = await libraryProvider.edit(libraryData, libId);
    if (affectedRows === 1) {
        return await libraryProvider.getOne(libId);
    } else {
        throw new Exception(ErrorCode.NotFound, { message: 'Library not found' });
    }
};

const remove = async (libId: string) => {
    const deletedLibrary = await libraryProvider.remove(libId);
    if (deletedLibrary) {
        return { message: 'Library deleted successfully' };
    } else {
        throw new Exception(ErrorCode.NotFound, { message: 'Library not found' });
    }
};

const createBook = async (book: BookTypes, libId: string) => {
    const library = await libraryProvider.getOne(libId);
    if (library) {
        return await libraryProvider.createBook(book, libId);
    } else {
        throw new Exception(ErrorCode.NotFound, { message: 'Library not found' });
    }
};

export default { createLib, getAll, getOne, edit, remove, createBook };
