const jwt = require('jsonwebtoken');
const secret = '123';
const invalidatedTokens = []; // Lista para armazenar tokens invalidados

async function generateToken(user) {
    const id = user.id;
    const email = user.email;
    const token = jwt.sign({ id, email }, secret, { expiresIn: '1h' });

    return token;
}

async function verifyToken(req, res, next) {
    const authheader = req.headers['authorization'];

    if (!authheader) {
        return res.status(401).json({ message: 'Token não informado.' });
    }

    const token = authheader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não informado.' });
    }

    if (invalidatedTokens.includes(token)) {
        return res.status(401).json({ message: 'Token inválido.' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        req.user = decoded;
        next();
    });
}

async function invalidateToken(token) {
    invalidatedTokens.push(token);
}

module.exports = { generateToken, verifyToken, invalidateToken };
