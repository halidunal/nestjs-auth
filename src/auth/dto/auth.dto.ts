import { IsString, Length, IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty({
        message: "Name is required"
    })
    name: string

    @IsString()
    @IsNotEmpty({
        message: "Surname is required"
    })
    surname: string

    @IsString()
    @IsEmail()
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