import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema.';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userObj = await this.userModel.create(createUserDto);
      return userObj;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().limit(10);
      return users;
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async findOne(id: string) {
    try {
      const userObj = await this.userModel.findById(id);
      if (!userObj) {
        throw new NotFoundException('User not found');
      }
      return userObj;
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async findByAddress(address: string){
    try{
      const userObj = await this.userModel.findOne({address})
      if(!userObj){
        throw new NotFoundException("User not found")
      }
      return userObj
    }
    catch(err){
      throw new HttpException(err.response,err.status)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userObj = await this.userModel.findById(id);
      if (!userObj) {
        throw new NotFoundException('User Not Found');
      }
      Object.assign(userObj, updateUserDto);
      return userObj.save();
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  remove(id: string) {
    try {
      const userObj = this.userModel.findByIdAndDelete(id);
      if (!userObj) {
        throw new NotFoundException('User not found');
      }
      return userObj;
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
