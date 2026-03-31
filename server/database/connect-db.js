import mongoose from 'mongoose';
export default function connect(uri) {
    return mongoose.connect(uri);
}

