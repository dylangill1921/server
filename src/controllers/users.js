import User from "../models/user.js";
import BadRequestError from "../errors/bad-request-error.js";

/**
 * @method POST
 * @path /users/signup
 */
export const signup = async (req, res) => {
    const { email, password } = req.body;

    // check if the email is already in use
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw new BadRequestError('Email in use!');
    }

    // create a new user
    const user = new User({email, password});
    await user.save();

    const authToken = user.generateJWT();

    // optional (session cookie)
    req.session = {
        authToken,
    }

    // token or user 
    res.status(201).json(user);

}