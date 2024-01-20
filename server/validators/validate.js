const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        let message = 'Validation error';
        if (err.errors && err.errors.length > 0) {
            message = err.errors[0].message;
        }
        res.status(400).json({ Message: message });
    }
};

module.exports = validate;
 
