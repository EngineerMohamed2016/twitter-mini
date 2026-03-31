'use server'

import { revalidateTag } from "next/cache";
import { requireAuth } from "./auth";


const getMyProfile = async () => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}users/me`;
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: `Failed to get user info due to ${fetchedData.errorMsg || 'error'}` }
    return fetchedData;
}

const getUserByUsername = async (username) => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}users/${username}`;
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        },
        next: { tags: ['user'] }
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: `Failed to get user info due to ${fetchedData.errorMsg || 'error'}` }
    return fetchedData;
}

const getUserFollowers = async (username) => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}users/${username}/followers`;
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: `Failed to get user followers due to ${fetchedData.errorMsg || 'error'}` }
    return fetchedData;
}

const getUserFollowing = async (username) => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}users/${username}/following`;
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: `Failed to get user followers due to ${fetchedData.errorMsg || 'error'}` }
    return fetchedData;
}

const addFollow = async (username) => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}users/${username}/follow`;
    const res = await fetch(api, {
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: `Failed to follow ${username} due to ${fetchedData.errorMsg || 'error'}` }

    revalidateTag('user', 'max');
    // revalidatePath('reco','max')
    return fetchedData;
}

const removeFollow = async (username) => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}users/${username}/unfollow`;
    const res = await fetch(api, {
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: `Failed to unfollow ${username} due to ${fetchedData.errorMsg || 'error'}` }

    revalidateTag('user', 'max');
    // revalidateTag('reco','max')

    return fetchedData;
}

const editProfile = async (_, formData) => {
    const jwt = await requireAuth();
    const displayName = formData.get('displayName');
    const bio = formData.get('bio');
    const location = formData.get('location');

    if (!displayName)
        return { resObj: { success: false, errorMsg: 'Provide a display name' } };

    const payload = {
        displayName,
        bio,
        location
    }

    try {
        const api = `${process.env.API_URL}users/profile`;
        const res = await fetch(api, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + jwt
            },
            body: JSON.stringify(payload)
        });

        const fetchedData = await res.json();

        if (!res.ok)
            return { resObj: { success: false, errorMsg: fetchedData.errorMsg || 'Something went wrong at server' } };

        revalidateTag('user', 'max');

        return { resObj: fetchedData }

    } catch (e) {
        return { resObj: { success: false, errorMsg: 'Check your internet or try again later' } }
    }
}

const searchUsers = async (search) => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}users/search?query=${search}`;
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        },
    });

    const fetchedData = await res.json();

    if (!res.ok)
        return { success: false, errorMsg: fetchedData.errorMsg || 'Something went wrong at server' };

    return fetchedData
}

const getRecommendedUsers = async () => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}users/recommended-users`;
    
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        },
        next: { tags: ['reco'] }
    });

    const fetchedData = await res.json();

    if (!res.ok)
        return { success: false, errorMsg: fetchedData.errorMsg || 'Something went wrong at server' };

    return fetchedData
}


export {
    getUserByUsername, getMyProfile, getUserFollowers, getUserFollowing, addFollow,
    removeFollow, editProfile, searchUsers, getRecommendedUsers
}