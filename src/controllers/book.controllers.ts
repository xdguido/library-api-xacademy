import { NextFunction, Request, Response } from 'express';
import { bookServices } from '../services';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const newBook = await bookServices.createBook(body);
        res.status(201).json(newBook);
    } catch (err) {
        next(err);
    }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await bookServices.getAll();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const book = await bookServices.getOne(bookId);
        res.json(book);
    } catch (err) {
        next(err);
    }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const { bookId } = req.params;
        const updatedLib = await bookServices.edit(body, bookId);
        res.json(updatedLib);
    } catch (err) {
        next(err);
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const success = await bookServices.remove(bookId);
        res.status(200).json(success);
    } catch (err) {
        next(err);
    }
};

const restore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const success = await bookServices.restore(bookId);
        res.status(200).json(success);
    } catch (err) {
        next(err);
    }
};

export default { getAll, getOne, edit, remove, restore, createBook };
