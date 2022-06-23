import { Field, InputType } from "type-graphql";

@InputType()
export class SubtaskInput {
  @Field(() => String)
  title: string

  @Field(() => Boolean)
  isCompleted: boolean
}