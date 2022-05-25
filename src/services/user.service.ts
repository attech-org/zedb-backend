import {
    getUsersData,
    addUserData,
    findUserByIdData,
    findUserByUserName,
    changeUserData,
    deleteUserByIdData,
} from '../repositories/user.repository';

import * as Utils from '../helpers/utils'

export const getListUsers = async () => {
    return getUsersData();
}

export const addUser = async (user: any) => {
    checkUserField(user);
    user.password = Utils.hashPassword(user.password);
    return addUserData(user)
}

export const findUserById = async (id: string) => {
    if (id) {
        return findUserByIdData(id);
    } else {
        throw "Error in id";
    }
}

export const changeUserById = async (id: string, user: any) => {
    if (user) {
        if (user.password) {
            if (!validatePassword(user.password)) {
                throw 'Password must be more than five(5) characters';
            }
            user.password = Utils.hashPassword(user.password);
        }
        return changeUserData(id, user);
    } else {
        throw "Error in body request";
    }
}

export const deleteUserById = async (id: string) => {
    if (id) {
        return deleteUserByIdData(id);
    } else {
        throw "Error in id";
    }
}

export const authLogin = async (user: any) => {
    checkUserField(user);
    const userInDatabase = await findUserByUserName(user.userName);
    if (!userInDatabase) {
        throw "Error: 'userName' or 'password' is not correct!!!";
    }
    if (!Utils.comparePassword(userInDatabase.password, user.password)) {
        throw "Error: 'userName' or 'password' is not correct!!!";
    }
    const token = Utils.generateJWT(userInDatabase);
    return { userInDatabase, token }

}

const validatePassword = (password: string) => {
    if (password.length <= 5 || password === '') {
        return false
    } return true
}

const checkUserField = (user: any) => {
    if (!user) {
        throw ("Error in body request");
    }
    if (!user.userName) {
        throw "Error: 'userName' is absent!!!";
    }
    if (!user.password) {
        throw "Error: 'password' is absent!!!";
    }
    if (!validatePassword(user.password)) {
        throw 'Password must be more than five(5) characters'
    }
}