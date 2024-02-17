const limitOffsetPageNumber = (page, size) => {
    const limit = size ? parseInt(size, 10) : 10;
    const pageNumber = page ? parseInt(page, 10) : 1;
    const offset = (pageNumber - 1) * limit;

    return {
        limit,
        offset,
        // pageNumber,
    };
};

module.exports = { limitOffsetPageNumber };
