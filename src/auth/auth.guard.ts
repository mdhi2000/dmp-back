import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { verifyToken } from 'src/utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) return false;
    const accessToken = request.headers.authorization
      .toString()
      .replace(/^b|Bearer /, '');
    return verifyToken(accessToken, 'accessToken').then((currentUser) => {
      if (currentUser) {
        return this.userModel
          .findOne(
            {
              _id: currentUser,
            },
            { password: 0 },
          )
          .populate(['moods', 'likedSongs', 'playlists'])
          .then((user) => {
            // console.log(user);
            request.currentUser = user;
            return true;
          })
          .catch(() => false);
      }
      return false;
    });
  }
}
