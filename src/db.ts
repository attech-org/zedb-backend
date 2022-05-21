import {
    Schema,
    model,
    connect,
} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
    userName: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    emailConfirmed?: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    userName: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    email: { type: String, lowercase:true},
    avatar: String,
    emailConfirmed: Boolean
});

// 3. Create a Model.
export const User = model<IUser>('User', userSchema);

export async function run(urlBase: string) {
    // 4. Connect to MongoDB
    const conn = await connect(urlBase)
        .then((rez: any) => {
            console.log("database connected!");
        })
        .catch((err) => console.log(err)) // ‘oops!’    
}

