import { Book, Library, IBook, ILibrary } from '../models';

const createLib = async (library: ILibrary) => {
    return await Library.create(library);
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

const edit = async (library: ILibrary, libId: string) => {
    return await Library.update(library, {
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

const createBook = async (book: IBook, libId: string) => {
    const libIdToNumber = Number(libId);
    return await Book.create({ ...book, libId: libIdToNumber });
};

export default { createLib, getAll, getOne, edit, remove, createBook };
