import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Subtask } from "../../entity/Subtask";
import { Task } from "../../entity/Task";
import { UserRole } from "../../entity/User";
import { userHasTaskPermission } from "../../helpers/userHasTaskPermission";
import { MyContext } from "../../ts/context";
import { SubtaskInput } from "./SubtaskInput";

@Resolver()
export class SubtaskMutatationsResolver {
  /**
   * Create Subtask
   * @param taskId 
   * @param data 
   * @param ctx 
   */
  @Authorized([UserRole['USER']])
  @Mutation(() => Subtask)
  async createSubtask(@Arg('taskId') taskId: number, @Arg('data') data: SubtaskInput, @Ctx() ctx: MyContext): Promise<Subtask> {
    const { hasPermission, user, task } = await userHasTaskPermission(ctx.req.userId!, taskId).catch(err => { throw err })
    
    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    // create subtask
    const subtask = await Subtask.create({ title: data.title, isCompleted: false }).save().catch(err => { throw err })
    subtask.createdBy = user
    subtask.parentTask = task
    await subtask.save().catch(err => { throw err })

    return subtask
  }

  /**
   * Update Subtask
   * @param subtaskId 
   * @param data 
   * @param ctx 
   */
  @Authorized([UserRole['USER']])
  @Mutation(() => Subtask)
  async updateSubtask(@Arg('subtaskId') subtaskId: number, @Arg('data') data: SubtaskInput, @Ctx() ctx: MyContext): Promise<Subtask> {
    const subtask = await Subtask.findOne(subtaskId, { relations: ['createdBy', 'parentTask']}).catch(err => { throw err })
    if (!subtask) throw new Error('Subtask not found by id')

    const { hasPermission, user, task } = await userHasTaskPermission(ctx.req.userId!, subtask.parentTaskId).catch(err => { throw err })
    
    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    // update subtask
    subtask.title = data.title
    subtask.isCompleted = data.isCompleted
    await subtask.save().catch(err => { throw err })

    return subtask
  }

  /**
   * Delete Subtask
   * @param subtaskId 
   * @param ctx 
   */
  @Authorized([UserRole['USER']])
  @Mutation(() => Boolean)
  async deleteSubtask(@Arg('subtaskId') subtaskId: number, @Ctx() ctx: MyContext): Promise<Boolean> {
    const subtask = await Subtask.findOne(subtaskId).catch(err => { throw err })
    if (!subtask) throw new Error('Subtask not found by id')

    const { hasPermission, user, task } = await userHasTaskPermission(ctx.req.userId!, subtask.parentTaskId).catch(err => { throw err })
    
    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    // delete subtask
    await subtask.remove().catch(err => { throw err })

    return true
  }
}