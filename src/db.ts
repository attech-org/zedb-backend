import { MongoClient } from 'mongodb';

interface State {
    db: any;
}
const state: State = {
    db: null,
}
export function connect(urlBase: string, name: string, done: any) {
    if (state.db) {
        return done
    }
    MongoClient.connect(urlBase, (err: any, database: any) => {
        if (err) {
            return done(err);
        }
        state.db = database.db(name);
        done();
    })
}

export function get() {
    return state.db;
}