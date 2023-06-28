import { User } from '../models';
import type { UserTypes } from '../types';

const getUser = async (username: string) => {
    return await User.findOne({ where: { username } });
};

const createUser = async (usersData: UserTypes) => {
    return await User.create(usersData);
};

export default { getUser, createUser };
