import { IsString, Length, isEmail, isNotEmpty } from "class-validator";

export class authDto {
    @IsString()
    @isNotEmpty({
        message: "Name is required"
    })
    name: string

    @IsString()
    @isNotEmpty({
        message: "Surname is required"
    })
    surname: string

    @IsString()
    @isEmail()
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