import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

const UserSchema: mongoose.Schema = new mongoose.Schema<IUser>({
    name : String,
    email : String,
    age : Number,
    createdAt : Date
});

const User = mongoose.model<IUser>('User', UserSchema);

export {User, IUser}