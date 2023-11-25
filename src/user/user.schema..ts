import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({timestamps: true})
export class User{

    @Prop()
    name: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'address' })
    address: string

    @Prop()
    email: string

    @Prop()
    phoneNumber: number

    @Prop()
    preferredLanguage : string
}

export const UserSchema = SchemaFactory.createForClass(User);