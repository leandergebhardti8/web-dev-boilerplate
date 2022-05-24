const jsonWebToken = require('jsonwebtoken')


const JWT_ENCODING_PASSPHRASE = 'random_string_asdfasdf';

exports.verifyJWT = (req, res, next) => {
    const { token } = req.headers;

    try {
        // eslint-disable-next-line no-unused-vars
        const decoded = jsonWebToken.verify(token, JWT_ENCODING_PASSPHRASE);
        next();
    } catch(err) {
        res.status(403).send({
            error: true,
            message: 'Not Authorized',
        })
    }
}