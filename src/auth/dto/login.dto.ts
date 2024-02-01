import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty({
        message: "Email is required"
    })
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(6,100, {
        message: "Email must be at least 6 characters and at most 100 characters."
    })
    password: string
}