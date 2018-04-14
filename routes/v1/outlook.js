var express = require('express');
var router = express.Router();
var appUtil = require('../../utils');
var models = require('../../models');
/* GET /authorize. */
router.get('/authorize', async function (req, res, next) {
    // Get auth code
    const code = req.query.code;
    // If code is present, use it
    if (code) {
        let token;
        let account = {};
        try {
            token = await appUtil.auth.outlook.getTokenFromCode(code);
            user = await appUtil.auth.outlook.getProfile(token);
            account = await models.user.findOne({ where: { email: user.mail } });
            if (account.id) {
                await models.user.update({
                    firstName: user.givenName,
                    lastName: user.surname,
                    email: user.mail,
                    jobTitle: user.jobTitle
                }, {
                        where: {
                            id: account.id
                        }
                    });
            } else {
                account = await models.user.create({
                    firstName: user.givenName,
                    lastName: user.surname,
                    email: user.mail,
                    jobTitle: user.jobTitle
                });
            }

            await models.token.upsert({
                accountId: user.id,
                accessToken: token,
                accountType: 'outlook',
                userId: account.id
            });
        } catch (error) {
            console.log(error);
            return res.json({ title: 'Error', message: 'Error exchanging code for token', error: error });
        }
        res.json(account);
    } else {
        // Otherwise complain
        res.json({ error: req.query.error, message: req.query.error_description });
    }
});

module.exports = router;