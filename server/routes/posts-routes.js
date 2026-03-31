import { Router } from 'express'
import { addLike, createPost, getUserPosts, removeLike, deletePost, getAllPosts, getPostReplies, getPost, getUserReplies, getUserLikes, getRecommendedPosts } from '../controllers/post-controllers.js'
import { addBookmark, getUserBookmarks, removeBookmark } from '../controllers/user-controllers.js';

const router = Router();

router.get('/', getAllPosts); // feed page
router.get('/recommended-posts',getRecommendedPosts );
router.get('/bookmarks', getUserBookmarks);
router.patch('/:postId/save-bookmark', addBookmark);
router.patch('/:postId/unsave-bookmark', removeBookmark);
router.get('/:id', getPost); // get post
router.get('/profile/:username/posts', getUserPosts);
router.get('/profile/:username/replies', getUserReplies);
router.get('/profile/:username/likes', getUserLikes);
router.get('/:id/replies', getPostReplies); // get replies for each post
router.post('/', createPost); // create post || reply
router.delete('/:id', deletePost); // deltet post || reply
router.patch('/:id/like', addLike);
router.patch('/:id/unlike', removeLike);


export default router;
