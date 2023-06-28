import jwt from 'jsonwebtoken';
import { ErrorCode, Exception } from '../lib/exception';
import type { UserTypes } from '../types';
import { userProvider } from '../providers';
import { SERVER_SECRET } from '../middleware/auth.middleware';

const login = async (userData: UserTypes) => {
    const { username, password } = userData;
    const user = await userProvider.getUser(username);

    // if password is hashed, compare with hash
    if (user && user.password === password) {
        const token = jwt.sign({ username: user.username }, SERVER_SECRET, { expiresIn: '24h' });
        return token;
    }

    throw new Exception(ErrorCode.Forbidden, { message: 'Invalid username or password' });
};

export default { login };
