'use server'

import { requireAuth } from '@/actions/auth';
import { validateImage } from "@/utils/validation";
import { revalidateTag } from 'next/cache';
import { redirect } from "next/navigation";


const fetchPosts = async () => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}posts`

    const res = await fetch(api, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        next: { tags: ['posts'] }
    });

    if (!res.ok)
        redirect('/login');

    const fetchedData = await res.json();
    return fetchedData
}

const uploadImage = async (image) => {
    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'My_first_config_for_uploading');

    const api = 'https://api.cloudinary.com/v1_1/dclfhxskj/image/upload';
    const res = await fetch(api, {
        method: 'POST',
        body: imageData,
        headers: {
            Authorization: 'Basic ' + Buffer.from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`).toString('base64')
        }
    });

    const uploadedImageInfo = await res.json();

    return uploadedImageInfo
}

const createPost = async (formData) => {
    const jwt = await requireAuth();

    let postImgUrl = '';

    const image = formData.get('image');

    if (image) {
        const imageError = validateImage(image);

        if (imageError)
            return { success: false, errorMsg: imageError };

        const uploadedImageInfo = await uploadImage(image);
        if (uploadedImageInfo.error)
            return { success: false, errorMsg: `Failed to upload the image due to: ${uploadedImageInfo.error.message}` };

        postImgUrl = uploadedImageInfo.secure_url;
    }

    const caption = formData.get('caption');
    const postType = formData.get('postType');
    const parentId = formData.get('parentId') || null;

    const payload = {
        caption,
        postImgUrl,
        postType,
        parentId
    };

    const api = `${process.env.API_URL}posts`
    const res = await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(payload)
    });

    const post = await res.json();

    revalidateTag('posts', 'max');
    return post;
};

const addLike = async (postId) => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}posts/${postId}/like`
    const res = await fetch(api, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
    });

    const fetchedData = await res.json();


    if (!res.ok)
        return { success: false, errorMsg: `Failed to like the post due to ${fetchedData.errorMsg || 'error'}` }

    revalidateTag('posts', 'max');
    // revalidateTag('user-posts', 'max');
    return fetchedData
}

const removeLike = async (postId) => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}posts/${postId}/unlike`;
    const res = await fetch(api, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
    });

    const fetchedData = await res.json();


    if (!res.ok)
        return { success: false, errorMsg: `Failed to dislike the post due to ${fetchedData.errorMsg || 'error'}` }

    revalidateTag('posts', 'max');
    revalidateTag('user-posts', 'max');
    return fetchedData
}

const deletePost = async (postId) => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}posts/${postId}`
    const res = await fetch(api, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
    });

    const fetchedData = await res.json();


    if (!res.ok)
        return { success: false, errorMsg: `Failed to delete the post due to ${fetchedData.errorMsg || 'error'}` };

    revalidateTag('posts', 'max');
    revalidateTag('user-posts', 'max');
    return fetchedData;
}

const fetchPost = async (postId) => {
    const jwt = await requireAuth();
    const api = `${process.env.API_URL}posts/${postId}`;
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: `Failed to fetch the post due to ${fetchedData.errorMsg || 'error'}` };

    return fetchedData;
}

const fetchPostReplies = async (postId) => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}posts/${postId}/replies`
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: fetchedData.errorMsg || 'error' };

    return fetchedData;
}

const fetchUserPosts = async (username) => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}posts/profile/${username}/posts`
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        },
        next: { tags: ['user-posts'] }
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: fetchedData.errorMsg || 'error' };

    return fetchedData;
}

const fetchUserReplies = async (username) => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}posts/profile/${username}/replies`;
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        },
        next: { tags: ['user-posts'] }
    });

    const fetchedData = await res.json();
    if (!res.ok)
        return { success: false, errorMsg: fetchedData.errorMsg || 'error' };

    return fetchedData;
}

const fetchUserLikes = async (username) => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}posts/profile/${username}/likes`
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        },
        next: { tags: ['user-posts'] }
    });

    const fetchedData = await res.json();

    if (!res.ok)
        return { success: false, errorMsg: fetchedData.errorMsg || 'error' };


    return fetchedData;
}

const getRecommendedPosts = async (username) => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}posts/recommended-posts`
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwt
        },
        next: { tags: ['reco'] }
    });

    const fetchedData = await res.json();

    if (!res.ok)
        return { success: false, errorMsg: fetchedData.errorMsg || 'error' };


    return fetchedData;
}

const getUserBookmarks = async (search) => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}posts/bookmarks?search=${search}`;
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

const addBookmark = async (postId) => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}posts/${postId}/save-bookmark`;
    const res = await fetch(api, {
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + jwt
        },
    });

    const fetchedData = await res.json();

    if (!res.ok)
        return { success: false, errorMsg: fetchedData.errorMsg || 'Something went wrong at server' };
    revalidateTag('bookmarks', 'max')
    return fetchedData
}

const removeBookmark = async (postId) => {
    const jwt = await requireAuth();

    const api = `${process.env.API_URL}posts/${postId}/unsave-bookmark`;
    const res = await fetch(api, {
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + jwt
        },
    });

    const fetchedData = await res.json();

    if (!res.ok)
        return { success: false, errorMsg: fetchedData.errorMsg || 'Something went wrong at server' };
    revalidateTag('bookmarks', 'max');
    return fetchedData
}

export {
    fetchPosts, uploadImage, createPost, addLike, removeLike, deletePost,
    fetchPost, fetchPostReplies, fetchUserPosts, fetchUserReplies, fetchUserLikes, getRecommendedPosts
    , getUserBookmarks, addBookmark, removeBookmark
}