import httpStatusCodes from '../utils/status-codes.js'

const notFound = (req, res, next) => {
    res.status(httpStatusCodes.NOT_FOUND).json({ success: false, message: `Route: ${req.originalUrl} not found` });
}

export default notFound