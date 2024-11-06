import httpStatus from 'http-status'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { User } from '../user/user.model'
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload
  //check user exists
  // const user = new User()   //  creating instance of User

  //static
  const isUserExist = await User.isUserExist(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // match password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  //create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )
  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExist?.needsPasswordChange,
  }
}
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // invalid token - synchronous
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }
  const { id } = verifiedToken
  //checking deleted user refresh token
  const isUserExist = await User.isUserExist(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )
  return {
    accessToken: newAccessToken,
  }
}
const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload
  //checking is user exist
  // const isUserExist = await User.isUserExist(user?.id);

  //alternative away to change password
  const isUserExist = await User.findOne({ id: user?.id }).select('+password')

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  //has password before seving
  // const newHashedPassword =await bcrypt.hash(newPassword,Number(config.becrypt_salt_rounds))

  // const updatedData = {
  //   password: newHashedPassword,
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date()
  // }
  //update password
  // await User.findOneAndUpdate({ id: user?.id }, updatedData, { new: true });

  //alternative away to update password
  //data update
  isUserExist.password = newPassword
  isUserExist.needsPasswordChange = false

  //updating using save methods (working user model pre hooks)
  isUserExist.save()
}
export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
}
