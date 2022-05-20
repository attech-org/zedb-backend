import { 
    getUsersData,
    addUserData,
     } from  '../repositories/user.repository';

export function getListUsers(done:any) {
    return getUsersData(done);
}

export function addUser(user:any, done:any){
    if (user) {
        addUserData(user, (err:any, result:any)=>{
            if (err){
                console.log(err);
                return done(err)
            }
            done(false, result);
        });
    } else {
        done("Error in body request");
    }
}