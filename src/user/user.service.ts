import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    private users: User[] = [];

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const saltDrRounds = 10;

        const passwordHashed = await hash(createUserDto.password, saltDrRounds);

        const user: User = {
            ...createUserDto,
            id: this.users.length + 1,
            password: passwordHashed
        }

        this.users.push(user);

        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }
}