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
    @Column('int', { default: 0 })
    description!: number;

    @Field( ()=> [Ingredient])
    @ManyToMany(type => Ingredient, {
        eager: true,
    })
    @JoinColumn({ name: 'category_id' })
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