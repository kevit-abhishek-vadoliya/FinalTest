import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps: true})
export class Address{
    @Prop()
    street: string

    @Prop()
    area: string

    @Prop()
    city: string

    @Prop()
    state: string

    @Prop()
    zipcode: number

}

export const AddressSchema = SchemaFactory.createForClass(Address);