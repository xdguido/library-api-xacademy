import { IBook, ILibrary } from '../models';
import { libraryProvider } from '../providers';

const createLib = async (library: ILibrary) => {
    return await libraryProvider.createLib(library);
};

const getAll = async () => {
    return await libraryProvider.getAll();
};

const getOne = async (libId: string) => {
    return await libraryProvider.getOne(libId);
};

const edit = async (library: ILibrary, libId: string) => {
    const [affectedRows] = await libraryProvider.edit(library, libId);
    if (affectedRows === 1) {
        return await libraryProvider.getOne(libId);
    } else {
        return null;
    }
};

const remove = async (libId: string) => {
    const deletedLibrary = await libraryProvider.remove(libId);
    if (deletedLibrary) {
        return { message: 'Library deleted successfully' };
    } else {
        return null;
    }
};

const createBook = async (book: IBook, libId: string) => {
    const library = await libraryProvider.getOne(libId);
    if (library) {
        return await libraryProvider.createBook(book, libId);
    }
    return null;
};

export default { createLib, getAll, getOne, edit, remove, createBook };
