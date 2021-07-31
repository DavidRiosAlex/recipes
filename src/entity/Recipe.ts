import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToMany, ManyToOne} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import Category from './Category';
import Ingredient from './Ingredients';

@ObjectType()
@Entity()
class Recipe extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field( ()=> String)
    @Column()
    name!: string;

    @Field( ()=> Int)
    description!: string;

    @Field( ()=> [Ingredient])
    @ManyToMany(type => Ingredient, ingredient => ingredient.recipe, {
        eager: true,
    })
    @JoinColumn()
    ingredients!: Ingredient[];

    @Field( ()=> Category)
    @OneToOne(type => Category, {
        eager: true,
    })

    @Field(() => Category)
    @ManyToOne(type => Category, category => category.recipe)
    category!: Category;
}

export default Recipe;