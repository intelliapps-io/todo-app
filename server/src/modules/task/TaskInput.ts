import { Field, InputType } from "type-graphql";
import { Subtask } from "../../entity/Subtask";

@InputType()
export class TaskInput {
  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Boolean)
  isCompleted: boolean

  @Field(() => Boolean)
  isImportant: boolean

  @Field(() => Date, { nullable: true })
  dateDue?: Date
}