import { NextFunction, Request, Response } from 'express';
import { libraryService } from '../services';

const createLib = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const newLib = await libraryService.createLib(body);
        res.status(201).json(newLib);
    } catch (err) {
        next(err);
    }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const libraries = await libraryService.getAll();
        res.json(libraries);
    } catch (err) {
        next(err);
    }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { libId } = req.params;
        const library = await libraryService.getOne(libId);
        res.json(library);
    } catch (err) {
        next(err);
    }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const { libId } = req.params;
        const updatedLib = await libraryService.edit(body, libId);
        res.json(updatedLib);
    } catch (err) {
        next(err);
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { libId } = req.params;
        const removedLib = await libraryService.remove(libId);
        res.status(200).json(removedLib);
    } catch (err) {
        next(err);
    }
};

const restore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { libId } = req.params;
        const removedLib = await libraryService.restore(libId);
        res.status(200).json(removedLib);
    } catch (err) {
        next(err);
    }
};

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const { libId } = req.params;
        const newBook = await libraryService.createBook(body, libId);
        res.status(201).json(newBook);
    } catch (err) {
        next(err);
    }
};

export default { createLib, getAll, getOne, edit, remove, restore, createBook };
