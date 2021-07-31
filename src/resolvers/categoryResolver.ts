import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
} from 'type-graphql';
import Category from '../entity/Category';

@InputType()
class CategoryInput {
    @Field()
    name!: string
}

@Resolver()
export class CategoryResolver{
    @Mutation(() => Category)
    async createCategory(
        @Arg('token', () => String) token: string,
        @Arg('data', () => CategoryInput) data: CategoryInput
    ){
        const newCategory = Category.create(data);
        await newCategory.save()
        return newCategory
    }

    @Query(()=> [Category])
    getCategories(
        @Arg('token', () => String) token: string,
    ){

        return Category.find()
    }

    @Query(()=> Category)
    getOneCategories(
        @Arg('token', () => String) token: string,
        @Arg('name', () => String) name: string
    ){
        return Category.findOne({ name })
    }

    @Mutation(() => Boolean)
    async updateCategory(
        @Arg('token', () => String) token: string,
        @Arg('name', () => String) name: string,
        @Arg('data', () => CategoryInput) data: Category
    ){
        const category = await Category.findOne({ name });
        if (!category) return new Error('category not found');
        category.name = data.name;
        await category.save();
        return category
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg('token', () => String ) token: string,
        @Arg('name', () => String ) name: string
    ){
        const category = await Category.findOne({ name });
        if (!category) return new Error('category not found');
        await Category.delete({ name });
        return true
    }
}
