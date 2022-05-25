import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export const hashPassword = (password:string) => {
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

export const comparePassword = (hashedPassword:string, password:string) => {
    return bcrypt.compareSync(password, hashedPassword)
}

export const generateJWT = (payload:any) => {

    return jwt.sign(payload, process.env.secretKeyJWT)
}

export const verifyJWT = (payload:any) => {
    return jwt.verify(payload, process.env.secretKeyJWT)
}