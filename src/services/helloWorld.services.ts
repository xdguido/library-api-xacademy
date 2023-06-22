import { User } from '../models';

const getUsers = async () => {
    return await User.findAll();
};

export default { getUsers };
