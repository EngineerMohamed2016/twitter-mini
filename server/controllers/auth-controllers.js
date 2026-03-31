import UserCollection from '../models/user-model.js'
import { Unauthenticated } from '../errors/Errors.js'
import httpStatusCodes from '../utils/status-codes.js'

const register = async (req, res) => {
    const { displayName } = req.body;
    let isFound = true;
    let username = '';

    while (isFound) {
        username = `${displayName}${Math.floor(Math.random() * 1000000)}`;
        username = username.split(' ').join('');
        isFound = await UserCollection.exists({ username });
    }

    await UserCollection.create({ ...req.body, username });
    res.status(httpStatusCodes.CREATED).json({ success: true });
}


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        throw new Unauthenticated("Provide your email and password");

    const user = await UserCollection.findOne({ email });
    
    if (!user)
        throw new Unauthenticated("Not registered");

    const isPasswordCorrect = await user.comparePasswords(password);

    if (!isPasswordCorrect)
        throw new Unauthenticated("Invalid email or password");
    
    const token = await user.createToken();
    res.status(httpStatusCodes.OK).json({ success: true, token });
}


export { register, login }