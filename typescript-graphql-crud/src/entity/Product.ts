import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    // Strings can auto-infer
    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    category: string

    @Field()
    @Column()
    image: string

    @Field(() => Int)
    @Column("int", {default: 5})
    price: number

    @Field()
    @Column()
    description: string
}
