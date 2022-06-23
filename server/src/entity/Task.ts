import { Field, ID, Int, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RelationColumn } from "../helpers/helpers";
import { Subtask } from "./Subtask";
import { User } from "./User";

@Entity() @ObjectType()
export class Task extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Field(() => String)
  @Column('varchar', { length: 255 })
  title: string

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description?: string

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isCompleted: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isImportant: boolean

  @Field(() => Date, { nullable: true })
  @Column('datetime', { nullable: true })
  dateDue?: Date

  @Field(() => Date)
  @CreateDateColumn()
  dateCreated: Date

  @Field(() => [Subtask])
  @OneToMany(() => Subtask, subtask => subtask.parentTask)
  subtasks: Subtask[]

  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  assignedTo: User[]

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User
  @RelationColumn()
  createdById: string
}