const blacklistedTokens = new Set();

const revokeAccessToken = async (token) => {
    blacklistedTokens.add(token);
    console.log(blacklistedTokens)
};

module.exports = { revokeAccessToken, blacklistedTokens };
