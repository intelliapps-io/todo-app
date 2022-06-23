import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Subtask } from "../../entity/Subtask";
import { UserRole } from "../../entity/User";
import { userHasTaskPermission } from "../../helpers/userHasTaskPermission";
import { MyContext } from "../../ts/context";

@Resolver()
export class SubtaskQueriesResolver {
  @Authorized([UserRole['USER']])
  @Query(() => Subtask)
  async subtask(@Arg('subtaskId') subtaskId: number, @Ctx() ctx: MyContext): Promise<Subtask> {
    const subtask = await Subtask.findOne(subtaskId, { relations: ['createdBy', 'parentTask']}).catch(err => { throw err })
    if (!subtask)
      throw new Error('Subtask not found by id')

    const { hasPermission, user, task } = await userHasTaskPermission(ctx.req.userId!, subtask.parentTaskId).catch(err => { throw err })

    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    return subtask
  }

  @Authorized([UserRole['USER']])
  @Query(() => [Subtask])
  async subtasks(@Arg('taskId') taskId: number, @Ctx() ctx: MyContext): Promise<Subtask[]> {
    const { hasPermission, user, task } = await userHasTaskPermission(ctx.req.userId!, taskId).catch(err => { throw err })

    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    return await Subtask.find({ where: { parentTaskId: taskId }, relations: ['createdBy', 'parentTask'] }).catch(err => { throw err })
  }
}