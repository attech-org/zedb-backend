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
    try {
        await Utils.checkUserAllField(user);
        user.password = Utils.hashPassword(user.password);
        return addUserData(user)
    } catch (err) {
        throw "" + err;
    }
}

export const findUserById = async (id: string) => {
    if (id) {
        return findUserByIdData(id);
    } else {
        throw "Error in id";
    }
}

export const changeUserById = async (id: string, user: any) => {
    try {
        await Utils.checkUserExistingField(user);
        if (user.password) {
            user.password = Utils.hashPassword(user.password);
        }
    } catch (err) {
        throw "" + err;
    }
    return changeUserData(id, user);
}

export const deleteUserById = async (id: string) => {
    if (id) {
        return deleteUserByIdData(id);
    } else {
        throw "Error in id";
    }
}

export const authLogin = async (user: any) => {
    try {
        await Utils.checkUserNamePassword(user);
    } catch (err) {
        throw "" + err;
    }
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

