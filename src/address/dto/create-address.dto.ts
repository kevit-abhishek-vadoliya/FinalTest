import { IsString, IsNumber } from 'class-validator';

export class CreateAddressDto {
    @IsString()
    street: string

    @IsString()
    area: string

    @IsString()
    city: string

    @IsString()
    state: string

    @IsNumber()
    zipcode: number
}
