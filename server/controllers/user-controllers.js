import UserCollection from '../models/user-model.js'
import { BadRequest, NotFound } from '../errors/Errors.js'
import httpStatusCodes from '../utils/status-codes.js'
import PostsCollection from '../models/post-model.js'

const getMyProfile = async (req, res) => {
    const userId = req.user.userId;
    let user = await UserCollection.findOne({ _id: userId }).select('-password');
    if (!user)
        throw new NotFound('username does not exist in database');

    user = user.toObject();
    user.followersCount = user.followers.length;
    user.followingCount = user.following.length;
    user.isMyProfile = true;

    res.status(httpStatusCodes.OK).json({ success: true, user });
}

const getUserByUsername = async (req, res) => {
    const myUsername = req.user.username;
    const username = req.params.username;

    let user = await UserCollection.findOne({ username }).select('-password');
    if (!user)
        throw new NotFound('username does not exist in database');

    user = user.toObject();
    user.followersCount = user.followers.length;
    user.followingCount = user.following.length;
    user.isMyProfile = user.username === myUsername;
    user.followedByMe = user.followers.some((username) => username === myUsername);

    res.status(httpStatusCodes.OK).json({ success: true, user });
}


const getUserFollowers = async (req, res) => {
    const myUsername = req.user.username;
    const username = req.params.username;
    const user = await UserCollection.findOne({ username }).select('followers');
    if (!user)
        throw new NotFound('username does not exist in database');

    const { followers: followersUsernames } = user;

    let followersList = await UserCollection.find({ username: { $in: followersUsernames } }).select('displayName bio username followers');

    followersList = followersList.map((follower) => {
        follower = follower.toObject();
        follower.followedByMe = follower.followers.includes(myUsername);
        follower.inMyProfile = myUsername === username;
        follower.isMe = follower.username === myUsername;
        return follower;
    })


    res.status(httpStatusCodes.OK).json({ success: true, followers: followersList });
};

const getUserFollowing = async (req, res) => {
    const myUsername = req.user.username;
    const username = req.params.username;
    const user = await UserCollection.findOne({ username }).select('following');
    if (!user)
        throw new NotFound('username does not exist in database');

    const { following: followingUsernames } = user;

    let followingList = await UserCollection.find({ username: { $in: followingUsernames } }).select('displayName bio username following');


    followingList = followingList.map((following) => {
        following = following.toObject();
        following.followedByMe = following.following.includes(myUsername);
        following.inMyProfile = myUsername === username;
        following.isMe = following.username === myUsername;
        return following;
    })

    res.status(httpStatusCodes.OK).json({ success: true, following: followingList });
};


const updateProfile = async (req, res) => {
    const username = req.user.username;
    const { displayName, bio, location } = req.body;
    const updates = {};
    if (displayName)
        updates.displayName = displayName;

    if (bio)
        updates.bio = bio;

    if (location)
        updates.location = location;

    if (Object.keys(updates).length == 0)
        throw new BadRequest('No valid fields provided to update');

    await UserCollection.findOneAndUpdate({ username }, { $set: updates });

    res.status(httpStatusCodes.OK).json({ success: true });
}

const addFollow = async (req, res) => {
    const followedUsername = req.params.username;
    const followerUsername = req.user.username;
    if (followedUsername === followerUsername)
        throw new BadRequest('You can not follow yourself');

    const followedUser = await UserCollection.findOne({ username: followedUsername });

    if (!followedUser)
        throw new NotFound('User you try to follow not exists in database');

    await UserCollection.updateOne({ username: followedUsername }, { $addToSet: { followers: followerUsername } });
    await UserCollection.updateOne({ username: followerUsername }, { $addToSet: { following: followedUsername } });
    res.status(httpStatusCodes.CREATED).json({ success: true });
}

const removeFollow = async (req, res) => {
    const followedUsername = req.params.username;
    const followerUsername = req.user.username;

    if (followedUsername === followerUsername)
        throw new BadRequest('You can not unfollow yourself');

    const followedUser = await UserCollection.findOne({ username: followedUsername });
    if (!followedUser)
        throw new NotFound('User you try to unfollow not exists in database');

    await UserCollection.updateOne({ username: followedUsername }, { $pull: { followers: followerUsername } });
    await UserCollection.updateOne({ username: followerUsername }, { $pull: { following: followedUsername } });
    res.status(httpStatusCodes.OK).json({ success: true });
}

const searchUsers = async (req, res) => {
    const { query } = req.query;

    if (!query || !query.trim())
        return res.status(httpStatusCodes.OK).json({ success: true, users: [] });

    const users = await UserCollection.find({ username: { $regex: query, $options: "i" } }).select('-password');

    res.status(httpStatusCodes.OK).json({ success: true, users });
}

const getRecommendedUsers = async (req, res) => {
    const { username } = req.user;

    let users = await UserCollection.find();

    users = users.filter((user) => !user.followers.includes(username) && user.username !== username);

    if (users.length > 0)
        users.length = 1;

    res.status(httpStatusCodes.OK).json({ success: true, users });
}

const getUserBookmarks = async (req, res) => {
    const { username } = req.user;
    const { search } = req.query;


    const user = await UserCollection.findOne({ username });
    if (!user)
        throw new NotFound('User not exists in database');
    const { bookmarks } = user;
    let bookmarks_posts = await PostsCollection
        .find({
            _id: { $in: bookmarks.map((obj) => obj.postId) },
            caption: { $regex: search, $options: 'i' }
        })
        .populate('createdBy', 'username displayName');

    bookmarks_posts = bookmarks_posts.map((bookmark) => {
        bookmark = bookmark.toObject();
        bookmark.isBookmarked = true;
        bookmark.isMyPost = bookmark.createdBy.username === username;
        bookmark.likedByMe = bookmark.likes.includes(username);
        return bookmark;
    })


    res.status(httpStatusCodes.OK).json({ success: true, bookmarks: bookmarks_posts });
}

const addBookmark = async (req, res) => {
    const { username } = req.user;
    const { postId } = req.params;
    let post = await PostsCollection.findOne({ _id: postId });
    if (!post) throw new NotFound('post not found in db');
    const user = await UserCollection.findOneAndUpdate({ username }, { $addToSet: { bookmarks: { postId } } });
    if (!user) throw new NotFound('User not found in db');
    post = post.toObject();
    post.isBookmarked = true;
    post.isMyPost = post.createdBy.username === username;
    res.status(httpStatusCodes.OK).json({ success: true, bookmark: post });
}

const removeBookmark = async (req, res) => {
    const { username } = req.user;
    const { postId } = req.params;
    const user = await UserCollection.findOneAndUpdate({ username }, { $pull: { bookmarks: { postId } } });
    if (!user) throw new NotFound('User not found in db');
    res.status(httpStatusCodes.OK).json({ success: true });
}



export {
    updateProfile, addFollow, removeFollow, getUserByUsername, getMyProfile,
    getUserFollowers, getUserFollowing, searchUsers, getRecommendedUsers,
    getUserBookmarks, addBookmark, removeBookmark
}
