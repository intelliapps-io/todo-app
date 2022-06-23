import "./TaskList.less"
import React, { useContext, useState } from "react";
import { Collapse } from 'antd';
import { QueryResult } from 'react-apollo';
import { Exact, TaskFilters, TaskFiltersDateOperator, TaskFiltersOwner, TaskFragment, TasksQuery } from '../../../../lib/codegen';
import { AppContext } from '../../../../lib/helpers/AppContext';
import { TaskViewFilterMode } from '../../Home';
import { CreateTask } from '../createTask/CreateTask';
import { TaskEditor } from '../taskEditor/TaskEditor';
import { TaskItem } from '../taskItem/TaskItem';

interface TaskListProps {
  tasks: TaskFragment[]
  tasksQuery: QueryResult<TasksQuery, Exact<{ filters: TaskFilters }>>
  openTaskId?: number
  filterMode: TaskViewFilterMode
}

export const TaskList: React.FC<TaskListProps> = props => {
  const { router } = useContext(AppContext), { tasksQuery } = props

  // filter state
  const [filterState, setFilterState] = useState<TaskViewFilterMode>()

  // filter results
  if (props.filterMode !== filterState)
  switch (props.filterMode) {
    case TaskViewFilterMode['ALL_TASKS']:
      setFilterState(TaskViewFilterMode['ALL_TASKS'])
      tasksQuery.refetch({ filters: {} })
      break
    case TaskViewFilterMode['DATE_PAST_DUE']:
      setFilterState(TaskViewFilterMode['DATE_PAST_DUE'])
      tasksQuery.refetch({ filters: { dateDue: new Date(), dateDueOperator: TaskFiltersDateOperator['LessThan']} })
      break
    case TaskViewFilterMode['DATE_TODAY']:
      setFilterState(TaskViewFilterMode['DATE_TODAY'])
      tasksQuery.refetch({ filters: { dateDue: new Date(), dateDueOperator: TaskFiltersDateOperator['Equal']} })
      break
    case TaskViewFilterMode['DATE_UPCOMING']:
      setFilterState(TaskViewFilterMode['DATE_UPCOMING'])
      tasksQuery.refetch({ filters: { dateDue: new Date(), dateDueOperator: TaskFiltersDateOperator['GreaterThan']} })
      break
    case TaskViewFilterMode['IS_IMPORTANT']:
      setFilterState(TaskViewFilterMode['IS_IMPORTANT'])
      tasksQuery.refetch({ filters: { isImportant: true } })
      break
    case TaskViewFilterMode['TASK_USER_ASSIGNED']:
      setFilterState(TaskViewFilterMode['TASK_USER_ASSIGNED'])
      tasksQuery.refetch({ filters: { taskOwner: TaskFiltersOwner['UserAssigned'] } })
      break
    case TaskViewFilterMode['TASK_USER_CREATED']:
      setFilterState(TaskViewFilterMode['TASK_USER_CREATED'])
      tasksQuery.refetch({ filters: { taskOwner: TaskFiltersOwner['UserCreated'] } })
      break
  }

  // render task items
  const uncompleted: TaskFragment[] = props.tasks.filter(task => !task.isCompleted)
  const completed: TaskFragment[] = props.tasks.filter(task => task.isCompleted)
  const renderTasks = (tasks: TaskFragment[]) => tasks.map(task =>
    <TaskItem
      key={task.id}
      task={task}
      onTaskClick={({ taskId }) => router.history.push(`/app/${props.filterMode}/${taskId}`)}
      tasksQuery={props.tasksQuery}
    />)

  return (
    <div>
      <TaskEditor
        onClose={() => router.history.push(`/app/${props.filterMode}`)}
        openTaskId={props.openTaskId}
      />
      <div className="task-list-uncompleted-container">
        <CreateTask tasksQuery={props.tasksQuery} />
        {renderTasks(uncompleted)}
      </div>
      {completed.length > 0 &&
        <Collapse className="task-list-completed-container" ghost>
          <Collapse.Panel header={`Completed (${completed.length})`} key="1">
            {renderTasks(completed)}
          </Collapse.Panel>
        </Collapse>
      }
    </div>
  );
}