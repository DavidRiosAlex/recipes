import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    Int
} from 'type-graphql';
import jwt from 'jsonwebtoken';
import { createHmac, randomBytes } from 'crypto';
import { User } from '../entity';
import { SECRET_USER_JWT } from '../config/config';

@InputType()
class UserInput {
    @Field()
    name!: string
    @Field()
    password!: string
    @Field()
    email!: string
}

@Resolver()
export class UserResolver{


    @Mutation(() => User)

    async signUp(
        @Arg('data', () => UserInput) data: UserInput
    ){
        const userAlreadyExist = await User.findOne({
            email: data.email
        });

        if (userAlreadyExist) return new Error('user already exist');

        const { password } = data;
        const secret = randomBytes(16).toString('hex');

        data.password = createHmac('sha256', secret).update(password).digest('hex');
        const userData = {
            ...data,
            secret,
        };
        const newUser = await User.create(userData);
        await newUser.save();
        console.log('>> new user --> ' + JSON.stringify(newUser, null, 2));
        return newUser
    }

    @Query(()=>[User])
    users(){
        return User.find()
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Arg('id', () => Int ) id: number,
        @Arg('user', () => UserInput) user: UserInput
    ){
        await User.update(id, user);
        console.log('product with id --> ' + id + ' updated');
        return true
    }

    @Mutation(() => String)
    async login(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
    ){
        const user = await User.findOne({ email });
        if (!user) return new Error('user not found')
        console.log('>> user found --> ');
        const hashedPassword = createHmac('sha256', user.secret ).update(password).digest('hex');

        console.log('>> hashedPassword --> ',hashedPassword);
        if (hashedPassword !== user.password) return new Error('authentication failed');

        const oneDayInMs = 3600 * 24;

        const jsonwebtoken = jwt.sign({
            data: user,
        }, SECRET_USER_JWT, { expiresIn: oneDayInMs });
        console.log('>> jsonwebtoken --> ', jsonwebtoken);

        return jsonwebtoken
    }
}
