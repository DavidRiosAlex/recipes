import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    Int,
    ObjectType
} from 'type-graphql';
import Recipe from '../entity/Recipe';
import Ingredient from '../entity/Ingredients';
import Category from '../entity/Category';
import auth from '../helpers/auth';

@ObjectType()
@InputType()
class RecipeInput {
    @Field()
    name!: string;
    @Field()
    description!: string;
    @Field()
    ingredients!: number;
    @Field()
    category!: number;
}

@Resolver()
export class RecipeResolver{
    @Mutation(() => Recipe)
    async createRecipe(
        @Arg('data', () => RecipeInput) data: Recipe,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        const newProduct = Recipe.create(data);
        await newProduct.save()
        return newProduct
    }
    @Mutation(() => Boolean)
    async deleteRecipe(
        @Arg('id', () => Int) id: number,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        await Recipe.delete(id);
        return true 
    }

    @Query(()=>[Recipe])
    getRecipes(
        @Arg('token', () => String) token: string
    ){
        auth(token);
        return Recipe.find()
    }

    @Query(()=>Recipe)
    getOneRecipes(
        @Arg('name', () => String ) name: string,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        return Recipe.findOne({ })
    }

    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg('id', () => Int ) id: number,
        @Arg('recipe', () => RecipeInput) recipe: Recipe,
        @Arg('token', () => String) token: string
    ){

        auth(token);
        await Recipe.update(id, recipe);
        return true
    }
}
