import { Task } from "../entity/Task"
import { User } from "../entity/User"

export const userHasTaskPermission = async (userId: string, taskId: number): Promise<{ hasPermission: boolean, user: User, task: Task }> => {
  const user = await User.findOneOrFail({ where: { id: userId } }).catch(err => { throw err })
  const task = await Task.findOneOrFail({ where: { id: taskId }, relations: ['assignedTo'] }).catch(err => { throw err })

  // user created task
  if (user && task.createdById === userId) return { hasPermission: true, user, task }

  // user assigned to task
  if (task && task.assignedTo)
    for (let i = 0; i < task.assignedTo.length; i++)
      if (task.assignedTo[i].id === userId)
        return { hasPermission: true, user, task }

  // no permission
  return { hasPermission: false, user, task }
}