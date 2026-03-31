import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
    displayName: {
        type: String,
        required: [true, 'Please provide display name'],
        minlength: [3, 'Display name must be at least 3 characters'],
        maxlength: [30, 'Display name must be less than 31 characters'],
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Please provide an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Please provide username'],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [40, 'Username must be less than 41 characters'],
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [6, 'Password must be at least 6 characters'],
        maxlength: [20, 'Password must be less than 21 characters'],
    },
    followers: {
        type: [String],
        default: [],
    },

    following: {
        type: [String],
        default: [],
    },

    bookmarks: {
        type: [
            {
                postId: { type: Types.ObjectId, ref: 'posts', required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        default: [],
    },

    birthDate: {
        type: Date,
        required: [true, 'Please provide your birth date']
    },

    bio: {
        type: String,
        maxlength: [200, 'Bio must be less than 201 characters'],
        default: '',
    },
    location: {
        type: String,
        maxlength: [100, 'Location must be less than 101 characters'],
        default: '',
    },
}, { timestamps: true });


userSchema.pre('save', async function () {
    if (!this.isModified('password'))
        return;
    const saltKey = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltKey);
});


userSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password);
}


userSchema.methods.createToken = function () {
    return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: '3d' });
}




export default model('users', userSchema)
