import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
class Ingredient extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field( ()=> String)
    @Column()
    name!: string;
}

export default Ingredient;