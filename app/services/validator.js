const validateBody = (schema) => (request, response, next) => {
    const validatedBody = schema.validate(request.body);
    if (validatedBody.error) {
        response.status(400).json(validatedBody.error.details[0].message);
    } else {
        next();
    }
};

module.exports = validateBody;