import { Router } from 'express'
import { addLike, createPost, getUserPosts, removeLike, deletePost, getAllPosts, getPostReplies, getPost, getUserReplies, getUserLikes, getRecommendedPosts } from '../controllers/post-controllers.js'
import { addBookmark, getUserBookmarks, removeBookmark } from '../controllers/user-controllers.js';

const router = Router();

router.get('/', getAllPosts); 
router.get('/recommended-posts',getRecommendedPosts );
router.get('/bookmarks', getUserBookmarks);
router.patch('/:postId/save-bookmark', addBookmark);
router.patch('/:postId/unsave-bookmark', removeBookmark);
router.get('/:id', getPost); 
router.get('/profile/:username/posts', getUserPosts);
router.get('/profile/:username/replies', getUserReplies);
router.get('/profile/:username/likes', getUserLikes);
router.get('/:id/replies', getPostReplies); 
router.post('/', createPost); 
router.delete('/:id', deletePost); 
router.patch('/:id/like', addLike);
router.patch('/:id/unlike', removeLike);


export default router;
