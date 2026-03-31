'use client'
import { addFollow, removeFollow } from '@/actions/user';
import { displayError } from '@/utils/displayError';

const useFollow = (username) => {
    const handleFollow = async () => {
        const { success, errorMsg } = await addFollow(username);
        if (!success)
            displayError(errorMsg, 'add follow');
    }

    const handleUnfollow = async () => {
        const { success, errorMsg } = await removeFollow(username);
        if (!success) displayError(errorMsg, 'remove follow');

    }

    return { handleFollow, handleUnfollow }
}

export default useFollow