import { Unauthenticated } from '../errors/Errors.js'
import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new Unauthenticated('Provide a valid authentication header')

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { userId: id, username };
        next();
    } catch (e) {
        throw new Unauthenticated('Invalid email or password');
    }
}

export default verifyToken