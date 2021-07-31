import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, BaseEntity, ManyToMany, JoinTable} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import Recipe from './Recipe';

@ObjectType()
@Entity()
class Ingredient extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field( ()=> String)
    @Column({ unique: true })
    name!: string;

    @Field( ()=> [Recipe])
    @ManyToMany(() => Recipe, recipe => recipe.ingredients)
    @JoinTable()
    recipe: Recipe[];
}

export default Ingredient;