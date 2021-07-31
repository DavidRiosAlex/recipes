import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    Int
} from 'type-graphql';
import Ingredient from '../entity/Ingredients';
import auth from '../helpers/auth';

@InputType()
class IngredientInput {
    @Field()
    name!: string
    @Field()
    quantity!: number
}

@Resolver()
export class IngredientResolver{
    @Mutation(() => Ingredient)
    async createIngredient(
        @Arg('token', () => String) token: string,
        @Arg('data', () => IngredientInput) data: IngredientInput
    ){
        auth(token);
        const newProduct = Ingredient.create(data);
        await newProduct.save()
        return newProduct
    }
    @Mutation(() => Boolean)
    async deleteIngredient(
        @Arg('token', () => String) token: string,
        @Arg('name', () => Int) name: string
    ){
        auth(token);
        await Ingredient.delete({ name });
        return true 
    }

    @Query(()=>[Ingredient])
    getIngredient(
        @Arg('token', () => String) token
    ){
        auth(token);
        return Ingredient.find()
    }

    @Query(()=>[Ingredient])
    getOneIngredient(
        @Arg('token', () => String) token: string,
        @Arg('name', () => String, { nullable: true }) name: string
    ){
        auth(token);
        return Ingredient.findOne({ name });
    }

    @Mutation(() => Boolean)
    async updateIngredient(
        @Arg('id', () => Int ) id: number,
        @Arg('ingredient', () => IngredientInput) ingredient: IngredientInput,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        await Ingredient.update(id, ingredient);
        return true
    }
}
