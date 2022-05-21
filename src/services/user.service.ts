import {
    getUsersData,
    addUserData,
    findUserByIdData,
    changeUserData,
    deleteUserByIdData,
} from '../repositories/user.repository';

export function getListUsers(done: any) {
    return getUsersData(done);
}

export function addUser(user: any, done: any) {
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

export function findUserById(id: string, done: any) {
    if (id) {
        findUserByIdData(id, done);
    } else {
        done("Error in id");
    }
}

export function changeUserById(id: string, user: any, done: any) {
    if (user) {
        changeUserData(id, user, done);
    } else {
        done("Error in body request");
    }
}

export function deleteUserById(id: string, done: any) {
    if (id) {
        deleteUserByIdData(id, done);
    } else {
        done("Error in id");
    }
}