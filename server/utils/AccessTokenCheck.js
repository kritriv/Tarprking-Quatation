const blacklistedTokens = new Set();

const revokeAccessToken = async (token) => {
    blacklistedTokens.add(token);
};

module.exports = { revokeAccessToken, blacklistedTokens };
