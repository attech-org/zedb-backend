import * as db from '../db';
const ObjectId = require('mongodb').ObjectId;

export function getUsersData(done: any) {
    db.get().collection('users').find().toArray((err: any, docs: any) => {
        done(err, docs)
    })
}
export function findByName(name: String, done: any) {
    db.get().collection('users').findOne({ name: name }, done);
}

export function addUserData(user: any, done: any) {

    if (user &&
        user.name) {
        findByName(user.name, (err: any, docs: any) => {
            if (err) {
                return done("" + err)
            }
            if (docs) {
                return done(`Error: user by name ${user.name} present in database already!`)
            }
            db.get().collection('users').insertOne(user, (err:any, result:any) => {
                if (err){
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