import { Request, Response } from 'express';
import { libraryService } from '../services';

const createLib = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const newLib = await libraryService.createLib(body);
        res.status(201).json(newLib);
        debugger;
    } catch (err) {
        res.status(500).json({ action: 'createUser', error: err });
    }
};

const getAll = async (req: Request, res: Response) => {
    try {
        const libraries = await libraryService.getAll();
        res.json(libraries);
    } catch (err) {
        res.status(500).json({ action: 'getAll', error: err });
    }
};

const getOne = async (req: Request, res: Response) => {
    try {
        const { libId } = req.params;
        const library = await libraryService.getOne(libId);
        res.json(library);
    } catch (err) {
        res.status(500).json({ action: 'getOne', error: err });
    }
};

const edit = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { libId } = req.params;
        const updatedLib = await libraryService.edit(body, libId);
        res.json(updatedLib);
    } catch (err) {
        res.status(500).json({ action: 'edit', error: err });
    }
};

const remove = async (req: Request, res: Response) => {
    try {
        const { libId } = req.params;
        const removedLib = await libraryService.remove(libId);
        res.status(204).json(removedLib);
    } catch (err) {
        res.status(500).json({ action: 'remove', error: err });
    }
};

const createBook = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { libId } = req.params;
        const newBook = await libraryService.createBook(body, libId);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ action: 'createBook', error: err });
    }
};

export default { createLib, getAll, getOne, edit, remove, createBook };
