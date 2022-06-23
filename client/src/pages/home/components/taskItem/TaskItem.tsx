import "./TaskItem.less"
import React, { useContext } from "react";
import moment from "moment"
import { Button, Card, Checkbox, Popconfirm, Tag } from 'antd';
import { Exact, TaskFilters, TaskFragment, TasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from '../../../../lib/codegen';
import { StarCheckbox } from '../../../../components/starCheckbox/StarCheckbox';
import { DeleteOutlined, FolderOutlined, ShareAltOutlined, TeamOutlined } from '@ant-design/icons';
import { QueryResult } from 'react-apollo';
import { AppContext } from '../../../../lib/helpers/AppContext';

interface TaskItemProps {
  task: TaskFragment
  tasksQuery: QueryResult<TasksQuery, Exact<{ filters: TaskFilters }>>
  onTaskClick: (args: { taskId: number }) => void
}

const DateTag: React.FC<{ task: TaskFragment }> = ({ task }) => {
  if (!task.dateDue)
    return <span />
  else if (moment(task.dateDue).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"))
    return <Tag color="green">Due Today</Tag>
  else if (moment(task.dateDue).diff(moment()) > 0)
    return <Tag color="blue">Due {moment(task.dateDue).format("MMM D, YYYY")}</Tag>
  else
    return <Tag color="red">Due {moment(task.dateDue).format("MMM D, YYYY")}</Tag>
}

const SubtaskTag: React.FC<{ task: TaskFragment }> = ({ task }) => {
  if (task.subtasks.length === 0)
    return <span />

  const completed = task.subtasks.filter(({ isCompleted }) => isCompleted)
  return <Tag>{<FolderOutlined />} ({completed.length} / {task.subtasks.length})</Tag>
}

const SharedTag: React.FC<{ task: TaskFragment }> = ({ task }) => {
  const { user } = useContext(AppContext)
  
  if (task.assignedTo.length === 0 || !user)
    return <span />

  const isOwner = task.createdBy.id === user.id
  if (isOwner)
    return <Tag>{<ShareAltOutlined />} {task.assignedTo.length} user{task.assignedTo.length > 1 ? 's' : ''}</Tag>
  else 
    return <Tag>{<TeamOutlined />} from {task.createdBy.name}</Tag>
  
}

export const TaskItem: React.FC<TaskItemProps> = props => {
  const { id, title, isImportant, isCompleted, dateCreated, dateDue } = props.task

  const [updateTaskMutation] = useUpdateTaskMutation()
  const [deleteTaskMutation] = useDeleteTaskMutation()

  function handleCompleteTask(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation()
    updateTaskMutation({
      variables: { id, data: { title, isImportant, isCompleted: !isCompleted, dateDue } },
      optimisticResponse: { updateTask: { ...props.task, isCompleted: !isCompleted } }
    })
  }

  function handleIsImportantTask(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation()
    updateTaskMutation({
      variables: { id, data: { title, isImportant: !isImportant, isCompleted, dateDue } },
      optimisticResponse: { updateTask: { ...props.task, isImportant: !isImportant } }
    })
  }

  function handleDeleteTask(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation()
    deleteTaskMutation({ variables: { id } })
      .then(() => props.tasksQuery.refetch())
  }

  return (
    <Card
      className="task-item-card"
      style={{ width: '100%' }}
      onClick={() => props.onTaskClick({ taskId: id })}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={isCompleted} onClick={e => handleCompleteTask(e)} />
        <StarCheckbox isChecked={isImportant} onClick={({ event }) => handleIsImportantTask(event)} />
        <span style={{ textDecoration: isCompleted ? 'line-through' : undefined }}>{title}</span>
        <Popconfirm
          cancelButtonProps={{ type: 'primary' }}
          title="Permanently delete task?"
          okText="Delete"
          okButtonProps={{ danger: true }}
          onConfirm={e => handleDeleteTask(e as any)}
        >
          <Button
            className="icon-btn"
            shape="circle"
            style={{ color: "rgb(0 0 0 / 20%)", marginLeft: 'auto' }}
            icon={<DeleteOutlined />}
            onClick={(e) => { e.stopPropagation() }}
          />
        </Popconfirm>
      </div>
      <div style={{ display: 'inline-block' }}>
        <DateTag task={props.task} />
        <SubtaskTag task={props.task} />
        <SharedTag task={props.task}/>
      </div>
    </Card>
  );
}