import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { Token, TokenSchema } from "../schemas/tokens.schema";
import * as mongoose from "mongoose";

interface IJwtPayload {
    userId: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor(@InjectModel("Token") private readonly tokenModel: mongoose.Model<TokenSchema>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate(payload: IJwtPayload): Promise<Token> {
        const userId = new mongoose.Schema.Types.ObjectId(payload.userId)
        const token = await this.tokenModel.findOne(userId).select("-_id userId")
        console.log("token: ", token)
        if(!token) throw new UnauthorizedException()
        return token
    }
}