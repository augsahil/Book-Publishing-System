import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  role: 'admin' | 'reviewer'
  apiKey: string
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'reviewer'], required: true },
    apiKey: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

const User = mongoose.model<IUser>('User', UserSchema)
export default User
