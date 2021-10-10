import bcrypt from 'bcrypt';
import uuid from 'uuid';
import { UserModel } from '../../models/auth/user';
import { mailService } from './mail-service';
import { tokenService } from './token-service';

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if(candidate) {
            throw new Error(`User with mail address ${email} is already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink);
        const tokens = tokenService.generateTokens()
    }
}

export const userService = new UserService();