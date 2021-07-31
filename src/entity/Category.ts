import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import Recipe from './Recipe';

@ObjectType()
@Entity()
class Product extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field( ()=> String)
    @Column({ unique: true })
    name!: string;

    @Field( () => [Recipe])
    @OneToMany(type => Recipe, recipe => recipe.category)
    recipe!: Recipe[];

}

export default Product;