import {
    Schema,
    model,
    connect,
} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface User {
    userName: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    emailConfirmed?: boolean;
    password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
    userName: {
        type: String,
        required: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true,
        lowercase: true
    },
    avatar: String,
    emailConfirmed: Boolean,
    password: String,
});

// 3. Create a Model.
export const UserModel = model<User>('User', userSchema);

export async function run(urlBase: string) {
    // 4. Connect to MongoDB
    const conn = await connect(urlBase)
        .then((rez: any) => {
            console.log("database connected!");
        })
        .catch((err) => console.log(err)) // ‘oops!’    
}

