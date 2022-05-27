import { sign, SignOptions, verify, VerifyOptions, Algorithm } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as yup from 'yup';

export const schemaFullCheckUser = yup.object().shape({
    userName: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().min(5).required(),
});
export const schemaExistingFieldCheckUser = yup.object().shape({
    userName: yup.string(),
    email: yup.string().email(),
    password: yup.string().min(5),
});
export const schemaCheckUserNamePassword = yup.object().shape({
    userName: yup.string().required(),
    password: yup.string().min(5).required(),
});
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

export const checkUserAllField = async (user: any) => {
    return schemaFullCheckUser.validate(user)
}

export const checkUserExistingField = async (user: any) => {
    return schemaExistingFieldCheckUser.validate(user)
}

export const checkUserNamePassword = async (user: any) => {
    return schemaCheckUserNamePassword.validate(user)
}