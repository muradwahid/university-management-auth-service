import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, UserModel } from './user.interface'
const userSchema = new Schema<IUser,UserModel>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt:{type: Date},
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
//statics methods
userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  )
}
userSchema.statics.isPasswordMatch = async function (
  givenPassword,
  savedPassword
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword,savedPassword)
  return isMatched
}
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.becrypt_salt_rounds)
  )

  //alternative away password change
  if (!this.needsPasswordChange) {
    this.passwordChangedAt=new Date()
  }

  next()
})
export const User = model<IUser, UserModel>('User', userSchema)

//instance methods
// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   )
//   return user
// }
// userSchema.methods.isPasswordMatch = async function (
//   givenPassword,
//   savedPassword
// ): Promise<boolean> {
//   const isMatched = await bcrypt.compare(savedPassword, givenPassword)
//   return isMatched
// }
