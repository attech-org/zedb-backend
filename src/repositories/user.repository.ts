import * as db from '../db';

import { ObjectId } from 'mongodb';

export const getUsersData = async () => {
    return db.UserModel.find({});
}

export const findUserByIdData = async (id: string) => {
    return db.UserModel.findOne({ _id: new ObjectId(id) })
}

export const findUserByUserName = async (userName: string) => {
    return db.UserModel.findOne({ userName: userName })
}

export const addUserData = async (user: any) => {
    if (user &&
        user.userName) {
        const dbUser = new db.UserModel(user);
        const userInDatabase = await dbUser.save();
        return userInDatabase;
    } else {
        throw "Error: 'userName' is absent!!!";
    }
}

export const changeUserData = async (id: string, user: any) => {
    if (id) {
        const userInDatabase = await findUserByIdData(id)
        if (!userInDatabase) {
            throw `Error: User by id ${id} is not found!`;
        }
        return db.UserModel.updateOne(
            { _id: new ObjectId(id) },
            { $set: user })

    } else {
        throw "Error: id is absent";
    }
}

export const deleteUserByIdData = async (id: string) => {
    return db.UserModel.deleteOne({ _id: new ObjectId(id) })
}