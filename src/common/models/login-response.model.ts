import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class LoginData {

    @Field()
    email: string;

    @Field()
    userId: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;

    @Field()
    access_token: string;

    @Field()
    refresh_token: string
}


@ObjectType()
export class LoginResponse {
    @Field()
    status: number;

    @Field()
    message: string;

    @Field(() => LoginData)
    data: LoginData;
}