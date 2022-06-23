import React, { useState } from "react";
import { Button, Input, List, Popconfirm } from "antd"
import { SubtaskFragment, useCreateSubtaskMutation, TaskDocument, useUpdateSubtaskMutation, useDeleteSubtaskMutation, SubtaskInput, TaskQuery, Exact, TaskFragment } from '../../../../lib/codegen';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { QueryResult } from 'react-apollo';

interface EditSubTasksProps {
  task: TaskFragment
  taskQuery: QueryResult<TaskQuery, Exact<{
    id: number
  }>>
}

const SubtaskTitleInput: React.FC<{ subtask: SubtaskInput, onEdit: (value: string) => void, style?: React.CSSProperties }> = (props) => {
  const [value, setValue] = useState<string>(props.subtask.title)
  return (
    <input
      style={props.style}
      className="subtask-title-input"
      value={value}
      onChange={(e) => { setValue(e.target.value) }}
      onBlur={() => { if (value !== props.subtask.title) props.onEdit(value) }}
    />
  )
}

export const EditSubTasks: React.FC<EditSubTasksProps> = props => {
  // state
  const [createSubtaskValue, setCreateSubtaskValue] = useState<string>('')

  // graphql
  const [createSubtaskMutation] = useCreateSubtaskMutation()
  const [updateSubtaskMutation] = useUpdateSubtaskMutation()
  const [deleteSubtaskMutation] = useDeleteSubtaskMutation()
  const subtasks = props.task.subtasks

  const handleCreateSubtask = () => {
    createSubtaskMutation({
      variables: { taskId: props.task.id, data: { title: createSubtaskValue, isCompleted: false } },
      refetchQueries: [{ query: TaskDocument, variables: { id: props.task.id } }]
    })
      .then(() => {
        props.taskQuery.refetch()
        setCreateSubtaskValue('')
      })
  }

  const handleToggleComplete = (subtask: SubtaskFragment) => {
    updateSubtaskMutation({
      variables: { subtaskId: subtask.id, data: { title: subtask.title, isCompleted: !subtask.isCompleted } },
      optimisticResponse: { updateSubtask: { ...subtask, isCompleted: !subtask.isCompleted } }
    })
      .then(() => {
        props.taskQuery.refetch()
      })
  }

  const handleRenameSubtask = (subtask: SubtaskFragment, title: string) => {
    updateSubtaskMutation({
      variables: { subtaskId: subtask.id, data: { title, isCompleted: subtask.isCompleted } },
      optimisticResponse: { updateSubtask: { ...subtask, title } }
    })
      .then(() => {
        props.taskQuery.refetch()
      })
  }

  const handleDeleteSubtask = (subtask: SubtaskFragment) => {
    deleteSubtaskMutation({
      variables: { subtaskId: subtask.id }
    })
      .then(() => {
        props.taskQuery.refetch()
      })
  }

  return (
    <List<SubtaskFragment>
      className="subtask-list"
      header={<div style={{ display: 'flex', alignItems: 'center' }}>
        <PlusOutlined />
        <Input
          className='create-task-input'
          style={{ margin: "0 10px" }}
          placeholder="Create subtask"
          onPressEnter={handleCreateSubtask}
          value={createSubtaskValue}
          onChange={e => setCreateSubtaskValue(e.target.value)}
        />
      </div>
      }
      size='small'
      dataSource={subtasks}
      rowKey={(s) => `${s.id}`}
      renderItem={subtask => (
        <List.Item key={`${subtask.id}`} style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={subtask.isCompleted}
            onChange={() => handleToggleComplete(subtask)}
            style={{ marginRight: 10 }}
          />
          <SubtaskTitleInput
            subtask={subtask}
            onEdit={(title) => handleRenameSubtask(subtask, title)}
            style={{ textDecoration: subtask.isCompleted ? 'line-through' : undefined }}
          />
          <Popconfirm
            cancelButtonProps={{ type: 'primary' }}
            title="Permanently delete task?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDeleteSubtask(subtask)}
            placement="left"
          >
            <Button
              className="icon-btn"
              shape="circle"
              style={{ color: "rgb(0 0 0 / 20%)", marginLeft: 'auto' }}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </List.Item>
      )}
    >
    </List>
  );
}