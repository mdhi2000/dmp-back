import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { UserDocument } from 'src/user/schemas/user.schema';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  RESETPASS_TOKEN_SECRET,
  ISSIUER,
  COOKIE_JWT_URL,
} from '../environments';

type TokenType = 'accessToken' | 'refreshToken' | 'resetPassToken';

const common = {
  accessToken: {
    privateKey: ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: '30d', // 15m
    },
  },
  refreshToken: {
    privateKey: REFRESH_TOKEN_SECRET,
    signOptions: {
      expiresIn: '7d', // 7d
    },
  },
  resetPassToken: {
    privateKey: RESETPASS_TOKEN_SECRET,
    signOptions: {
      expiresIn: '1d', // 1d
    },
  },
};

/**
 * Returns token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param user - 1st input
 * @param type - 2nd input
 *
 * @returns The access token mean of `user`
 *
 * @beta
 */
export const generateToken = async (
  user: UserDocument,
  type: TokenType,
): Promise<string> => {
  return await sign(
    {
      _id: user._id,
    },
    common[type].privateKey,
    {
      issuer: ISSIUER,
      subject: user.username,
      algorithm: 'HS256',
      expiresIn: common[type].signOptions.expiresIn, // 15m
    },
  );
};

/**
 * Returns user by verify token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param token - 1st input
 * @param type - 2nd input
 *
 * @returns The user mean of `token`
 *
 * @beta
 */
export const verifyToken = async (
  token: string,
  type: TokenType,
  refreshToken = '',
): Promise<string> => {
  let currentUser = null;

  await verify(token, common[type].privateKey, async (err, data) => {
    if (err) {
      // return await verify(
      //   refreshToken,
      //   common['refreshToken'].privateKey,
      //   async (err2, data2) => {
      //     if (err2) {
      //       throw new HttpException(
      //         'Authentication token is invalid, please try again.',
      //         HttpStatus.FORBIDDEN,
      //       );
      //     }
      //     currentUser = data2._id;
      //   },
      // );
      throw new HttpException(
        'Authentication token is invalid, please try again.',
        HttpStatus.FORBIDDEN,
      );
    }

    currentUser = data._id;
  });

  return currentUser;
};

/**
 * Returns login response by trade token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param user - 1st input
 *
 * @returns The login response mean of `user`
 *
 * @beta
 */
export const tradeToken = async (
  user: UserDocument,
): Promise<Record<string, any>> => {
  const accessToken = await generateToken(user, 'accessToken');
  const refreshToken = await generateToken(user, 'refreshToken');

  return { accessToken, refreshToken };
};

export const setRefreshToken = (
  response: Response,
  refreshToken: string,
): Response => {
  response.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    domain: COOKIE_JWT_URL,
    maxAge: 604800000,
    sameSite: 'none',
    secure: true,
  });
  return response;
};
