import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../../models/auth/user';
import { mailService } from './mail-service';
import { tokenService } from './token-service';
import { UserDto } from '../../dtos/user-dto';

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if(candidate) {
            throw new Error(`User with mail address ${email} is already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }
}

export const userService = new UserService();