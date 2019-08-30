const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = mongoose.model("users");
const keys = require("../../../config/keys").secretOrKey;

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const register = async data => {
    try {
        const { message, isValid } = validateRegisterInput(data);

        if (!isValid) {
            throw new Error(message);
        }

        const { firstName, lastName, username, email, password } = data;

        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        
        if (existingEmail) {
            throw new Error("This email already exists");
        }

        if (existingUsername) {
            throw new Error("This username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User(
            {
                firstName,
                lastName,
                username,
                email,
                password: hashedPassword
            },
            err => {
                if (err) throw err;
            }
        );

        user.save();

        const token = jwt.sign({ id: user._id }, keys);

        return { token, loggedIn: true, ...user._doc, password: null };
    } catch (err) {
        throw err;
    }
};

const logout = async data => {
    try {
        const { _id } = data;

        const user = await User.findById(_id);
        if (!user) throw new Error("This user does not exist");

        const token = "";

        return { token, loggedIn: false, ...user._doc, password: null };
    } catch (err) {
        throw err;
    }
};

const login = async data => {
    try {
        const { message, isValid } = validateLoginInput(data);

        if (!isValid) {
            throw new Error(message);
        }

        const { email, password } = data;

        const user = await User.findOne({ email });
        if (!user) throw new Error("This user does not exist");

        const isValidPassword = await bcrypt.compareSync(password, user.password);
        if (!isValidPassword) throw new Error("Invalid password");

        const token = jwt.sign({ id: user.id }, keys);

        return { token, loggedIn: true, ...user._doc, password: null };
    } catch (err) {
        throw err;
    }
};

const verifyUser = async data => {
    try {
        const { token } = data;
        const decoded = jwt.verify(token, keys);
        const { id } = decoded;

        const loggedIn = await User.findById(id).then(user => {
            return user ? true : false;
        });

        return { loggedIn };
    } catch (err) {
        return { loggedIn: false };
    }
};

module.exports = { register, login, logout, verifyUser };