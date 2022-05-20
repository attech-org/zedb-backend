const MongoClient = require('mongodb').MongoClient;

interface State {
    db:any;
}
const state: State = {
    db: null,
}
exports.connect = function (urlBase:string, name:string, done:any) {
    if (state.db) {
        return done
    }
    MongoClient.connect(urlBase, (err:any, database:any) => {
        if (err) {
            return done(err);
        }
        state.db = database.db(name);
        done();
    })
}

exports.get = function () {
    return state.db;
}