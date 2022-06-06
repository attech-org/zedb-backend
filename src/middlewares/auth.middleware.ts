import * as Utils from '../helpers/utils';
import * as Google from '../helpers/google';
import {
    findUserByGoogleData,
} from '../repositories/user.repository';

export const isAuthorised = async (req: any, res: any, next: any) => {
    try {
        let itsGoogleToken:boolean = false;
        let token = req.headers['x-access-token'] || req.headers.authorization || req.body.token
        console.log(token, 'token');
        if (!token) throw new Error('No token provided.');
        if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
        if (token.startsWith('Google ')) {
            token = token.slice(7, token.length);
            itsGoogleToken = true;
        }

        if (!token || token === '' || token === 'undefined') throw new Error('No token provided.')
        let user;
        if (!itsGoogleToken){
            user = Utils.verifyJWT(token);
        } else {
            const googleUser = await Google.TakeGoogleUserFromToken(token);
            user = await findUserByGoogleData(googleUser);
        }
        res.token = token;
        res.loginAsUser = user;
        if (!user) throw new Error('Failed to authenticate token. ')

        next()
    } catch (e) {
        res.status(401).send('Failed to authenticate token');
    }
}
