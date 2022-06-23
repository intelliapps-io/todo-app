import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Task } from "../../entity/Task";
import { User, UserRole } from "../../entity/User";
import { nodeLogger } from "../../helpers/helpers";
import { userHasTaskPermission } from "../../helpers/userHasTaskPermission";
import { MyContext } from "../../ts/context";
import { TaskInput } from "./TaskInput";

// INSERT INTO task (title, description, isCompleted, isImportant, dateDue, createdById)
// VALUES ('test task', 'this is a task for testing', false, false, '2020-12-03 05:00:00.000', 'f8be883e-69d3-47bf-88ce-39a1b9eced45');

@Resolver()
export class TaskMutationsResolver {
  /**
   * Create Task
   * @param data 
   * @param ctx 
   */
  @Authorized([UserRole['USER']])
  @Mutation(() => Task)
  async createTask(@Arg('data') data: TaskInput, @Ctx() ctx: MyContext): Promise<Task> {
    const user = await User.findOne(ctx.req.userId)

    if (!user) throw new Error('Please login')

    const task = await Task.create({ ...data }).save().catch(err => { throw err })
    task.createdBy = user
    task.subtasks = []
    task.assignedTo = []
    await task.save()

    return task
  }

  /**
   * Update Task
   * @param id 
   * @param data 
   * @param ctx 
   */
  @Authorized([UserRole['USER']])
  @Mutation(() => Task)
  async updateTask(@Arg('id') id: number, @Arg('data') data: TaskInput, @Ctx() ctx: MyContext): Promise<Task> {
    const { hasPermission, user } = await userHasTaskPermission(ctx.req.userId!, id).catch(err => { throw err })

    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    // find task
    const task = await Task.findOne({ where: { id }, relations: ['subtasks', 'assignedTo', 'createdBy'] }).catch(err => { throw err })
    if (!task) throw new Error('Task does not exist by id')

    // update task
    await Task.update(id, { ...data }).catch(err => { throw err })

    // reload and return task
    await task.reload()
    return task
  }

  /**
   * Delete Task
   * @param id 
   * @param data 
   * @param ctx 
   */
  @Authorized([UserRole['USER']])
  @Mutation(() => Boolean)
  async deleteTask(@Arg('id') id: number, @Ctx() ctx: MyContext): Promise<boolean> {
    const { hasPermission } = await userHasTaskPermission(ctx.req.userId!, id).catch(err => { throw new Error('task not found') })

    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    // find task
    const task = await Task.findOne({ where: { id }, relations: ['subtasks', 'assignedTo', 'createdBy'] }).catch(err => { throw err })
    if (!task) throw new Error('Task does not exist by id')

    // update task
    await task.remove().catch(err => { throw err })

    return true
  }

  /**
   * Assign Task
   * @param taskId 
   * @param userId 
   * @param ctx 
   */
  @Authorized([UserRole['USER']])
  @Mutation(() => Task)
  async assignTaskToUser(@Arg('taskId') taskId: number, @Arg('userEmail') userEmail: String, @Ctx() ctx: MyContext): Promise<Task> {
    const hasPermissionResult = await userHasTaskPermission(ctx.req.userId!, taskId).catch(err => { throw err })
    const thisUser = hasPermissionResult.user, hasPermission = hasPermissionResult.hasPermission

    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    // find user to add
    const user = await User.findOne({ where: { email: userEmail } }).catch(err => { throw err })
    if (!user)
      throw new Error("User not found by email")

    // find task
    const task = await Task.findOne({ where: { id: taskId }, relations: ['subtasks', 'assignedTo', 'createdBy'] }).catch(err => { throw err })
    if (!task)
      throw new Error('Task not found by email')

    const userExists = task.assignedTo.find(({ email }) => (email === userEmail))
    if (userExists)
      throw new Error('User already assigned to task')
    if (thisUser.id === user.id)
      throw new Error('You cannot assign yourself to your task')

    // assign user and save
    task.assignedTo.push(user)
    await task.save().catch(err => { throw err })

    return task
  }

  /**
   * Unassign Task
   * @param taskId 
   * @param userId 
   * @param ctx 
   */
  @Authorized([UserRole['USER']])
  @Mutation(() => Task)
  async unassignTaskToUser(@Arg('taskId') taskId: number, @Arg('userEmail') userEmail: String, @Ctx() ctx: MyContext): Promise<Task> {
    const { hasPermission } = await userHasTaskPermission(ctx.req.userId!, taskId).catch(err => { throw err })

    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    // find user to add
    const user = await User.findOne({ where: { email: userEmail } }).catch(err => { throw err })
    if (!user) throw new Error("User not found by email")

    // find task
    const task = await Task.findOne({ where: { id: taskId }, relations: ['subtasks', 'assignedTo', 'createdBy'] }).catch(err => { throw err })
    if (!task) throw new Error('Task not found by email')

    // unassign user and save
    task.assignedTo = task.assignedTo.filter(({ email }) => email !== userEmail)
    await task.save().catch(err => { throw err })

    return task
  }
}