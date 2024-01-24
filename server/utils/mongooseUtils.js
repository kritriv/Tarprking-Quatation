const transformToJSON = (schema, dynamicId) => {
    schema.set('toJSON', {
        transform(doc, ret) {
            const transformedObject = { [dynamicId]: ret._id, ...ret };
            delete transformedObject._id;
            delete transformedObject.__v;
            return transformedObject;
        },
    });
};

module.exports = { transformToJSON };
