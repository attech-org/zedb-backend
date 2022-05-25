import { sign, SignOptions, verify, VerifyOptions, Algorithm } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export const hashPassword = (password: string) => {
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

export const comparePassword = (hashedPassword: string, password: string) => {
    return bcrypt.compareSync(password, hashedPassword)
}

export const generateJWT = (payload: any) => {
    const signOptions: SignOptions = {
        expiresIn: '8784h',
        algorithm: 'HS256',
    }
    return sign({
        id: payload._id,
        userName: payload.userName,
    }, process.env.secretKeyJWT, signOptions);
}

export const verifyJWT = (token: string) => {
    const verifyOptions: VerifyOptions = {
        algorithms: ['HS256'],
    };

    return verify(token, process.env.secretKeyJWT, verifyOptions);
}