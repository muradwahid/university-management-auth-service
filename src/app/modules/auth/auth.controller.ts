import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface'
import config from '../../../config'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result

  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User loggedin successfully',
    data: others,
  })
})
const refreshToken = catchAsync(async (req:Request,res:Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  //set refresh token into cookies
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly:true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'access token updated successfully',
    data:result
  })
})
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  console.log(user);
  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(user,passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result
  })
})
export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
}
