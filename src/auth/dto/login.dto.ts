import { IsString, Length, isNotEmpty } from "class-validator";

export class loginDto {
    @IsString()
    @isNotEmpty({
        message: "Email is required"
    })
    email: string

    @IsString()
    @isNotEmpty()
    @Length(6,100, {
        message: "Email must be at least 6 characters and at most 100 characters."
    })
    password: string
}