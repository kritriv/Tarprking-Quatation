const handleApiResponse = (res, status, message, data = null, error = null) => {
    const response = {
        success: status < 400 ? 'true' : 'false',
        message,
        ...data, 
    };

    return res.status(status).json(response);
};

module.exports = { handleApiResponse };
