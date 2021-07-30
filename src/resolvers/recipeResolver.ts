import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    Int
} from 'type-graphql';
import Product from '../entity/Recipe';

@InputType()
class ProductInput {
    @Field()
    name!: string
    @Field()
    quantity!: number
}

@Resolver()
export class RecipeResolver{
    @Mutation(() => Product)
    async createProduct(
        @Arg('variables', () => ProductInput) variables: ProductInput
    ){
        const newProduct = Product.create(variables);
        await newProduct.save()
        console.log(' Product --> created', newProduct);
        return newProduct
    }
    @Mutation(() => Boolean)
    async deleteProduct(
        @Arg('id', () => Int) id: number
    ){
        console.log('product id --> ' + id + ' deleted');
        await Product.delete(id);
        return true 
    }

    @Query(()=>[Product])
    products(){
        return Product.find()
    }

    @Mutation(() => Boolean)
    async updateProduct(
        @Arg('id', () => Int ) id: number,
        @Arg('product', () => ProductInput) product: ProductInput
    ){
        await Product.update(id, product);
        console.log('product with id --> ' + id + ' updated');
        return true
    }
}
