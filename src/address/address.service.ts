import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './address.schema';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {
  constructor(@InjectModel(Address.name) private addressModel: Model<Address>) { }
  async create(createAddressDto: CreateAddressDto) {
    try {
      const addressObj = await this.addressModel.create(createAddressDto);
      return addressObj;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll() {
    try {
      const addresses = await this.addressModel.find().limit(10);
      return addresses;
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async findOne(id: string) {
    try {
      const addressObj = await this.addressModel.findById(id);
      if (!addressObj) {
        throw new NotFoundException('Address not found');
      }
      return addressObj;
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    try {
      const addressObj = await this.addressModel.findById(id);
      if (!addressObj) {
        throw new NotFoundException('address Not Found');
      }
      Object.assign(addressObj, updateAddressDto);
      return addressObj.save();
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  remove(id: string) {
    try {
      const addressObj = this.addressModel.findByIdAndDelete(id);
      if (!addressObj) {
        throw new NotFoundException('address not found');
      }
      return addressObj;
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}

