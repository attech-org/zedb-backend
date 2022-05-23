import * as db from '../db';

import { ObjectId } from 'mongodb';

export const getUsersData = async () => {
    return await db.User.find({});
}

export const findUserByIdData = async (id: string) => {
    return await db.User.findOne({ _id: new ObjectId(id) })
}

export const addUserData = async (user: any) => {
    if (user &&
        user.userName) {

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