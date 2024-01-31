import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserSchema = HydratedDocument<User>

@Schema({versionKey: false, timestamps: true})

export class User {
    @Prop({required: true}) name: String
    @Prop({required: true}) surname: String
    @Prop({required: true, unique: true, index: true}) email: String
    @Prop({required: true}) password: String
}

export const UserSchema = SchemaFactory.createForClass(User)