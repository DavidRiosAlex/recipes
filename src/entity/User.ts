import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
class User extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field( ()=> String)
    @Column()
    name!: string;

    @Field( ()=> String)
    @Column()
    email!: string;

    @Field( ()=> String)
    @Column(    )
    password!: string;

    @Field( ()=> String)
    @Column()
    secret!: string;
}

export default User;