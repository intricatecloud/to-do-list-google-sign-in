const { OAuth2Client } = require('google-auth-library')
const googleAuthClient = new OAuth2Client();

module.exports = (req, res, next) => {
    const idToken = req.header('Authorization');
    if (!idToken) {
        return res.status(401).end()
    }

    googleAuthClient.verifyIdToken({idToken}).then(loginTicket => {
        const userId = loginTicket.getUserId();
        console.log('token has been validated', userId)
        req.userId = userId
        next()
    }).catch(err => {
        console.error('Failed to validate token', err)
        res.status(401).end()
    })
}