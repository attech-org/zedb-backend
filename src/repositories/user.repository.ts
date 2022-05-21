import * as db from '../db';

import { ObjectId } from 'mongodb';

export const getUsersData = (done: any) => {
    db.get().collection('users').find().toArray((err: any, docs: any) => {
        done(err, docs)
    })
}

export const findByName = (name: string, done: any) => {
    db.get().collection('users').findOne({ name: name }, done);
}

export const findUserByIdData = (id: string, done: any) => {
    db.get().collection('users').findOne({ _id: new ObjectId(id) }, (err: any, docs: any) => {
        done(err, docs)
    })
}

export const addUserData = (user: any, done: any) => {
    if (user &&
        user.name) {
        findByName(user.name, (err: any, docs: any) => {
            if (err) {
                return done("" + err)
            }
            if (docs) {
                return done(`Error: user by name ${user.name} present in database already!`)
            }
            if (user._id) {
                //we have our own id
                delete user._id;
            }
            db.get().collection('users').insertOne(user, (err: any, result: any) => {
                if (err) {
                    if (err.toString().includes("duplicate key error")) {
                        return done(`Error: user by id ${user._id} present in database already!`)
                    }
                }
                done(false, user)
            })
        })
    } else {
        done("Error: 'name' is absent!!!");
    }
}

export const changeUserData = (id: string, user: any, done: any) => {
    if (id) {
        findUserByIdData(id, (err: any, userInDatabase: any) => {
            if (err) {
                return done("" + err)
            }
            if (!userInDatabase) {
                done(`Error: User by id ${id} is not found!`);
            }
            if (user._id) {
                //we cannot change id
                delete user._id;
            }
            if (user &&
                user.name &&
                user.name !== userInDatabase.name) {
                //check maybe new name is present in database already
                findByName(user.name, (err: any, usersInDatabaseWithNewName: any) => {
                    if (err) {
                        return done("" + err)
                    }
                    if (usersInDatabaseWithNewName) {
                        return done(`Error: you cannot change user name to ${user.name}`
                            + ` because such user present in database id = ${usersInDatabaseWithNewName._id}!`)
                    }
                    db.get().collection('users').updateOne(
                        { _id: new ObjectId(id) },
                        { $set: user },
                        (errChange: any, result: any) => done(errChange, `user by id = ${id} was modificated`))

                })
            } else {
                console.log(user);
                db.get().collection('users').updateOne(
                    { _id: new ObjectId(id) },
                    { $set: user },
                    (errChange: any, result: any) => done(errChange, `user by id = ${id} was modificated`))
            }
        })
    } else {
        done("Error: id is absent");
    }
}

export const deleteUserByIdData = (id: string, done: any) => {
    db.get().collection('users').deleteOne(
        { _id: new ObjectId(id) },
        (err: any, result: any) => {
            if (err) {
                return done(err)
            }
            done(err, `user by id = ${id} was removed from database`)
        })
}