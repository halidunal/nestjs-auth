import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "./users.schema";

export type TokenSchema = mongoose.HydratedDocument<Token>

@Schema({versionKey: false, timestamps: true})

export class Token {
    @Prop({type: mongoose.Schema.Types.ObjectId}) userId: User
    @Prop({required: true}) token: String
}

export const TokenSchema = SchemaFactory.createForClass(Token)