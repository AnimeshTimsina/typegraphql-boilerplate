import { Field, ID, ObjectType } from "type-graphql";


@ObjectType()
export class DeleteResponse {
    @Field((_) => ID)
    id:string

    @Field((_) => Boolean!)
    success:boolean

}

@ObjectType()
export class BoolResponse {
    @Field((_) => Boolean)
    ok:boolean
}