const handleApiResponse = (res, status, message, data = null) => {
    const response = {
        status: status < 400 ? 'success' : 'fail',
        message,
        ...data, 
    };

    return res.status(status).json(response);
};

module.exports = { handleApiResponse };
