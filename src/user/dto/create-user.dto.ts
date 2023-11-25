import { IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {

    @IsString()
    name: string

    @IsString()
    address: string

    @IsEmail()
    email: string

    @IsNumber()
    phoneNumber: number

    @IsString()
    preferredLanguage : string 

}
