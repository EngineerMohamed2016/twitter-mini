import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const postSchema = new Schema({
  postType: {
    type: String,
    enum: ['post', 'reply'],
    required: true,
    default: 'post',
  },

  parentId: {
    type: Types.ObjectId,
    ref: 'posts',
    default: null,
  },

  caption: {
    type: String,
    maxlength: [1000, 'Post caption must be less than 1000 characters'],
    trim: true,
    default: '',
  },

  postImgUrl: {
    type: String,
    maxlength: [200, 'Post image URL must be less than 201 characters'],
    default: '',
  },

  likes: {
    type: [String],
    default: [],
  },
  commentsCount: {
    type: Number,
    default: 0
  },

  likesCount: {
    type: Number,
    default: 0
  },

  createdBy: {
    type: Types.ObjectId,
    required: [true, 'Please provide user ID'],
    ref: 'users',
  }

}, { timestamps: true });

export default model('posts', postSchema);
