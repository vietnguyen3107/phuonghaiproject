import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(Id: number): Promise<User>;
    create(task: User): Promise<User>;
    update(task: User): Promise<UpdateResult>;
    delete(Id: any): Promise<DeleteResult>;
    findByEmail(user: User): Promise<User>;
    findByEmailAndPassword(user: User): Promise<User>;
    validate(user: User): Promise<User>;
    login(user: User): Promise<any | {
        status: number;
        message: string;
    }>;
}
