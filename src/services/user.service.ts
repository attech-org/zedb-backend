import {
    getUsersData,
    addUserData,
    findUserByIdData,
    changeUserData,
    deleteUserByIdData,
} from '../repositories/user.repository';

export const getListUsers = (done: any) => {
    return getUsersData(done);
}

export const addUser = (user: any, done: any) => {
    if (user) {
        addUserData(user, (err: any, result: any) => {
            if (err) {
                console.log(err);
                return done(err)
            }
            done(false, result);
        });
    } else {
        done("Error in body request");
    }
}

export const findUserById = (id: string, done: any) => {
    if (id) {
        findUserByIdData(id, done);
    } else {
        done("Error in id");
    }
}

export const changeUserById = (id: string, user: any, done: any) => {
    if (user) {
        changeUserData(id, user, done);
    } else {
        done("Error in body request");
    }
}

export const deleteUserById = (id: string, done: any) => {
    if (id) {
        deleteUserByIdData(id, done);
    } else {
        done("Error in id");
    }
}