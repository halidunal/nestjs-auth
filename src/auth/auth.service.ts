import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TokenSchema } from './schemas/tokens.schema';
import { UserSchema } from './schemas/users.schema';
import { AuthDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from './interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel("Token") private tokenModel: mongoose.Model<TokenSchema>,
        @InjectModel("User") private userModel: mongoose.Model<UserSchema>,
        private jwtSerice: JwtService
    ) {}

    async register(dto: AuthDto) {
        const hash = await this.hashPassword(dto.password)

        const user = await this.userModel.findOne({email: dto.email})

        if(user) throw new BadRequestException("Already registered")

        const newUser = new this.userModel({...dto, password: hash})

        await newUser.save().catch(error => {
            throw new BadRequestException("User could not be registered")
        })

        return {
            result: "User registered"
        }
    }

    async login(dto: LoginDto) {
        const {email, password} = dto;
        
        const user = await this.userModel.findOne({email})

        if(!user) throw new UnauthorizedException("User not found")

        const comparePassword = await this.compareData(password, user.password)

        if(!comparePassword) throw new UnauthorizedException("Wrong password")

        const userId = user._id
        const token = await this.createToken({userId})

        await this.tokenModel.findOneAndUpdate(
            {
                userId: new mongoose.Types.ObjectId(String(userId))
            },
            {
                $set: {
                    token
                },
            },
            {
                upsert: true,
                new: true
            }
        )

        return {
            token
        }
    }

    async hashPassword(data: string) {
        return await bcrypt.hash(data, 10)
    }

    async compareData(password, comparePassword){
        return await bcrypt.compare(password,comparePassword);
    }

    async createToken(payload: IJwtPayload) {
        return await this.jwtSerice.sign(payload)
    }
}
