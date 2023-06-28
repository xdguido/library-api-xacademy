import { User } from '../models';
import type { UserTypes } from '../types';

const getUser = async (username: string) => {
    return await User.findOne({ where: { username } });
};

export default { getUser };
