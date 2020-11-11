import {Arg, Field, InputType, Int, Mutation, Query, Resolver} from "type-graphql";
import {Product} from "../entity/Product";

@InputType()
class ProductInput {
    @Field()
    name: string

    @Field()
    category: string

    @Field()
    image: string

    @Field(() => Int)
    price: number

    @Field()
    description: string
}

@InputType()
class ProductUpdateInput {
    @Field(() => String, { nullable : true })
    name?: string

    @Field(() => String, { nullable : true })
    category?: string

    @Field(() => String, { nullable : true })
    image?: string

    @Field(() => Int, { nullable : true })
    price?: number

    @Field(() => String, { nullable : true })
    description?: string
}

@Resolver()
export class ProductResolver {
    // Decorator used for dataChange
    // Tell GraphQL what return value of the mutation is going to be
    @Mutation(() => Product)
    async createProduct(@Arg("options", () => ProductInput) options: ProductInput) {
        return await Product.create(options).save();
    }

    @Mutation(() => Boolean)
    async updateProduct(
        @Arg("id", () => Int) id: number,
        @Arg("newProduct", () => ProductUpdateInput) newProduct: ProductUpdateInput
    ) {
        await Product.update({ id }, newProduct)
        return true;
    }

    @Mutation(() => Boolean)
    async deleteProduct(
        @Arg("id", () => Int) id: number
    ) {
        await Product.delete({id});
        return true;
    }

    // Query decorator --> fetch stuff
    // Return a list of products
    @Query(() => [Product])
    products() {
        return Product.find();
    }

    // Query decorator --> fetch stuff
    // Return the product with given id
    @Query(() => Product)
    product(
        @Arg("id", () => Int) id: number
    ) {
        return Product.findOne(id)
    }
}
