import { BadRequest, NotFound } from '../errors/Errors.js'
import PostsCollection from '../models/post-model.js'
import UserCollection from '../models/user-model.js'
import httpStatusCodes from '../utils/status-codes.js'

const getAllPosts = async (req, res) => {
    const myUsername = req.user.username;
    let postsList = await PostsCollection.find({ postType: 'post' }).sort({ createdAt: -1 }).populate('createdBy', 'displayName username');

    postsList = postsList.map((post) => {
        post = post.toObject();
        post.likedByMe = post.likes.some((username) => username === myUsername);
        post.isMyPost = post.createdBy.username === myUsername;
        return post;
    })

    res.status(httpStatusCodes.OK).json({ success: true, posts: postsList });
}

const getPost = async (req, res) => {
    const { username: myUsername } = req.user;
    const postId = req.params.id;
    let post = await PostsCollection.findOne({ _id: postId }).populate('createdBy', 'displayName username');
    if (!post)
        throw new NotFound('Post not exists in database');
    post = post.toObject();
    post.likedByMe = post.likes.some((user_name) => user_name === myUsername);
    post.isMyPost = post.createdBy.username === myUsername;

    res.status(httpStatusCodes.OK).json({ success: true, post });
}

const getUserPosts = async (req, res) => {
    const myUsername = req.user.username;
    const username = req.params.username;
    const user = await UserCollection.findOne({ username });
    if (!user) throw new NotFound('user not found in db');
    let posts = await PostsCollection.find({ createdBy: user._id, postType: 'post' }).populate('createdBy', 'username displayName').sort('-createdAt');

    posts = posts.map((post) => {
        post = post.toObject();
        post.likedByMe = post.likes.includes(myUsername);
        post.isMyPost = post.createdBy.username === myUsername;
        return post;
    })

    res.status(httpStatusCodes.OK).json({ success: true, posts });
}

const getUserReplies = async (req, res) => {
    const myUsername = req.user.username;
    const username = req.params.username;
    const user = await UserCollection.findOne({ username });
    if (!user) throw new NotFound('user not found in db');
    let replies = await PostsCollection.find({ createdBy: user._id, postType: 'reply' }).populate('createdBy', 'username displayName').sort('-createdAt');

    replies = replies.map((reply) => {
        reply = reply.toObject();
        reply.likedByMe = reply.likes.includes(myUsername);
        reply.isMyPost = reply.createdBy.username === myUsername;
        return reply;
    })

    res.status(httpStatusCodes.OK).json({ success: true, replies });
}


const getUserLikes = async (req, res) => {
    const myUsername = req.user.username;
    const username = req.params.username;

    const user = await UserCollection.findOne({ username });
    if (!user) throw new NotFound('User not found in DB');

    // Get all posts with creator info
    let posts = await PostsCollection.find()
        .populate('createdBy', 'username displayName')
        .sort('-createdAt');

    // Filter posts liked by the specified user and add extra info
    posts = posts
        .filter(post => post.likes.includes(username))
        .map(post => {
            const postObj = post.toObject();
            postObj.likedByMe = postObj.likes.includes(myUsername);
            postObj.isMyPost = postObj.createdBy.username === myUsername;
            return postObj;
        });

    res.status(httpStatusCodes.OK).json({ success: true, posts });

};


const getPostReplies = async (req, res) => {
    const { username: myUsername, userId } = req.user;
    const postId = req.params.id;
    let repliesList = await PostsCollection.find({ parentId: postId }).sort({ createdAt: -1 }).populate('createdBy', 'displayName username');
    repliesList = repliesList.map((replyObj) => {
        replyObj = replyObj.toObject();
        replyObj.likedByMe = replyObj.likes.some((username) => username === myUsername);
        replyObj.isMyPost = replyObj.createdBy._id.toString() === userId;

        return replyObj;
    })

    res.status(httpStatusCodes.OK).json({ success: true, replies: repliesList });
}


const createPost = async (req, res) => {
    const { username } = req.user;
    const { postType, parentId } = req.body;
    if (postType === 'reply') {
        const post = await PostsCollection.findOne({ _id: parentId });
        if (!post)
            throw new BadRequest('Parent post not exists in Database');
    }

    let post = await PostsCollection.create({ ...req.body, createdBy: req.user.userId });
    if (postType === 'reply')
        post = await PostsCollection.findOneAndUpdate({ _id: parentId }, { $inc: { commentsCount: 1 } }, { new: true, runValidators: true })
    post = post.toObject();
    post.likedByMe = post.likes.includes(username);
    res.status(httpStatusCodes.CREATED).json({ success: true, post })
}

const deletePost = async (req, res) => {
    const userId = req.user.userId;
    const postId = req.params.id;
    const post = await PostsCollection.findOneAndDelete({ _id: postId, createdBy: userId });
    if (!post)
        throw new NotFound(`Post with id: ${postId} not exists in Database`);
    await PostsCollection.deleteMany({ parentId: postId, });
    res.status(httpStatusCodes.OK).json({ success: true });
}

const addLike = async (req, res) => {
    const username = req.user.username;
    const postId = req.params.id;
    let post = await PostsCollection.findOne({ _id: postId });
    if (!post)
        throw new NotFound('Post not exists in database');

    post = post.toObject();

    if (post.likes.includes(username))
        throw new BadRequest('You already liked this post')

    post = await PostsCollection.findOneAndUpdate({ _id: postId }, { $addToSet: { likes: username }, $inc: { likesCount: 1 } }, { new: true, runValidators: true });
    post = post.toObject();
    post.likedByMe = true;
    res.status(httpStatusCodes.OK).json({ success: true, post });
}

const removeLike = async (req, res) => {
    const username = req.user.username;
    const postId = req.params.id;

    const post = await PostsCollection.findOneAndUpdate(
        {
            _id: postId,
            likes: username
        },
        {
            $pull: { likes: username },
            $inc: { likesCount: -1 }
        },
        { new: true }
    );

    if (!post)
        throw new BadRequest('You already not liked this post');

    post.likedByMe = false;
    res.status(httpStatusCodes.OK).json({ success: true, post });
}

const getRecommendedPosts = async (req, res) => {
    const { username } = req.user;
    let posts = await PostsCollection.find({ postType: 'post' }).populate('createdBy', 'username displayName');
    posts = posts.filter((post) => post.createdBy.username !== username);
    posts = posts.map((post) => {
        post = post.toObject();
        post.likedByMe = post.likes.includes(username);
        return post;
    }).sort((post1, post2) => post2.likesCount - post1.likesCount)



  if (posts.length > 2)
        posts.length = 2;
  res.status(httpStatusCodes.OK).json({ success: true, posts });
}
export { getAllPosts, getPost, getPostReplies, createPost, deletePost, addLike, removeLike, getUserPosts, getUserReplies, getUserLikes, getRecommendedPosts }
