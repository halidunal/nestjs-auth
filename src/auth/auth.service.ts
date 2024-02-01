import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenSchema } from './schemas/tokens.schema';
import { UserSchema } from './schemas/users.schema';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("Token") private tokenModel: Model<TokenSchema>,
        @InjectModel("User") private userModel: Model<UserSchema>,
    ) {}

    async register(dto: AuthDto) {
        const hash = await this.hashPassword(dto.password)

        const user = await this.userModel.findOne({email: dto.email})

        if(user) throw new BadRequestException("Already registered")

        const newUser = new this.userModel({password: hash, ...dto})

        await newUser.save().catch(error => {
            throw new BadRequestException("User could not be registered")
        })

        return {
            result: "User registered"
        }
    }

    async hashPassword(data: string) {
        return await bcrypt.hash(data, 10)
    }
}
