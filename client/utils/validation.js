const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const validateImage = (image) => {
    if (!allowedImageTypes.includes(image.type)) {
        return 'Image type is not allowed';
    }

    if (image.size > MAX_IMAGE_SIZE) {
        return 'Image size is more than 5 MB';
    }

    return null;
};


export { validateImage }
