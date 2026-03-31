import { Router } from 'express'
import {
    updateProfile, addFollow, removeFollow, getUserByUsername, getMyProfile,
    getUserFollowers, getUserFollowing, searchUsers,
    getRecommendedUsers
} from '../controllers/user-controllers.js'

const router = Router();


router.get('/me', getMyProfile);
router.get('/search', searchUsers);
router.get('/recommended-users', getRecommendedUsers);
router.patch('/profile', updateProfile);
router.get('/:username', getUserByUsername);
router.get('/:username/followers', getUserFollowers);
router.get('/:username/following', getUserFollowing);
router.patch('/:username/follow', addFollow);
router.patch('/:username/unfollow', removeFollow);

export default router