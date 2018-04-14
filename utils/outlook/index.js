require('dotenv').config();
const credentials = {
    client: {
        id: process.env.OUTLOOK_APP_ID,
        secret: process.env.OUTLOOK_PASSWORD,
    },
    auth: {
        tokenHost: 'https://login.microsoftonline.com',
        authorizePath: 'common/oauth2/v2.0/authorize',
        tokenPath: 'common/oauth2/v2.0/token'
    }
};
const oauth2 = require('simple-oauth2').create(credentials);
const graph = require('@microsoft/microsoft-graph-client');
const jwt = require('jsonwebtoken');
function getAuthUrl() {
    const returnVal = oauth2.authorizationCode.authorizeURL({
        redirect_uri: process.env.OUTLOOK_REDIRECT_URI,
        scope: process.env.OUTLOOK_APP_SCOPES
    });
    return returnVal;
}

async function getTokenFromCode(auth_code) {
    let result = await oauth2.authorizationCode.getToken({
        code: auth_code,
        redirect_uri: process.env.OUTLOOK_REDIRECT_URI,
        scope: process.env.OUTLOOK_APP_SCOPES
    });
    const token = oauth2.accessToken.create(result);
    return token.token.access_token;
}

const createClient = function (accessToken) {
    const client = graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
    return client;
}

const getProfile = async function (accessToken) {
    try {
        client = createClient(accessToken);
        const result = await client.api(`/me`).get();
        return result;
    } catch (error) { }
}

module.exports = {
    getTokenFromCode,
    getAuthUrl,
    getProfile
};