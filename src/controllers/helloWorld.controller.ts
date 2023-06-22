import { Request, Response } from 'express';
import { helloWorldServices } from '../services';

const helloWorld = async (req: Request, res: Response) => {
    res.send('<h1>Hello World</h1>');
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await helloWorldServices.getUsers();
        res.json(users);
    } catch (err) {
        debugger;
        res.status(500).json({ action: 'getUsers', error: err });
    }
};

export default { helloWorld, getUsers };
