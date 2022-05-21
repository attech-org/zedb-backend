import * as db from '../db';

import { ObjectId } from 'mongodb';

export const getUsersData = async () => {
    return await db.User.find({});
}

export const findByUserName = async (userName: string) => {
    return await db.User.findOne({ userName: new RegExp(userName, "i") });
}

export const findUserByIdData = async (id: string) => {
    return await db.User.findOne({ _id: new ObjectId(id) })
}

export const addUserData = async (user: any) => {
    if (user &&
        user.userName) {
        await findByUserName(user.userName)
            .then((docs) => {
                if (docs) {
                    throw `Error: user by userName ${user.userName} present in database already!`
                }
            }, (err) => {
                throw "" + err
            })

        const dbUser = new db.User(user);
        return await dbUser.save();

    } else {
        throw "Error: 'userName' is absent!!!";
    }
}

export const changeUserData = async (id: string, user: any) => {
    if (id) {
        let userInDatabase: any;
        await findUserByIdData(id)
            .then((result) => {
                if (!result) {
                    throw `Error: User by id ${id} is not found!`;
                }
                userInDatabase = result;
            }).catch((err) => {
                throw err;
            });

        if (user &&
            user.userName &&
            user.userName !== userInDatabase.userName) {
            //check maybe new name is present in database already
            await findByUserName(user.name)
                .then((usersInDatabaseWithNewName) => {
                    if (usersInDatabaseWithNewName) {
                        throw `Error: you cannot change user name to ${user.name}`
                        + ` because such user present in database id = ${usersInDatabaseWithNewName._id}!`;
                    }
                })
        }
        return await db.User.updateOne(
            { _id: new ObjectId(id) },
            { $set: user })

    } else {
        throw "Error: id is absent";
    }
}

export const deleteUserByIdData = async (id: string) => {
    return await db.User.deleteOne({ _id: new ObjectId(id) })
}