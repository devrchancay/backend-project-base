import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      const user = await this.usersRepository.save(newUser);
      return user;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const userFind = await this.usersRepository.findOneBy({ id });
    if (!userFind) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFind;
  }

  async findByEmail(email: string) {
    const userFind = await this.usersRepository.findOne({ where: { email } });
    if (!userFind) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFind;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.usersRepository.merge(user, updateUserDto);
    const userUpdated = await this.usersRepository.save(user);
    return userUpdated;
  }

  async remove(id: string) {
    const userRemove = await this.usersRepository.delete(id);
    if (userRemove.affected > 0) {
      return true;
    }
    return false;
  }
}
