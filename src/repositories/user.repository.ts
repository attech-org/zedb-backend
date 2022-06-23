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
    try {
        if (user &&
            user.userName) {
            const dbUser = new db.UserModel(user);
            const userInDatabase = await dbUser.save();
            return userInDatabase;
        } else {
            throw "Error: 'userName' is absent!!!";
        }
    } catch (err) {
        if ((err.code === 11000) &&
            (err.message.includes('duplicate key error collection'))) {
            let key: string = Object.keys(err.keyPattern)[0];
            switch (key) {
                case 'userName':
                    throw 'Error! A user with the same userName already exists';
                case 'email':
                    throw 'Error! A user with the same email already exists';
                default:
                    throw err;
            }
        } else {
            throw err;
        }
    }
}

export const changeUserData = async (id: string, user: any) => {
    if (!id) {
        throw "Error: id is absent";
    }
    const userInDatabase = await findUserByIdData(id)
    if (!userInDatabase) {
        throw `Error: User by id ${id} is not found!`;
    }
    try {
    return await db.UserModel.updateOne(
        { _id: new ObjectId(id) },
        { $set: user })
    } catch (err){
        if ((err.code === 11000) &&
            (err.message.includes('duplicate key error collection'))) {
            let key: string = Object.keys(err.keyPattern)[0];
            switch (key) {
                case 'userName':
                    throw 'Error! A user with the same userName already exists';
                case 'email':
                    throw 'Error! A user with the same email already exists';
                default:
                    throw err;
            }
        } else {
            throw err;
        }
    }
}

export const deleteUserByIdData = async (id: string) => {
    return db.UserModel.deleteOne({ _id: new ObjectId(id) })
}