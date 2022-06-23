import { Field, InputType, registerEnumType } from "type-graphql";

export enum TaskFiltersDateOperator {
  LESS_THAN = "<",
  EQUAL = "=",
  GREATER_THAN = ">"
}

registerEnumType(TaskFiltersDateOperator, { name: "taskFiltersDateOperator", description: "Filter dates by value" })

export enum TaskFiltersOwner {
  USER_CREATED = "USER_CREATED",
  USER_ASSIGNED = "USER_ASSIGNED"
}

registerEnumType(TaskFiltersOwner, { name: "taskFiltersOwner", description: "Filter dates by value" })

@InputType()
export class TaskFilters {
  @Field(() => Boolean, { nullable: true })
  dateAscending?: boolean

  @Field(() => Boolean, { nullable: true })
  isImportant?: boolean

  @Field(() => Boolean, { nullable: true })
  isCompleted?: boolean

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => TaskFiltersOwner, { nullable: true })
  taskOwner?: TaskFiltersOwner

  @Field(() => Date, { nullable: true })
  dateDue?: Date

  @Field(() => TaskFiltersDateOperator, { nullable: true })
  dateDueOperator?: TaskFiltersDateOperator
}