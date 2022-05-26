import * as Utils from '../helpers/utils';

export const isAuthorised = (req: any, res: any, next: any) => {
    try {
        let token = req.headers['x-access-token'] || req.headers.authorization || req.body.token
        console.log(token, 'token')
        if (!token) throw new Error('No token provided.')
        if (token.startsWith('Bearer ')) token = token.slice(7, token.length)

        if (!token || token === '' || token === 'undefined') throw new Error('No token provided.')

        const user = Utils.verifyJWT(token);
        res.token = token;
        res.loginAsUser = user;
        if (!user) throw new Error('Failed to authenticate token. ')

        next()
    } catch (e) {
        res.status(401).send('Failed to authenticate token');
    }
}
