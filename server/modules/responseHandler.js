const handleApiResponse = (res, status, Message, data = null, error = null) => {
    const response = {
        Status: status < 400 ? 'success' : 'fail',
        Message,
        ...data, 
    };

    return res.status(status).json(response);
};

module.exports = { handleApiResponse };
