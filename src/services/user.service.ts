import {
    getUsersData,
    addUserData,
    findUserByIdData,
    changeUserData,
    deleteUserByIdData,
} from '../repositories/user.repository';

export const getListUsers = async () => {
    return getUsersData();
}

export const addUser = async (user: any) => {
    if (user) {
        return await addUserData(user)
    } else {
        throw ("Error in body request");
    }
}

export const findUserById = async (id: string) => {
    if (id) {
        return await findUserByIdData(id);
    } else {
        throw "Error in id";
    }
}

export const changeUserById = async (id: string, user: any) => {
    if (user) {
        return await changeUserData(id, user);
    } else {
        throw "Error in body request";
    }
}

export const deleteUserById = async (id: string) => {
    if (id) {
        return await deleteUserByIdData(id);
    } else {
        throw "Error in id";
    }
}