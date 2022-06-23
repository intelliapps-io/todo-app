import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Task } from "../../entity/Task";
import { MyContext } from "../../ts/context";
import { userHasTaskPermission } from "../../helpers/userHasTaskPermission"
import { TaskFilters, TaskFiltersOwner, TaskFiltersDateOperator } from "./TaskFilters";
import { User, UserRole } from "../../entity/User";
import { getConnection } from "typeorm";
import { javascriptDateToSQLDate, javascriptDateToSQLDateYMD } from "../../helpers/helpers";

@Resolver()
export class TaskQueriesResolver {
  /**
   * Query Task
   * @param id 
   * @param ctx 
   */
  @Authorized([UserRole['USER']])
  @Query(() => Task)
  async task(@Arg('id') id: number, @Ctx() ctx: MyContext): Promise<Task> {
    const { hasPermission, task, user } = await userHasTaskPermission(ctx.req.userId!, id)

    // user permission
    if (!hasPermission)
      throw new Error('Permission denied. You do not belong to this task.')

    return await Task.findOneOrFail(id, { relations: ['subtasks', 'assignedTo', 'createdBy'] }).catch(err => { throw err })
  }

  /**
   * Query Tasks
   * @param ctx 
   * @param filters 
   */
  @Authorized([UserRole['USER']])
  @Query(() => [Task])
  async tasks(@Ctx() ctx: MyContext, @Arg('filters', { nullable: true }) filters: TaskFilters): Promise<Task[]> {
    const user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => { throw err })
    if (!user) throw new Error("User not found by id")

    // query builder
    const qb = getConnection().createQueryBuilder()
    qb.select("task")
    qb.from(Task, "task")

    //['subtasks', 'assignedTo', 'createdBy']
    qb.leftJoinAndSelect('task.subtasks', "subtasks", "subtasks.parentTaskId = task.id")
    qb.leftJoinAndSelect('task.createdBy', "createdBy", "createdBy.id = task.createdById")
    qb.leftJoinAndSelect('task.assignedTo', "assignedTo", "assignedTo.id IN (SELECT u.userId FROM task_assigned_to_user u WHERE u.taskId = task.id)")

    // owner filter
    if (filters.taskOwner === TaskFiltersOwner['USER_ASSIGNED'])
      qb.where(`('${user.id}' IN (SELECT u.userId FROM task_assigned_to_user u WHERE u.taskId = task.id) OR task.id IN (SELECT u.taskId FROM task_assigned_to_user u WHERE u.taskId = task.id))`)
    else if (filters.taskOwner === TaskFiltersOwner['USER_CREATED']) {
      qb.where(`(task.createdById = '${user.id}') AND (task.id NOT IN (SELECT u.taskId FROM task_assigned_to_user u WHERE u.taskId = task.id))`)
    } else {
      qb.where(`(task.createdById = '${user.id}' OR '${user.id}' IN (SELECT u.userId FROM task_assigned_to_user u WHERE u.taskId = task.id))`)
    }
    // TODO: filter by task owner

    // is important
    if (typeof filters.isImportant === "boolean")
      qb.andWhere(`task.isImportant = ${filters.isImportant ? 1 : 0}`)

    // is completed
    if (typeof filters.isCompleted === "boolean")
      qb.andWhere(`task.isCompleted = ${filters.isCompleted ? 1 : 0}`)

    // title
    if (typeof filters.title === "string")
      qb.andWhere(`task.title LIKE '%${filters.title.trim().toLowerCase() ? 1 : 0}%'`)

    // date due
    if (filters.dateDue && filters.dateDueOperator)
      qb.andWhere(`DATE_FORMAT(task.dateDue, "%Y-%m-%d") ${filters.dateDueOperator} "${javascriptDateToSQLDateYMD(filters.dateDue)}"`)
    // if (filters.dateDue && filters.dateDueOperator)
    //   qb.andWhere(`STR_TO_DATE(DATE_FORMAT(task.dateDue, "%Y-%m-%d"), "%Y-%m-%d") = STR_TO_DATE("${javascriptDateToSQLDateYMD(filters.dateDue)}","%Y-%m-%d")`)

    // order
    if (!filters.dateAscending)
      qb.orderBy('task.dateDue', 'DESC')
    else
      qb.orderBy('task.dateDue', 'ASC')

    // nodeLogger(qb.getSql())

    const tasks = await qb.getMany().catch(err => { throw err })

    return tasks
  }
}